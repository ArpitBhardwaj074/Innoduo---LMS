const TryCatch = (handler) => {
    return async(req,res,next)=>{
        try{
            await handler(req,res,next)
        }catch(error){
            console.log(error)
            res.send(500).json({
                message: error.message
            })
        }
    }
}

export default TryCatch;