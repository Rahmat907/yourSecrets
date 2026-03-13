import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnected from "@/app/lib/dbConnect";
import UserModel from "@/app/models/user.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        id: "credentials",
        name : "Credentials",
        credential:{
            username : {label: "Email", type : "text"},
            password : {label: "Password",  type : "password"}
        },
        async authorize(credentials: any):Promise<any>{
                await dbConnected()
                try{
                   const user = await UserModel.findOne({
                        $or:[
                            {email: credentials.identifier},
                            {username: credentials.identifier}
                        ]
                    })
                    if(!user){
                        throw new Error('No user found with this email')
                    }
                    if(!user.isVerified){
                        throw new Error('Please verfiy your account before login')
                    }
                   const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password)
                   if(isPasswordCorrect){
                    return user
                   }else {
                        throw new Error('Incorrect password')
                   }
                }catch(error : any){
                    throw new Error(error)
                }
        }
        })
    ],
    callbacks:{
        async session({session,user,token}){
            return session
        },
        async jwt({token,user}){
            if(user){
                token._id = user._id?.toString
            }
            return token
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
            strategy : "jwt"
    },
    secret : process.env.NEXTAUTH_SECRET,

}