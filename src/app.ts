import 'dotenv/config'
import * as express from 'express'
import * as cors from 'cors'
import routerpostsV1 from './api/v1/posts/routes'
import routerauthorsV1 from './api/v1/authors/routes'

const app = express()

// settings
const port: string = process.env.PORT ?? '3000'

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// routes
app.use('/api/v1/publicaciones', routerpostsV1)
app.use('/api/v1/autores', routerauthorsV1)

// 404 not found
app.use((_req, res) => {
  res.status(404).send().end()
})

// start Server
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`)
})
