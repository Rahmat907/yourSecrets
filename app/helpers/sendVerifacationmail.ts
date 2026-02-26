import { resend } from "../lib/resend";
import VerificationEmail from "@/email/Email";
import { ApiResponse } from "../types/Apiresponse";


export async function sendVerficationEmail(
    email: string,
    username : string, 
    verifyCode : string,
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from : 'youremail@resend.dev',
            to : 'user@gmail.com',
            subject : 'Verification code',
            react : VerificationEmail({username, otp:verifyCode}) 
        })
        return {success : true, message : 'send verficiation email'}
    } catch (emailError) {
        console.error("Error sending verification email",emailError)
        return {success : false, message : 'Failed to send verficiation email '}

    }
}