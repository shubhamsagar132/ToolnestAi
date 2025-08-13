import{v2 as cloudinary} from 'cloudinary'
const connectCloudinary=async () => {
const cloudinaryConfig = ({
    cloud_name: process.env.Cloudinary_CLOUD_NAME,
    api_key: process.env.Cloudinary_API_KEY,
    api_secret: process.env.Cloudinary_API_SECRET,  
})
}    
export default connectCloudinary;