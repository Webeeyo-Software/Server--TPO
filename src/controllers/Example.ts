import { Request, Response } from 'express';
import db from '../models';
import jwt from 'jsonwebtoken';


declare module 'express-session' {
  interface SessionData {
    uuid?: string;
    username?: string;
  }
}

const User = db.User;

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  // Role-based authorization: only admin can access
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Dummy authentication: replace with real user lookup
  if (email && password) {
    // Find user in DB to get role
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    // JWT AUTH START
    const accessToken = jwt.sign(
      { email: user.email, 
        role: user.role 

      },
      process.env.JWT_SECRET || 'default_jwt_secret',
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { email: user.email, 
        role: user.role 

      },
      process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret',
      { expiresIn: '7d' }
    );
    // Optionally store refreshToken in DB or memory for invalidation
    res.json({ message: 'Login successful', accessToken, refreshToken });
    // // JWT AUTH END
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

export const refreshAccessToken = (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });
  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET || 'default_jwt_refresh_secret',
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err) return res.status(403).json({ error: 'Invalid refresh token' });
      const newAccessToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET || 'default_jwt_secret',
        { expiresIn: '15m' }
      );
      res.json({ accessToken: newAccessToken });
    }
  );
};
