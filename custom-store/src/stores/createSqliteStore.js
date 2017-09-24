import { AutonymError } from 'autonym'
import { Database } from 'sqlite3'
import camelCase from 'lodash.camelcase'
import snakeCase from 'lodash.snakecase'

// A utility that lets us call a callback-style function and return a promise. The promise also resolves with the value
// of `this` from inside the callback, as sqlite3 exposes some attributes on the this object.
const promisify = fn =>
  new Promise((resolve, reject) => {
    fn(function callback(err, result) {
      if (err) {
        reject(err)
      } else {
        // eslint-disable-next-line no-invalid-this
        resolve({ result, thisArg: this })
      }
    })
  })

export default function createSqliteStore(tableName, createTableQuery) {
  const connection = new Promise((resolve, reject) => {
    // Instantiate a Sqlite database connection
    const db = new Database('example.sqlite', err => {
      if (err) {
        reject(err)
      } else {
        resolve(db)
      }
    })
  }).then(async db => {
    // Create the table (the command for the table creation lives in the model)
    await promisify(cb => db.run(createTableQuery, cb))
    return db
  })

  return {
    init: () => connection,
    create: async data => {
      const db = await connection

      const columns = Object.keys(data)
      const values = Object.values(data)

      // This is not totally safe from SQL injection and your own project may be more robust. Here, we assume that since
      // the data has been filtered by JSON schemas, that all the property names that appear in the data are safe to use
      // as unescsaped column names.
      const { thisArg: { lastID: lastId } } = await promisify(cb =>
        db.run(
          `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`,
          values,
          cb
        )
      )

      const { result } = await promisify(cb => db.get(`SELECT * FROM ${tableName} WHERE id = $id`, { $id: lastId }, cb))
      return result
    },
    find: async () => {
      const db = await connection

      const { result } = await promisify(cb => db.all(`SELECT * FROM ${tableName}`, cb))
      return result
    },
    findOne: async id => {
      const db = await connection

      const { result } = await promisify(cb => db.get(`SELECT * FROM ${tableName} WHERE id = $id`, { $id: id }, cb))

      // Here is where we can throw a not found error if the result is null
      if (!result) {
        throw new AutonymError(AutonymError.NOT_FOUND, 'Record not found')
      }
      return result
    },
    findOneAndUpdate: async (id, data) => {
      const db = await connection

      const columns = Object.keys(data)
      const values = Object.values(data)
      const setQuery = columns.map(column => `${column} = ?`)

      await promisify(cb =>
        db.run(
          `UPDATE ${tableName} SET ${setQuery.join(', ')} WHERE id = $id`,
          {
            ...values.reduce((map, value, i) => {
              map[i + 1] = value
              return map
            }, {}),
            $id: id,
          },
          cb
        )
      )

      const { result } = await promisify(cb => db.get(`SELECT * FROM ${tableName} WHERE id = $id`, { $id: id }, cb))
      if (!result) {
        throw new AutonymError(AutonymError.NOT_FOUND, 'Record not found')
      }
      return result
    },
    findOneAndDelete: async id => {
      const db = await connection

      const { thisArg: { changes: recordCount } } = await promisify(cb =>
        db.run(`DELETE FROM ${tableName} WHERE id = $id`, { $id: id }, cb)
      )
      if (recordCount === 0) {
        throw new AutonymError(AutonymError.NOT_FOUND, 'Record not found')
      }
    },
    // Our serialize and unserialize functions are used to convert our data to snake_case before it is passed to the
    // database handling methods, and back to camelCase before passing on to policies and responses
    serialize: data =>
      Object.keys(data).reduce((serializedData, key) => {
        serializedData[snakeCase(key)] = data[key]
        return serializedData
      }, {}),
    unserialize: data =>
      Object.keys(data).reduce((serializedData, key) => {
        serializedData[camelCase(key)] = data[key]
        return serializedData
      }, {}),
  }
}
