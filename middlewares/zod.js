import { z } from "zod";

export const ZLoginObject = z.object({
  email: z.string().email("Need Email"),
  password: z.string(),
});

export const ZUserObject = z.object({
  email: z.string().email("Need Email"),
  handle: z.string(),
  password: z.string(),
  avatar: z.string().optional(),
});

export const ZPostObject = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.string().array().optional(),
  private: z.boolean().optional(),
  writtenBy: z.string(),
});
