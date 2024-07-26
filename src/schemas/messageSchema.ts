import {z} from "zod"

export const MessageSchema=z.object({
    content: z
    .string()
    .min(10,"The message must be 10 characters atleast")
    .max(300,"The message must be 300 characters atmost")
    ,
})