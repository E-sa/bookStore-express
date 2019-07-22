const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const guard = require('../services/guard');


const User = require('../models/User.model');

//List of users
router.get('/',(req,res) => {
    User
        .find({})
        .then(users => {
            res.json({
                status: true,
                data: users,
                msg: "listing users success"
            });
        })
        .catch(err => {
            throw new Error(err);
        })

});



//Register
router.post('/',(req,res) => {
    const {username, password, email} = req.body;

    if(username && password && email){
        User
            .findOne({email})
            .then(user => {
               if (!user){
                let newUser = new User(req.body);
                newUser
                    .save()
                    .then(user => {
                        res.json({
                            status: true,
                            data: user,
                            msg: 'register user successful'
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            status: false,
                            msg: 'Error registering User'
                        });
                        throw new Error(err);
        
                    })

               }else{
                res.status(409).send({
                    status: false,
                    msg: 'user already exists'
                });
               }
            })

        
    }else{
        res.status(500).send({
            status: false,
            msg: 'Error registering User'
        });
    }

});


//login
router.post('/login', (req, res) => {
    
    const { email, password } = req.body;


    if (email && password){

        User
            .findOne({email})
            .then(user => {
                if (user){
                    
                    // Compare Password
                    user.comparePassword(password, function(err, isMatch){
                        if (err) throw new Error(err);

                        if (!err && isMatch){
                            
                            // Token

                            let claims = {
                                expiresIn : '6h',
                                issuer: 'elahe',
                                audience: 'us'
                            };

                            let payload = {
                                username : user.username,
                                email: user.email
                            }

                            jwt.sign(payload, 'TEST', claims, function(err, token){
                                if (!err){
                                    
                                    res.json({
                                        status: true,
                                        msg: 'Login successful',
                                        data: token
                                    });
                                }
                            });

                        } else {
                            res.json({
                                status: false,
                                msg: 'User/Password incorrect'
                            });
                        }

                    });
                    
                } else {
                    res.status(404).send({
                        status: false,
                        msg: 'user not found'
                    });
                }
            })

    } else {
        res.status(500).send({
            status: false,
            msg: 'incorrect data'
        });
    }

});



//Auth
//welcome page
router.put('/logout',guard, (req,res,next) => {
    res.json('welcome ' + req.user.username);

 
});

//delete
router.delete('/:id',  (req,res) => {
    User.findByIdAndRemove({ _id : req.params.id }).then(function(User){
        res.json({
            status: true,
            data: User,
            msg: 'the User deleted sucfly'
        })
        
    });
    

});



//logout
router.get('/logout',guard, function(req, res, next) {

    });

module.exports = router;