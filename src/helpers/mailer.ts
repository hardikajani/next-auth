import User from '@/model/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'



export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VARIFY"){
           await User.findByIdAndUpdate(userId,
            {
              $set: {
                varifyToken: hashedToken, 
                varifyTokenExpiry: Date.now() + 3600000
              } 
            }
            
           )
        } else if(emailType === "RESET"){

          await User.findByIdAndUpdate(userId,
            {
              $set: {
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
              }
            }
           )
        }
        
        const transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "daa8e55c6af8a5",
            pass: "9b0fddb61d99ac"
          }
        });

          const mailOption = {
            from: 'hardik@hardik.ai',
            to: email,
            subject: emailType === "VARIFY" ? "Varify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VARIFY" ? "varify your email" : "reset your password"}.
            or copy and paste the following link in your browser:
            <br> ${process.env.DOMIN}/verifyemail?token=${hashedToken} Thanks, </p>`
          } 
                   
          const mailResponse = await transport.sendMail(mailOption);
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);        
    }
}