const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name:"druhdw3tu", 
    api_key:"351726684652899", 
    api_secret:"5bUqj8bsSaGpLEhMlupDjxIco3w"
})

const cloudinaryUploadImages =async (fileToUpload)=>{
    return new Promise((resolve)=>{
        cloudinary.uploader.upload(
         fileToUpload,(result)=>{
            resolve({url:result.secure_url,
            asset_id:result.asset_id,
            public_id:result.public_id})
         },{
            resource_type:"auto"
         }   
        )
    })
}
module.exports={cloudinaryUploadImages}