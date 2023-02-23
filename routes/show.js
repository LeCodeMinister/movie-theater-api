const express = require("express");
const { Show } = require("../models/Show");
const { User } = require("../models/User");
const { check, validationResult } = require("express-validator")

const showRouter = express.Router();
showRouter.use(express.json());

//GET Requests
//All shows
showRouter.get("/", async (req, res) => {
    try {
        const allShows = await Show.findAll();
        if (!allShows) {
            throw new Error("No shows found")
        } else {
            res.status(200).send({allShows});
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

//One show
showRouter.get("/:id", async (req, res) => {
    try {
        const oneShow = await Show.findByPk(req.params.id);
        if (!oneShow) {
            throw new Error("No shows found")
        } else {
            res.status(200).json(oneShow);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

//Shows of a particular genre
showRouter.get("/:genre", async (req, res) => {
    try {
        const genreShows = await Show.findAll({ where: { genre: req.params.genre } });
        if (!genreShows) {
            throw new Error("No shows found for this genre")
        } else {
            res.status(200).json(genreShows);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

//PUT Requests 
//Update rating of watched show
showRouter.put("/:id", async (req, res) => {
    try {
        const chosenShow = await Show.findByPk(req.params.id);
        if (!chosenShow) {
            throw new Error("No show was found")
        } else {
            await chosenShow.update({rating: req.body.rating});
            let myShows = await Show.findAll();
            res.status(202).json(myShows);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

//Update status of a show
showRouter.put("/:id", async (req, res) => {
    try {
        const chosenShow = await Show.findByPk(req.params.id);
        if (!chosenShow) {
            throw new Error("No show was found")
        } else {
            await chosenShow.update({status: req.body.status});
            let myShows = await Show.findAll();
            res.status(202).json(myShows);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})

//DELETE Request
//Delete a show
showRouter.put("/:id", async (req, res) => {
    try {
        const chosenShow = await Show.findByPk(req.params.id);
        if (!chosenShow) {
            throw new Error("No show was found")
        } else {
            await chosenShow.destroy();
            let myShows = await Show.findAll();
            res.status(200).json(myShows);
        }        
    } catch (error) {
        res.status(500).json({err: error.message})
    }
})