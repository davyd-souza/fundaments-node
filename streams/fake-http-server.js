import http from 'node:http'
import { Transform } from 'node:stream'

class InvertNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const invertedNumber = Number(chunk.toString()) * -1

    console.log(invertedNumber)

    const buf = Buffer.from(String(invertedNumber))
    
    callback(null, buf)
  }
}

// req -> Readable Stream
// res -> Writable Stream

const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent)

  return res.end(fullStreamContent)
  // return req
  //   .pipe(new InvertNumberStream())
  //   .pipe(res)
})

server.listen(3334)