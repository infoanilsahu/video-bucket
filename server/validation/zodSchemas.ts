
import { z } from 'zod';

// Validation schemas
const signupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  gender: z.enum(["Male", "Female", "Others"]),
  channelName: z.string()

});

const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

const videoUploadSchema = z.object({
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string()
});

export { signupSchema, loginSchema, videoUploadSchema };