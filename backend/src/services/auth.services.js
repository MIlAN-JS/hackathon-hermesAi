import jwt from "jsonwebtoken"
import config from "../config/config.js";
import userModel from "../models/user.model.js";
import generateToken from "../utils/generateToken.utils.js";





const registerUserService = async({email, password, name})=>{

const existingUser = await userModel.findOne({ email })
  if (existingUser) {
    throw new Error("Email already registered")
  }

  // create new business
  const user = await userModel.create({ email, password , name })

  return {
    _id: user._id,
    email: user.email,
    name: user.name,
    token: generateToken(user._id)
  }



}


 const findOrCreateUser = async (userData, provider) => {
  // destructure from Google profile
  const { id, displayName, name, emails, photos } = userData;

  // check if user exists
  const user = await userModel.findOne({
    $or: [
      { googleId: id },
      ...(emails?.[0]?.value ? [  ...(email && { email })] : []),
    ],
  });

  if (user) {
    return user;
  }

  // build full name
  const fullName = name
    ? `${name.givenName || ""} ${name.familyName || ""}`.trim()
    : displayName;

  // extract email safely
  const email = emails?.[0]?.value;

  // create new user
  const newUser = await userModel.create({
    name: fullName,
    googleId: id,
    ...(email && { email }),
    avatar: photos?.[0]?.value, // 🔥 optional but useful
  });

  return newUser;
};


export { 
    registerUserService, 
    findOrCreateUser
}