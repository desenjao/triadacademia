// teste.js - Teste completo da API

const API_URL = 'http://localhost:3333/api'

// Função para fazer requisições
async function testarAPI() {
  console.log('🧪 INICIANDO TESTES DA API\n')
  console.log('=' .repeat(50))

  try {
    // 1. TESTE DE SAÚDE
    console.log('\n📌 1. TESTE DE SAÚDE - GET /teste')
    const response1 = await fetch(`${API_URL}/teste`)
    const data1 = await response1.json()
    console.log('✅ Status:', response1.status)
    console.log('📦 Resposta:', data1)

    // 2. CADASTRAR USUÁRIO 1
    console.log('\n📌 2. CADASTRAR USUÁRIO - POST /cadastrar')
    const response2 = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'João Silva',
        cpf: '12345678901',
        biometriaHash: 'hash123456',
        email: 'joao@email.com',
        telefone: '11999999999'
      })
    })
    const data2 = await response2.json()
    console.log('✅ Status:', response2.status)
    console.log('📦 Resposta:', data2)

    // 3. CADASTRAR USUÁRIO 2
    console.log('\n📌 3. CADASTRAR USUÁRIO 2 - POST /cadastrar')
    const response3 = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Maria Santos',
        cpf: '98765432100',
        biometriaHash: 'hash789012',
        email: 'maria@email.com',
        telefone: '11888888888',
        tipo: 'PROFESSOR'
      })
    })
    const data3 = await response3.json()
    console.log('✅ Status:', response3.status)
    console.log('📦 Resposta:', data3)

    // 4. LISTAR USUÁRIOS
    console.log('\n📌 4. LISTAR USUÁRIOS - GET /usuarios')
    const response4 = await fetch(`${API_URL}/usuarios`)
    const data4 = await response4.json()
    console.log('✅ Status:', response4.status)
    console.log(`📦 Total de usuários: ${data4.total}`)
    console.log('📦 Resposta:', JSON.stringify(data4, null, 2))

    // 5. IDENTIFICAR POR BIOMETRIA
    console.log('\n📌 5. IDENTIFICAR POR BIOMETRIA - POST /identificar')
    const response5 = await fetch(`${API_URL}/identificar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ biometriaHash: 'hash123456' })
    })
    const data5 = await response5.json()
    console.log('✅ Status:', response5.status)
    console.log('📦 Resposta:', data5)

    // 6. IDENTIFICAR COM BIOMETRIA ERRADA
    console.log('\n📌 6. IDENTIFICAR COM BIOMETRIA ERRADA')
    const response6 = await fetch(`${API_URL}/identificar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ biometriaHash: 'hash999999' })
    })
    const data6 = await response6.json()
    console.log('✅ Status:', response6.status)
    console.log('📦 Resposta:', data6)

    // 7. ATUALIZAR USUÁRIO
    console.log('\n📌 7. ATUALIZAR USUÁRIO - PUT /usuarios/1')
    const response7 = await fetch(`${API_URL}/usuarios/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'João Silva Atualizado',
        email: 'joao.novo@email.com'
      })
    })
    const data7 = await response7.json()
    console.log('✅ Status:', response7.status)
    console.log('📦 Resposta:', data7)

    // 8. LISTAR USUÁRIOS FILTRADOS
    console.log('\n📌 8. LISTAR APENAS ALUNOS - GET /usuarios?tipo=ALUNO')
    const response8 = await fetch(`${API_URL}/usuarios?tipo=ALUNO`)
    const data8 = await response8.json()
    console.log('✅ Status:', response8.status)
    console.log(`📦 Total de alunos: ${data8.total}`)

    // 9. TESTAR CADASTRO COM CPF INVÁLIDO
    console.log('\n📌 9. CADASTRO COM CPF INVÁLIDO')
    const response9 = await fetch(`${API_URL}/cadastrar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: 'Teste Invalido',
        cpf: '123',
        biometriaHash: 'hash999'
      })
    })
    const data9 = await response9.json()
    console.log('✅ Status:', response9.status)
    console.log('📦 Resposta:', data9)

    // 10. DELETAR USUÁRIO
    console.log('\n📌 10. DELETAR USUÁRIO - DELETE /usuarios/2')
    const response10 = await fetch(`${API_URL}/usuarios/2`, {
      method: 'DELETE'
    })
    const data10 = await response10.json()
    console.log('✅ Status:', response10.status)
    console.log('📦 Resposta:', data10)

    // 11. VERIFICAR LISTA APÓS DELEÇÃO
    console.log('\n📌 11. LISTAR USUÁRIOS APÓS DELEÇÃO')
    const response11 = await fetch(`${API_URL}/usuarios`)
    const data11 = await response11.json()
    console.log('✅ Status:', response11.status)
    console.log(`📦 Total de usuários restantes: ${data11.total}`)

  } catch (error) {
    console.error('❌ Erro nos testes:', error.message)
  }

  console.log('\n' + '='.repeat(50))
  console.log('🏁 TESTES FINALIZADOS')
}

// Executar os testes
testarAPI()