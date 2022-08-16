import serv from './services'
import { Request, Response } from 'express'

const getAllPosts = async (req: Request, res: Response) => {
  const { busqueda } = req.query

  try {
    const result = !busqueda
      ? await serv.getAllPosts()
      : await serv.getAllPosts(String(busqueda))

    if (result && result.length === 0) {
      res.status(204).end()
    } else {
      res.status(200).json(result)
    }
  } catch (err: any) {
    res.status(500).json({ error: err })
  }
}

const getOnePost = async (req: Request, res: Response) => {
  const { id } = req.params
  const _id: number = Number(id)

  if (isNaN(_id)) {
    return res.status(400).json({})
  }

  try {
    const result = await serv.getOnePost(_id)

    if (!result) {
      res.status(404).end()
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const createNewPost = async (req: Request, res: Response) => {
  const { email, contrasena } = req.query
  const { titulo, resumen, contenido } = req.body
  const _data = [email, contrasena, titulo, resumen, contenido]

  if (_data.some(val => !val || val.length === 0)) {
    res.status(400).json({})
  }

  try {
    const [$email, $contrasena] = [email, contrasena].map(val => String(val))
    const autor_id = await serv.getAuthorID($email, $contrasena)

    if (!autor_id) {
      res.status(401).json({ message: 'Invalid credentials. Email and password do not match' })
    } else {
      const createdPost = await serv.createNewPost({
        titulo: String(titulo),
        resumen: String(resumen),
        contenido: String(contenido),
        autor_id: autor_id
      })

      res.status(201).json(createdPost)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const deleteOnePost = async (req: Request, res: Response) => {
  const { email, contrasena } = req.query
  const { id } = req.params
  const _id: number = Number(id)
  const _data = [email, contrasena, id]

  if (_data.some(val => !val || val.length === 0) || isNaN(_id)) {
    res.status(400).json({})
  }

  try {
    const [$email, $contrasena] = [email, contrasena].map(val => String(val))
    const autor_id = await serv.getAuthorID($email, $contrasena)

    if (!autor_id) {
      res.status(412).json({ message: 'Invalid credentials. Email and password do not match' })
    } else {
      const deletedPosts = await serv.deleteOnePost(_id, autor_id)
      if (deletedPosts === 0) res.status(403).json({ message: "You can't delete this post" })
      else res.status(200).json({ message: 'Post deleted successfully' })
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default { getAllPosts, getOnePost, createNewPost, deleteOnePost }
