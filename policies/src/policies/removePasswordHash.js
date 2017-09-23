export default function removePasswordHash(req, res) {
  // For find requests, the response data is an array
  if (req.isFinding()) {
    res.setData(res.getData().map(() => ({ passwordHash: undefined })))
  } else {
    res.setData({ passwordHash: undefined })
  }
}
