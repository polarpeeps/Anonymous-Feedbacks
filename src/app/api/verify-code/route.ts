import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request) {
    await dbConnect();

    try {
        const {username,code}=await request.json();

        const decodedusername=decodeURIComponent(username);
        const user=await UserModel.findOne({username});

        if(!user){
            return Response.json(
                {
                    success:false,
                    message:"User not found"
                },{
                    status:404
                }
            )
        }

        const isCodeValid=user.verifyCode===code;
        const isCodeNotExpired=new Date(user.verifyCodeExpiry)> new Date();

        if(isCodeValid && isCodeNotExpired){
            user.isVerified=true;
            await user.save();
            return Response.json(
                {
                    success:true,
                    message:"Account Verified successfully!"
                },{
                    status:200
                }
            )
        }else if(!isCodeNotExpired){
            return Response.json(
                {
                    success:false,
                    message:"Verification code expired. Please sign-up again"
                },{
                    status:404
                }
            )
        }else{
            return Response.json(
                {
                    success:false,
                    message:"Invalid Verification code"
                },{
                    status:404
                }
            )
        }
    } catch (error) {
        console.error("Error verifying user",error);
        return Response.json(
            {
                success:false,
                message:"Error Verifying user"
            },{
                status:500
            }
        )
    }
}