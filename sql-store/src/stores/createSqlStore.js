import createSqlStoreCreator from 'autonym-sql-store'

export default createSqlStoreCreator({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: 'example',
  debug: true,
})
