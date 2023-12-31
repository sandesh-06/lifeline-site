import User from "../models/User.model.mjs";
import MedicalDetails from "../models/MedicalDetails.model.mjs";
import { errorHandler } from "../utils/error.mjs";


export const getUserDetails = async(req, res, next) =>{
  try {
    const userId = req.user._id;
    if(!userId) next(errorHandler(400, "User id not found, You are unauthorized!"))

    const user = await User.findById(userId).select("-password")
    if(!user) next(errorHandler(400, "User not found!"))

    return res.status(200).json(user)
  } catch (error) {
    next(error.message)
  }
}
//FUNCTION TO ADD MEDCIAL DETAILS
export const addMedicalDetails = async(req, res, next)=>{
  try {
    const userId = req.user._id;

    if(!userId) next(errorHandler(400, "User id not found, You are unauthorized!"))
    
    const {medical_conditions, allergies, past_surgeries} = req.body;

    // Validate the provided medical details
    if (medical_conditions.length===0 && allergies.length===0 && past_surgeries.length===0) {
      return next(errorHandler(404, 'Enter some medical record!'));
    }

    // Fetch the user using the provided userId
    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    // Extract the medical ID from the user object
    const medicalId = user.medical_id;
   
    // Create a new medical details document
    const newMedicalDetails = new MedicalDetails({
      user_id: userId,
      medical_id: medicalId,
      medical_conditions,
      allergies,
      past_surgeries,
    });

    // Save the document to the database
    await newMedicalDetails.save();

    res.status(200).json(newMedicalDetails);
  } catch (error) {
    next(error);
  }
}

//TO UPDATE MEDICAL DETAILS 
export const updateMedicalDetails = async(req, res, next)=>{
  //GET THE DETAILS TO UPDATE
  const {medical_conditions, allergies, past_surgeries} = req.body;
    // Validate the provided medical details
    if (medical_conditions.length===0 && allergies.length===0 && past_surgeries.length===0) {
      return next(errorHandler(404, 'Enter some medical record!'));
    }

  //GET THE USER ID
  const userId = req.user._id;
  if(!userId) next(errorHandler(400, "You are unauthorized, not allowed to update the details!"))

  //FIND THE MEDICAL DETAILS FOR THE USER
  const updatedDetails = await MedicalDetails.findOneAndUpdate(
   { user_id: userId},
   {
    $set:{
      medical_conditions,
      allergies,
      past_surgeries
    }
   }
  
    ).select("-user_id")

    if(!updatedDetails) next(errorHandler(404, "Cannot find medical details to update!"))

    return res
    .status(200)
    .json(updatedDetails)
}

export const getMedicalDetails = async(req, res, next)=>{
  try {
    const userId = req.user._id
    if(!userId) next(errorHandler(400, "Cannot get medical details, you are unauthorized"))

    const user = await User.findById(userId)
    if(!user) next(errorHandler(404, "User not found to display the medical details"))

    const medicalId = user.medical_id
    
    const userMedicalDetails = await MedicalDetails.findOne({medical_id: medicalId}).select("-_id -user_id -medical_id");
    if (!userMedicalDetails) {
      return next(errorHandler(404, 'Medical details not found'));
    }

    return res.status(200).json(userMedicalDetails);
    
  } catch (error) {
    next(error)
  }
}

  
