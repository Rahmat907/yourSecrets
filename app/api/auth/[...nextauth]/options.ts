import { NextAuthOptions } from "next-auth";
import { CredentialsProvider } from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnected from "@/app/lib/dbConnect";
import UserModel from "@/app/models/user.model";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
        
        })
    ]
}