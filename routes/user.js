const express = require("express");
const { User, Show } = require("../models/index");

const userRouter = express.Router();
userRouter.use(express.json());

//GET Requests
    //All users
userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.findAll();
        if (!allUsers) {
            throw new Error("No users found")
        } else {
            res.status(200).send({allUsers});
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

    //One user
userRouter.get("/:id", async (req, res) => {
    try {
        const oneUser = await User.findByPk(req.params.id);
        if (!oneUser) {
            throw new Error("No users found")
        } else {
            res.status(200).json(oneUser);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

    //Shows of a particular user
userRouter.get("/:id/shows", async (req, res) => {
    try {
        const userShows = await Show.findAll({ where: { userId: req.params.id } });
        if (!userShows) {
            throw new Error("No shows found for this user!")
        } else {
            res.status(200).json(userShows);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

//PUT Requests 
    //Update user of a watched show
userRouter.put("/:userId/shows/:showId", async (req, res) => {
    try {
        let chosenUser = await User.findByPk(req.params.userId);
        let watchedShow = await Show.findByPk(req.params.showId);
        if (!chosenUser) {
            throw new Error("No user was found with this id")
        } else if (!watchedShow) {
            throw new Error("No show was found with this id")
        } else {
            await chosenUser.addShow(watchedShow);
            await watchedShow.update({status: "watched"});
            let myShows = await Show.findAll();
            res.status(202).json(myShows);
        }
    } catch (error) {
        res.status(500).json({err: error.message})
    }

})

module.exports = userRouter;