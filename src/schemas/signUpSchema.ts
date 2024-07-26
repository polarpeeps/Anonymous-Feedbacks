import {z} from "zod"

export const userValidation=z
    .string()
    .min(2,"Username must have atleast 2 characters")
    .max(20,"Username must have at most 2 characters")
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const SignUpSchema=z.object({
    username:userValidation,
    email:z.string().email({message:"Invalid Email address"}),
    password:z
    .string()
    .min(6,"Password must have 6 characters"),
})