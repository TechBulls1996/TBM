import express from "express";
import { ApiFailedResponse } from "../../helper/global";
import { FailedMsg, SuccessMsg } from "../../helper/messages";

const User = require('../../db/models/User');
const usersRouter = express.Router();


type QueryType = { 
    page?: string;
    pageSize?: string;
};

usersRouter.get("/", async (req, res) => {
    
    console.log("Here::::::", typeof req.query.page);

    const { pageSize = '10', page = '1' }: QueryType = req.query;
    const skip: number = (parseInt(page) - 1) * parseInt(pageSize);

    try {
        const users = await User.aggregate([
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(pageSize) },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    city: 1,
                    state: 1,
                    type: 1,
                },
            },
        ]);

        if (users.length === 0) {
            return res.status(401).json(ApiFailedResponse(FailedMsg));
        }

        return res.json({
            status: true,
            message: SuccessMsg,
            data: users,
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