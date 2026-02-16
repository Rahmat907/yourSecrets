import {z} from 'zod'

export const usernameValidation = z
.string()
.min(2,"Useranme must be atleast 2 characters")
.max(20, "Username must be no more thean 20 characters")
.regex(/^[a-z0-9]+$/, "Username")


export const signUpSchema = z.object({
   username: usernameValidation,
   email : z.string().email("Invalid email Address"),
   password : z.string().min(6,{message : "password must be atleast 6 character"}) 
})