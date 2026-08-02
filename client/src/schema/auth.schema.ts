import {  z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email("Invalid email fomrat"),
    password: z.string().min(1, "Password is required")
});
export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email fomrat"),
    password: z.string().min(1, "Password is required")
})

export type RegisterData =  z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;