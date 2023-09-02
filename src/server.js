import http from 'node:http'
import { randomUUID } from 'node:crypto'

const users = []

const server = http.createServer(async (req, res) => {
  const buffers = []
  const { method, url } = req

  for await(const chunk of req) {
    buffers.push(chunk)
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }

  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
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