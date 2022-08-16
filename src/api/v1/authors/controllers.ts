import serv from './services'
import { Request, Response } from 'express'

const getAllAuthors = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await serv.getAllAuthors()

    if (result.length === 0) {
      res.status(204).end()
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const getOneAuthor = async (req: Request, res: Response) => {
  const { id } = req.params
  const _id: number = Number(id)

  if (isNaN(_id)) {
    res.status(400).json({})
  }

  try {
    const result = await serv.getOneAuthor(_id)

    if (!result) {
      res.status(404).end()
    } else {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

const createNewAuthor = async (req: Request, res: Response) => {
  const { nombre, email, contrasena } = req.body
  const _data = [nombre, email, contrasena]

  if (_data.some(val => !val) || _data.some(val => val.length === 0)) {
    res.status(400).json({})
  }

  try {
    const duplicates = await serv.validateDuplicates(String(nombre), String(email))

    if (duplicates.nombre && duplicates.email) {
      res.status(400).json({ message: 'Username and Email are in use' })
    } else if (duplicates.nombre) {
      res.status(400).json({ message: 'Username  in use' })
    } else if (duplicates.email) {
      res.status(400).json({ message: 'Email  in use' })
    } else {
      const createdAuthor = await serv.createNewAuthor(String(nombre), String(email), String(contrasena))

      res.status(201).json(createdAuthor)
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export default { getAllAuthors, getOneAuthor, createNewAuthor }
