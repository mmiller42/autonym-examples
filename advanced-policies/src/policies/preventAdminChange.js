export default function preventAdminChange(req) {
  // Simply unset any value the user may have attempted to set for the isAdmin property
  req.setData({ isAdmin: undefined })
}
