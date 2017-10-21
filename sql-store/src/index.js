import 'babel-polyfill'
import * as models from './models'
import { createModelMiddleware, createResponderMiddleware } from 'autonym'
import bodyParser from 'body-parser'
import express from 'express'

const crash = err => {
  console.error(err)
  process.exit(1)
}

const app = express()
app.use(bodyParser.json({}))

const modelMiddleware = createModelMiddleware({ models })

// Listen for errors that occur when models are initialized. If you don't do this and any init functions for models
// throw errors, they will be processed by Node's default unhandledRejection event handler, which may not report the
// error and will not crash the app.
Promise.all(modelMiddleware.modelInitializations).catch(crash)

// Mount Autonym middleware
app.use(modelMiddleware)
app.use(createResponderMiddleware())

// Express' default error middleware prints errors; if an uncaught exception is thrown (that wasn't a client error),
// we should crash the app.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.isAutonymError || !err.isClientError()) {
    crash(err)
  }
})

// Start HTTP server
app.listen(process.env.PORT || 3000, () => console.log('API is ready'))
