import App from "../App";
import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

const uploadImage = async(imageFile) => {
    const formData = new FormData();
    //Append image file to form data
    FormData.append('image',imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            headers : {
                'Content-Type' : 'multipart/form-data', //Set header for file upload
            },
        });
        return response.data; //Return Response Data

    }catch(error){
       console.error("Error uploading the image",error);
       throw error; //Rethrow error for handling
    }
};

export default uploadImage;