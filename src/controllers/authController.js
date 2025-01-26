import { getServiceUsersByEmail } from '../services/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function login(req, res) {
 const { email, password } = req.body;
 if (!email || !password)
  return res
   .status(400)
   .json({ error: 'The email and password are required.' });
 try {
  const user = await getServiceUsersByEmail(email);

  if (!user)
   return res
    .status(404)
    .json({ error: 'User not found. Please Check your email' });

  const isValidPassword = await bcrypt.compare(password, user.password_hash);

  if (!isValidPassword)
   return res
    .status(401)
    .json({ error: 'Invalid Password. Please Check your password' });

  const token = jwt.sign(
   { id: user.id, nombre: user.nombre, email: user.email },
   process.env.JWT_SECRET_KEY,
   {
    expiresIn: '1h',
   }
  );

  res.status(200).json({ message: 'Login successful', token });
 } catch (error) {
  console.log('Error logging in.', error);
  res.status(500).json({ error: 'Error logging in.' });
 }
}

export async function logout(req, res) {
 req.session.destroy((err) => {
  if (err)
   return res
    .status(500)
    .json({ error: 'An error occurred during logout. please try again' });

  res.status(200).json({ message: 'Logout succesful' });
 });
}
