import { Router } from 'express'
import contr from './controllers'

export default Router()
  .get('/', contr.getAllAuthors)

  .get('/:id', contr.getOneAuthor)

  .post('/', contr.createNewAuthor)
