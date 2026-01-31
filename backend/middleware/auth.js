import jwt from 'jsonwebtoken';

import User from '../models/userModels.js';


const JWT_SECRET = 'you_jwt_secret_here';
 

export default async function authMiddleware(req,res,next){

 const authHeader = req.header.authorization;

 if(!authHeader||!authHeader.startswith('Bearer')){
    return res.status (401).json({
        success : false ,
        message : 'not authorized , token missing'

    })


 }

  const token = authHeader.split('')[1];

  //verify 
  try {
    const payload = jwt.verify(token,JWT_SECRET);
    const user = await user.findByid(payload.id).select('-password');
    
    if(!user){
      return res.status (401).json({
        success :false,
        message:'User not found'
      })



    }
    req.user = user;
    next ();


  } catch (err) {
    console.error('JWT VERIFICATION FAILED ',err);
    return res.status (401).json({
        success:false,
        message : 'Token invalid or expired'
    })
    
  }


}