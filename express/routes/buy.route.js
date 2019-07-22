const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const guard = require('../services/guard');

const User = require('../models/User.model');
const Book = require('../models/Book.model');
const  Buy = require('../models/buy.model');


router.post('/purchase',guard,(req,res) => {
    // res.send(req.user);
    const {title, quantity} = req.body;

    if(title && quantity){
        Book
            .findOne({title})
            .then(book => {

                var whatWeNeed = {"title" : title, "quantity": quantity, 'user': req.user.email};


               if (book.quantity>=quantity){

                let newBuy = new Buy(whatWeNeed);
                newBuy
                    .save()
                    Book.updateOne({"title":title}, {$set:{"quantity":book.quantity - quantity}})
                    .then(book => {
                        res.json({
                            status: true,
                            // data: book,
                            msg: 'hey ' + req.user.username + ', thank you for purchase the book'
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            status: false,
                            msg: 'Error in purchase'
                        });
                        throw new Error(err);
        
                    })

                
            }
            else{
                res.json({
                    status: false,
                    msg: 'there is/are ' + book.quantity + ' in storage'
                });

            }
        })
    }else{
        res.json({
            status: false,
            msg: 'post both title and quantity'
        });

    }

});


router.post('/rent', guard, (req, res) => {
    const {title} = req.body;
    if(title){
        Book
            .findOne({title})
            .then(book => {
                if(book){
                    Book.updateOne({"title":title}, {$push: { "users": req.user.email }})
                    .then(book =>{
                        res.json({
                            status: true,
                            // data: book,
                            msg: 'hey ' + req.user.username + ', thank you for purchase the book'
                            // sth: req.user.email
                        });

                    })


                }
            })
    }


});



module.exports = router;