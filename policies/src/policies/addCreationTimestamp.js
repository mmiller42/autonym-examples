export default function addCreationTimestamp(req) {
  // Add a computed property that is part of the schema. If this were not part of the schema, it would be removed from
  // the data after schema validation is run. If you want to save properties on the data object that are not part of the
  // schema, it is best to use the `postSchema` hook to modify the data instead.

  req.setData({ creationTimestamp: Math.floor(new Date().getTime() / 1000) })
}
