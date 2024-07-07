import express from "express";
import { FailedMsg, SuccessMsg } from "../../helper/messages";
//import { generatePassword } from "../../helper/auth";
import { clientRegisterValidate } from "../../helper/validations/authValidation";

const Client = require('../../db/models/Client');
const clientsRouter = express.Router();

type QueryType = { 
    page?: string;
    pageSize?: string;
    search?: string;
};

clientsRouter.post("/delete", async (req: any, res: any) => {
    const {id} = req.body;
    try {
      const deletedUser = await Client.findByIdAndDelete(id);
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

clientsRouter.post("/create", clientRegisterValidate, async (req: any, res: any) => {
    const {
      id,  
      fullName,
      email,
      phone,
      address,
    } = req.body;
    try {
      let user;
      if(!id){ 
        user = await Client.create({
            name: fullName,
            email,
            mobile: phone,
            address,
        });
      }else{
        user = await Client.findOneAndUpdate(
            { _id: id },
            {
              name: fullName,
              email,
              mobile: phone,
              address,
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

clientsRouter.get("/", async (req, res) => {
    const { pageSize = '10', page = '1', search }: QueryType = req.query;
    const skip: number = (parseInt(page) - 1) * parseInt(pageSize);
    try {
        let matchQuery:any = {}; 
        if (search) {
            matchQuery = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { address: { $regex: search, $options: 'i' } }
                ]
            };
        }
        
        const clients = await Client.aggregate([
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
            { $match: matchQuery }
        ]);
        
        if (clients.length === 0) {
            return res.status(200).json({
                status: true,
                message: SuccessMsg,
                data: [],
                hashNextPage: false,
            });
        }

         // Check if there are more users beyond this page
         const hasNextPage = clients.length === parseInt(pageSize);

        return res.json({
            status: true,
            message: SuccessMsg,
            data: clients,
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

module.exports = clientsRouter;