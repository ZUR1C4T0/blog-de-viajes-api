import pool from '../../../database/poolConnection'
import { escape } from 'mysql2/promise'

let data: Object[] = []

const getAllPosts = async (wordToSearch?: string) => {
  const searchQuery: string =
    wordToSearch && wordToSearch.length > 0
      ? `WHERE titulo LIKE '%${wordToSearch}%'
        OR resumen LIKE '%${wordToSearch}%'
        OR contenido LIKE '%${wordToSearch}%'`
      : ''

  try {
    const query = `SELECT * FROM publicaciones ${searchQuery};`
    const [rowDataPacket] = await pool.execute(query)
    data = rowDataPacket as Object[]
  } catch (err: any) {
    throw err
  }

  return data
}

const getOnePost = async (id: number) => {
  try {
    const query: string = `SELECT * FROM publicaciones WHERE id = ${escape(id)};`
    const [rowDataPacket] = await pool.execute(query)
    data = rowDataPacket as Object[]
  } catch (err: any) {
    throw err
  }

  return data[0]
}

const getAuthorID = async (emial: string, contrasena: string) => {
  try {
    const query = `SELECT id FROM autores
      WHERE email = ${escape(emial)} AND contrasena = ${escape(contrasena)};`

    const [rowDataPacket] = await pool.execute(query)
    data = rowDataPacket as Object[]

    if (data.length > 0) var { id } = data[0] as { id: number }
    else return null
  } catch (err) {
    throw err
  }

  return id
}

interface publicacion { titulo: string, resumen: string, contenido: string, autor_id: number }

const createNewPost = async (postBody: publicacion) => {
  const { titulo, resumen, contenido, autor_id } = postBody

  try {
    const query = `INSERT INTO publicaciones (titulo, resumen, contenido, autor_id)
      VALUES (${escape(titulo)}, ${escape(resumen)}, ${escape(contenido)}, ${autor_id});`

    const [okPacket] = await pool.execute(query)
    const { insertId } = okPacket as { insertId: number }

    var postCreated: Object = await getOnePost(insertId)
  } catch (err) {
    throw err
  }

  return postCreated
}

const deleteOnePost = async (id: number, autor_id: number) => {
  try {
    const query: string = `DELETE FROM publicaciones WHERE id = ${id} AND autor_id = ${autor_id};`
    const [rowDataPacket] = await pool.execute(query)
    var { affectedRows } = rowDataPacket as { affectedRows: number }
  } catch (err: any) {
    throw err
  }

  return affectedRows
}

export default { getAllPosts, getOnePost, getAuthorID, createNewPost, deleteOnePost }
