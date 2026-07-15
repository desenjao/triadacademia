import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3333

app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`)
  console.log(`🔗 http://localhost:${PORT}/api/teste`)
  console.log(`📦 Prisma Client v5 carregado com sucesso!`)
  console.log(`\n📋 Endpoints disponíveis:`)
  console.log(`  GET  /api/teste`)
  console.log(`  POST /api/cadastrar`)
  console.log(`  POST /api/identificar`)
  console.log(`  GET  /api/usuarios`)
  console.log(`  PUT  /api/usuarios/:id`)
  console.log(`  DELETE /api/usuarios/:id\n`)
})