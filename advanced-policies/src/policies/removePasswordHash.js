export default function removePasswordHash(req, res) {
  if (req.isFinding()) {
    res.setData(res.getData().map(() => ({ passwordHash: undefined })))
  } else {
    res.setData({ passwordHash: undefined })
  }
}
