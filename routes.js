const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const path = require('path');

const Issues = require('./models/issues');
const { nextTick } = require('process');

const router = express.Router();

router.post("/remove", (req, res) => {
    console.log(req.body)
    Issues.findOneAndDelete({_id: req.body.id})
        .then((data) =>{
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) =>{
            console.log('error: ', error);
        });
});

router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);
    const data = req.body;
    // const data = {
    //     name: "test",
    //     priority: "priority"
    // };

    const newIssues = new Issues(data);

    // save

    newIssues.save((error) => {
        if(error){
            res.status(500).json({ msg: 'Sorry, internal server errors'});
            return;
        }
        // Issues
        return res.json({
            msg: 'Your data has been saved!'
        }); 
    });
});

module.exports = router;