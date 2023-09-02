import http from 'node:http'
import { randomUUID } from 'node:crypto'

import { json } from './middleware/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res
      .end(JSON.stringify(users))
  }
  
  if (method === 'POST' && url === '/users') {
    if (req.body === null || req.body.email === undefined || req.body.name === undefined) {
      return res.writeHead(400).end('Missing body with fields: email and name.')
    }

    const { name, email } = req.body

    users.push({
      id: randomUUID(),
      name,
      email,
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)