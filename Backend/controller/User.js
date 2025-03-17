import User from "../models/UserModel.js"

//Get All
export const getTodo = async (req,res) => {
    try{
        const user = await User.find()
        res.status(200).json(user)

    }catch(err){
        res.status(500).json({Message : err.Message})
    }
        
}

//Get by id
export const getid = async (req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({Message : "User Not Found"})
        res.status(200).json(user)

    }catch(err){
        res.status(500).json({Message : err.Message})
    }
        
}

// Add item
export const addTodo = async (req, res) => {
    const { name, age, email } = req.body;

    // Check if all required fields are provided
    if (!name || !age || !email) {
        return res.status(400).json({ message: "All fields (name, age, email) are required." });
    }

    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
  };


export const updateTodo = async (req,res) => {
    try {
        const updateItem = await User.findByIdAndUpdate(req.params.id ,req.body ,{new : true})
        if(!updateItem)return res.status(404).json({Message : "User Not Found"})
        res.status(200).json(updateItem)
        
    } catch (error) {
        res.json({Message : error})
    }
}


export const delTodo = async (req,res) => {
    try {
        const delItem = await User.findByIdAndDelete(req.params.id)
        if(!delItem)return res.status(404).json({Message : "User Not Found"})
        res.status(200).json(delItem)
        
    } catch (error) {
        res.json({Message : error})
    }
}