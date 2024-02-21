import express from "express";
import { ApiFailedResponse } from "../../helper/global";
import { FailedMsg, SuccessMsg } from "../../helper/messages";

const User = require('../../db/models/User');
const usersRouter = express.Router();


type QueryType = { 
    page?: string;
    pageSize?: string;
    search?: string;

};

usersRouter.get("/", async (req, res) => {
    const { pageSize = '10', page = '1', search }: QueryType = req.query;
    const skip: number = (parseInt(page) - 1) * parseInt(pageSize);

    try {
        let matchQuery = { "roles.type": "user" }; // Default match query
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