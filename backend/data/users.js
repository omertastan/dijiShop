import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Fatih Taştan',
    email: 'fatih@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Rabia Taştan',
    email: 'rabia@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]
export default users
