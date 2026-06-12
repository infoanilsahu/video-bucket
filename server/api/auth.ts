import { Router } from 'express';
import bcrypt from 'bcrypt';
import { signToken, verifyToken } from '../utils/jwt';
import prisma from '../prisma/db';
import { signupSchema, loginSchema } from '../validation/zodSchemas';

const router = Router()


// Signup
router.post('/signup', async (req, res) => {
  
  const parser = signupSchema.safeParse(req.body)
  if ( !parser.success ) {
    return res.status(401).json({
      error: 'Invalid credentials'
    })
  }

  const { username, password, channelName, gender } = parser.data


  // Check if username exists
  const existingUser = await prisma.user.findUnique({
    where: { username }
  });

  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: { username, password: hashedPassword, channelName, gender }
  });

  return res.status(200).json({
    message: "user successfully register",
    user
  })

  
});



// Login
router.post('/login', async (req, res) => {
  const parser = loginSchema.safeParse(req.body);
  if ( !parser.success ) {
    return res.status(401).json({
      error: 'Invalid credentials'
    })
  }

  const { username, password } = parser.data

  // Find user
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Generate token
  const token = signToken(user.id, user.username);

  res.cookie("token", token)

  res.status(200).json({ 
    message: "user successfully login",
    user
   });
});



router.get("/logout", async (req, res) => {
  const { token } = req.cookies

  if ( !token ) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = verifyToken(token) as { id: string };
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: {id: userId}
    })
    if( !user ) return res.status(404).json({ error: "User not found" });

    res.clearCookie("token")

    return res.status(200).json({
      message: "Logged out successfully "
    })
    
  } catch (err) {
    return res.status(401).json({ error: 'Authentication failed' });
  }
})

export default router;