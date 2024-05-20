import { Request, Response } from "express";
import User, { UserDocument, LearningPreferencesDocument, StatsDocument } from "../models/user.model";

// FIX: implementare deserializzatore per limitare l'output
export const getUserInfo = async (req: Request, res: Response) => {
  res.json(req.user);
}

export const register = async (req: Request, res: Response) => {
  try{
    const { username } = req.body;
    if(!username) return res.status(400).json({message: "Username is required"});
    
    if(await User.findOne({username : username})) return res.status(400).json({message: "Username already exists"});
    
    const user = await new User({username}).save();
    return res.json(user);
  }catch(err){
    console.error(err);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const updateUserInfo = async (req: Request, res: Response) => {
  try{
    const { username } = req.body;
    const learningPreferences = req.body.learningPreferences;
    const stats = req.body.stats;

    const user: UserDocument | null = await User.findOne({username: username});

    if(!user) return res.status(404).json({message: "User not found"});

    if(learningPreferences){
      user.learningPreferences = learningPreferences;
    }

    if(stats){
      user.stats = stats;
    }
    
    await user.save();
    return res.json(user);
  }catch(err){
    console.error(err);
    return res.status(500).json({message: "Internal server error"});
  }
}

export const getUserFlowsId = async (req: Request, res: Response) => {
  try{
    const { username } = req.params;
    const user = await User.findOne({username: username});
    if(!user) return res.status(404).json({message: "User not found"});
    return res.json(user.contexts);
  }catch(err){
    console.error(err);
    return res.status(500).json({message: "Internal server error"});
  }
}