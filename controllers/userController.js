const userModel = require('../models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dentistModel = require('../models/dentistModels')

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({email: req.body.email});
            if(existingUser){
                return res
                .status(200)
                .send({ message: 'User Already Exist', success:false })
            }
            const password = req.body.password
            const salt = await bcrypt.genSalt(8)
            const hashedPassword = await bcrypt.hash(password, salt)
            req.body.password = hashedPassword
            const newUser = new userModel(req.body)
            await newUser.save()
            res.status(201).send({message: 'Register Successful', success: true})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, message: `Register Controller ${error.message}`
    });
    }
};

//login callback
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({name: req.body.name})
        if(!user){
            return res
            .status(200)
            .send({message:'User not Found', success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message:'Invalid Email or Password', success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET, {expiresIn: '1d',});
        res.status(200).send({message:'Login Success', success:true, token })
    }catch(error) {
        console.log(error)
        res.status(500).send({message: `Error in Login ${error.message}`})
    }
};

const authController = async (req, res) => {
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(200).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };

//Apply Dentist
const applyDentistController = async (req, res) => {
  try {
    const newDentist = await dentistModel({...req.body, status:"pending"})
    await newDentist.save();
    const adminUser = await userModel.findOne({isAdmin:true})
    const notification = adminUser.notification;
    notification.push({
      type:'apply-dentist',
      message:`${newDentist.firstName} ${newDentist.lastName} has applied For a Dentist Account`,
      data:{
        dentistId: newDentist.firstName + " " + newDentist.lastName,
        onClickPath: "/admin/dentists"
      }
    })
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
      res.status(201).send({
        success:true,
        message:'Doctor Account Applied Successfully',
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      error,
      message: 'Error While Applying Dentist'
    });
  }
}


//notification controller
const getAllNotificationController = async (res, req) => {
  try {
    const user = await userModel.findOne({_id:req.body.userId})
    const seennotification = user.seennotification
    const notification = user.notification
    seennotification.push(...notification)
    user.notification = []
    user.seennotification = notification
    const updatedUser = await user.save()
    res.status(200).send({
      success: true,
      message: 'All notification marked as read',
      data:updatedUser,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'Error in Notification',
      success:false,
      error
    })
  }
}


module.exports = { loginController, registerController, authController, applyDentistController, getAllNotificationController };