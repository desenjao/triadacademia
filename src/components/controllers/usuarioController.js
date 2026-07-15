import prisma from '../database.js'

export const usuarioController = {
  // TESTE
  async teste(req, res) {
    res.json({ 
      message: 'API Prisma v5 funcionando!',
      status: 'online',
      timestamp: new Date().toISOString()
    })
  },

  // CADASTRAR USUÁRIO
  async cadastrar(req, res) {
    try {
      const { nome, cpf, biometriaHash, email, telefone, tipo = 'ALUNO' } = req.body

      if (!nome || !cpf || !biometriaHash) {
        return res.status(400).json({ error: 'Dados incompletos' })
      }

      const cpfLimpo = cpf.replace(/\D/g, '')
      
      if (cpfLimpo.length !== 11) {
        return res.status(400).json({ error: 'CPF inválido' })
      }

      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          cpf: cpfLimpo,
          biometriaHash,
          biometriaAtiva: true,
          email: email || null,
          telefone: telefone || null,
          tipo,
          status: 'ATIVO'
        }
      })

      res.status(201).json({ 
        success: true, 
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        tipo: novoUsuario.tipo
      })

    } catch (error) {
      console.error('Erro ao cadastrar:', error)
      
      if (error.code === 'P2002') {
        return res.status(400).json({ 
          error: `Erro: ${error.meta?.target?.[0] || 'campo'} já está em uso.` 
        })
      }

      res.status(400).json({ 
        error: 'Erro ao cadastrar usuário.',
        details: error.message
      })
    }
  },

  // IDENTIFICAR POR BIOMETRIA
  async identificar(req, res) {
    try {
      const { biometriaHash } = req.body

      if (!biometriaHash) {
        return res.status(400).json({ error: 'Biometria não fornecida' })
      }

      const usuario = await prisma.usuario.findUnique({
        where: { biometriaHash },
        select: {
          id: true,
          nome: true,
          tipo: true,
          status: true,
          biometriaAtiva: true
        }
      })

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      if (usuario.status !== 'ATIVO' || !usuario.biometriaAtiva) {
        return res.status(403).json({ 
          error: 'Acesso negado. Usuário inativo ou biometria desativada.' 
        })
      }

      await prisma.usuario.update({
        where: { id: usuario.id },
        data: { ultimoAcesso: new Date() }
      })

      res.json({ 
        success: true, 
        nome: usuario.nome, 
        tipo: usuario.tipo,
        id: usuario.id
      })

    } catch (error) {
      console.error('Erro ao identificar:', error)
      res.status(500).json({ error: 'Erro interno no servidor' })
    }
  },

  // LISTAR USUÁRIOS
  async listar(req, res) {
    try {
      const { status, tipo } = req.query
      
      const where = {}
      if (status) where.status = status
      if (tipo) where.tipo = tipo

      const usuarios = await prisma.usuario.findMany({
        where,
        select: {
          id: true,
          nome: true,
          cpf: true,
          email: true,
          tipo: true,
          status: true,
          biometriaAtiva: true,
          ultimoAcesso: true,
          createdAt: true
        },
        orderBy: { nome: 'asc' }
      })

      res.json({ 
        success: true, 
        total: usuarios.length,
        usuarios 
      })

    } catch (error) {
      console.error('Erro ao listar:', error)
      res.status(500).json({ error: 'Erro interno no servidor' })
    }
  },

  // ATUALIZAR USUÁRIO
  async atualizar(req, res) {
    try {
      const { id } = req.params
      const { nome, email, telefone, status, tipo } = req.body

      const usuarioAtualizado = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          nome: nome || undefined,
          email: email || undefined,
          telefone: telefone || undefined,
          status: status || undefined,
          tipo: tipo || undefined
        }
      })

      res.json({ 
        success: true, 
        usuario: usuarioAtualizado 
      })

    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      console.error('Erro ao atualizar:', error)
      res.status(500).json({ error: 'Erro interno no servidor' })
    }
  },

  // DELETAR USUÁRIO
  async deletar(req, res) {
    try {
      const { id } = req.params

      await prisma.usuario.delete({
        where: { id: parseInt(id) }
      })

      res.json({ 
        success: true, 
        message: 'Usuário removido com sucesso' 
      })

    } catch (error) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }
      console.error('Erro ao deletar:', error)
      res.status(500).json({ error: 'Erro interno no servidor' })
    }
  }
}