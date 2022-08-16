import { Router } from 'express'
import contr from './controllers'

export default Router()
  .get('/', contr.getAllPosts)

  .get('/:id', contr.getOnePost)

  .post('/', contr.createNewPost)

  .delete('/:id', contr.deleteOnePost)
