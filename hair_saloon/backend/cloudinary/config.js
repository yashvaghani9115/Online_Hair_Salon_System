import dotenv from 'dotenv'
dotenv.config();

import cloudinary from "cloudinary";

cloudinary.config({
    cloud_name: "ddvzuicze",
    api_key: "453388379553575",
    api_secret: "oAhNr8bXLA24vK878SdsBRTM5D0",
});

export default cloudinary;