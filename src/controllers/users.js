import { getServiceUsers } from "../services/user.js"

export function getUsers (req, res) {
  getServiceUsers()
  res.send('list users')
}