import { Router } from 'express'
import { usuarioController } from './controllers/usuarioController.js'

const router = Router()

router.get('/teste', usuarioController.teste)
router.post('/cadastrar', usuarioController.cadastrar)
router.post('/identificar', usuarioController.identificar)
router.get('/usuarios', usuarioController.listar)
router.put('/usuarios/:id', usuarioController.atualizar)
router.delete('/usuarios/:id', usuarioController.deletar)

export default router  // ← TEM QUE TER ISSO!