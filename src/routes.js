import { randomUUID } from 'node:crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = database.select('users')

      return res
        .end(JSON.stringify(users))
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      if (req.body === null || req.body.email === undefined || req.body.name === undefined) {
        return res.writeHead(400).end('Missing body with fields: email and name.')
      }
  
      const { name, email } = req.body
  
      const user = {
        id: randomUUID(),
        name,
        email,
      }
  
      database.insert('users', user)
  
      return res.writeHead(201).end()
    }
  }
]