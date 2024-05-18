import express from 'express'
const app = express()
const port = 8080
import routes from './routes.js'

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Olá, Mundo!')
})

app.use('/api', routes);


app.listen(port, () => {
  console.log(`API rodando na porta ${port} | Use a rota /api para acessar os endpoints`)
})

