import express from "express";
import { FailedMsg, SuccessMsg } from "../../helper/messages";
import { generatePassword } from "../../helper/auth";
import { registerValidate } from "../../helper/validations/authValidation";

const User = require('../../db/models/User');
const usersRouter = express.Router();

type QueryType = { 
    page?: string;
    pageSize?: string;
    search?: string;
};

usersRouter.post("/delete", async (req: any, res: any) => {
    const {id} = req.body;
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (deletedUser) {
        res.status(200).json({
            status: true,
            message: SuccessMsg,
        });
        }
    } 
    catch (err) {
        console.log("User Delete Error:", err);
        return res.status(500).json({
            status: false,
            message: FailedMsg,
        });
    }
    return false;
  });

usersRouter.post("/create", registerValidate, async (req: any, res: any) => {
    const {
      id,  
      fullName,
      email,
      password,
      phone,
      dob,
      gender,
      bloodGroup,
      country,
      state,
      city,
      address,
      pinCode,
    } = req.body;
    try {
      const passwordHash = await generatePassword(password);
      let user;
      if(!id){ 
        user = await User.create({
            name: fullName,
            email,
            password: passwordHash,
            mobile: phone,
            dob,
            gender,
            bloodGroup,
            country,
            state,
            city,
            address,
            pinCode,
        });
      }else{
        user = await User.findOneAndUpdate(
            { _id: id },
            {
              name: fullName,
              email,
              password: passwordHash,
              mobile: phone,
              dob,
              gender,
              bloodGroup,
              country,
              state,
              city,
              address,
              pinCode,
            },
            { new: true }
          );
      }
  
      if (user) {
        return res.status(200).json({
            status: true,
            message: SuccessMsg,
        });
      }
    } catch (err) {
      console.log("Register Error:", err);
       return res.status(500).json({
         status: false,
         message: FailedMsg,
         });
    }
    return false;
  });

usersRouter.get("/", async (req, res) => {
    const { pageSize = '10', page = '1', search }: QueryType = req.query;
    const skip: number = (parseInt(page) - 1) * parseInt(pageSize);
    try {
        let matchQuery: any = { "roles.type": "user" }; 
        if (search) {
            matchQuery = {
              $and: [
                    { "roles.type": "user" },
                    {
                        $or: [
                            { name: { $regex: search, $options: 'i' } },
                            { email: { $regex: search, $options: 'i' } }
                            
                        ]
                    }
                ]
            };
        }

        const users = await User.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(pageSize) },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email:1,
                    image: 1,
                    city: 1,
                    state: 1,
                    roles: 1,
                    address: 1,
                    pinCode: 1,
                    mobile: 1,
                },
            },
            { $unwind: "$roles" },
            { $match: matchQuery }
        ]);

        if (users.length === 0) {
            return res.status(200).json({
                status: true,
                message: SuccessMsg,
                data: [],
                hashNextPage: false,
            });
        }

         // Check if there are more users beyond this page
         const hasNextPage = users.length === parseInt(pageSize);

        return res.json({
            status: true,
            message: SuccessMsg,
            data: users,
            hasNextPage,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: FailedMsg,
        });
    }
});

module.exports = usersRouter;