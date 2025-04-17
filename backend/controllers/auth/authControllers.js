import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = []; 

export const registerUser = (req, res) => {
  const { name, email, password } = req.body;
  const userExists = users.find(user => user.email === email);
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), name, email, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
};
