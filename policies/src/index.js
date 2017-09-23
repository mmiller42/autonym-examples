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
Promise.all(modelMiddleware.modelInitializations).catch(crash)
app.use(modelMiddleware)
app.use(createResponderMiddleware())

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!err.isAutonymError || !err.isClientError()) {
    crash(err)
  }
})

// Start HTTP server
app.listen(process.env.PORT || 3000, () => console.log('API is ready'))
