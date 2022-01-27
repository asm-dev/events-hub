const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')

const db = "mongodb+srv://asm:asm2000@angular.kfs33.mongodb.net/Angular?retryWrites=true&w=majority"

mongoose.connect(db, function(err) {
    if(err) {
        console.log('Error' + err);
    } else {
        console.log('connected to mongodb');
    }
})

function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    } 
    req.userId = payload.subject
    next()
}

router.get('/', function(req, res) {
    res.send('from api route')
})

router.post('/register', function(req, res) {
    let userData = req.body
    let user = new User(userData)
    user.save(function(error, registeredUser) {
        if(error) {
            console.log(error);
        } else {
            let payload = { subject: registeredUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', function(req, res) {
    let userData = req.body

    User.findOne({email: userData.email}, function(error, user) {
        if(error) {
            console.log(error);
        } else {
            if(!user) {
                res.status(401).send('Invalid email')
            } else {
                if(user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events', function(req, res) {
    let events = [
        {
            "_id": "1",
            "name": " Regular Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "2",
            "name": " Regular Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "3",
            "name": " Regular Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "4",
            "name": " Regular Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "5",
            "name": " Regular Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "6",
            "name": " Regular Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        }
    ]
    res.json(events)
})

router.get('/special', verifyToken, function(req, res) {
    let events = [
        {
            "_id": "1",
            "name": "Special Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "2",
            "name": "Special Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "3",
            "name": "Special Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "4",
            "name": "Special Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "5",
            "name": "Special Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        },
        {
            "_id": "6",
            "name": "Special Auto Expo",
            "description": "lorem inpsum",
            "date": "25-jan-22"
        }
    ]
    res.json(events)
})

module.exports = router