const jwt=require('jsonwebtoken')
const secretKey='ABISKAR';

const verify = (req,res,next) =>{
    const token=req.header('Authorization');
    
    try{
        const decoded=jwt.verify(token,secretKey);
        req.user=decoded;
        next();
    }
    catch(error) {
        res.status(400).json({error});
    }
}
module.exports=verify;