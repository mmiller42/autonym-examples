import * as models from './models'
import { createModelMiddleware, createResponderMiddleware } from 'autonym'
import bodyParser from 'body-parser'
import express from 'express'

const crash = err => {
  console.error(err)
  process.exit(1)
}

// Make sure we crash on uncaught rejections (default Node behavior is inconsistent with synchronous exceptions)
// See http://2ality.com/2016/04/unhandled-rejections.html#unhandled-rejections-in-nodejs
process.on('unhandledRejection', crash)

const app = express()
app.use(bodyParser.json({}))

// Models may need to be initialized, so `createModelMiddleware` returns a promise. This means that it's important that
// any Express middleware that should be loaded *after* Autonym should only be attached to the app inside this function.
const mountAutonym = async () => {
  // Mount Autonym middleware
  app.use(await createModelMiddleware({ models }))
  app.use(createResponderMiddleware())
  console.log('Autonym is ready')

  // Express' default error middleware prints errors; if an uncaught exception is thrown (that wasn't a client error),
  // we should crash the app.
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    if (!err.isAutonymError || !err.isClientError()) {
      crash(err)
    }
  })
}

mountAutonym()

// Start HTTP server
app.listen(process.env.PORT || 3000, () => console.log('API is ready'))
