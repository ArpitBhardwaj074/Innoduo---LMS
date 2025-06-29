import multer from 'multer'
// import {v4 from uuid} from 'uuid'0

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, "uploads")
    },
    filename: function(req, file, callback){
        const id = uuid()

        const extName = file.originalname.split(".").pop()

        const fileName = `${id}.${extName}`

        callback(null, fileName)
    }
})

export const uploadFiles = multer({storage}).single("file")