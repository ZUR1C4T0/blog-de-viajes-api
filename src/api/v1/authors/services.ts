import pool from '../../../database/poolConnection'
import { escape } from 'mysql2/promise'

let data: Object[] = []

const getAllAuthors = async () => {
  try {
    const query = 'SELECT id, email, nombre, avatar FROM autores'
    const [rowDataPacket] = await pool.execute(query)
    data = rowDataPacket as object[]
  } catch (err) {
    throw err
  }

  return data
}

const getOneAuthor = async (id: number) => {
  try {
    const query = `SELECT id, email, nombre, avatar FROM autores WHERE id = ${escape(id)};`
    const [rowDataPacket] = await pool.execute(query)
    data = rowDataPacket as Object[]
  } catch (err) {
    throw err
  }

  return data[0]
}

const validateDuplicates = async (nombre: string, email: string) => {
  const duplicates: { nombre: Boolean, email: Boolean } = { nombre: false, email: false }

  try {
    const query1 = `SELECT nombre FROM autores WHERE nombre = ${escape(nombre)};`
    const [rowDataPacket1] = await pool.execute(query1)

    if (!rowDataPacket1) duplicates.nombre = true

    const query2 = `SELECT email FROM autores WHERE nombre = ${escape(email)};`
    const [rowDataPacket2] = await pool.execute(query2)

    if (!rowDataPacket2) duplicates.email = true
  } catch (err) {
    throw err
  }

  return duplicates
}

const createNewAuthor = async (nombre: string, email: string, contrasena: string) => {
  try {
    const query = `INSERT INTO autores (nombre, email, contrasena)
      VALUES (${escape(nombre)}, ${escape(email)}, ${escape(contrasena)});`

    const [okPacket] = await pool.execute(query)
    const { insertId } = okPacket as { insertId: number }

    var authorCreated: Object = await getOneAuthor(insertId)
  } catch (err) {
    throw err
  }

  return authorCreated
}

export default { getAllAuthors, getOneAuthor, validateDuplicates, createNewAuthor }
