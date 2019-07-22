const express = require('express');
const router = express.Router();
const guard = require('../services/guard');

const Book = require('../models/Book.model');





//List of books
router.get('/',(req,res) => {
    
    var pageOptions = {
    page:  parseInt(req.query.page)  || 0,
    limit:  5 
}

    Book.find()
    .skip(pageOptions.page*pageOptions.limit)
    .limit(pageOptions.limit)
    .exec(function (err, doc) {
        if(err) { res.status(500).json(err); return; };
        res.status(200).json(doc);
    })

});

//specific book
router.get('/:id',(req,res) => {
    

            Book.findOne({_id : req.params.id}).then(function(Book){
                res.json({
                    status: true,
                    data: Book,
                    msg: 'your book'
                });
            }).catch(err => {
                res.status(500).send({
                    status: false,
                    msg: 'id is not valid'
                });
                throw new Error(err);
            })
            
        });

//add new book
router.post('/',(req,res) => {
    const {title,quantity,author} = req.body;

    if(title && quantity && author){
        Book
            .findOne({title})
            .then(book => {
               if (!book){
                let newBook = new Book(req.body);
                newBook
                    .save()
                    .then(book => {
                        res.json({
                            status: true,
                            data: book,
                            msg: 'adding book successful'
                        });
                    })
                    .catch(err => {
                        res.status(500).send({
                            status: false,
                            msg: 'Error adding book'
                        });
                        throw new Error(err);
        
                    })

               }else{
                res.status(409).send({
                    status: false,
                    msg: 'book already exists'
                });
               }
            })

        
    }else{
        res.status(500).send({
            status: false,
            msg: 'error happened'
        });
    }

});

//update 
router.put('/:id', (req,res,next) => {


    Book.findByIdAndUpdate({ _id : req.params.id }, req.body)   //req.params.id changed with req.body (what you send in body)
        .then(function(){

            Book.findOne({_id : req.params.id}).then(function(Book){
                res.json({
                    status: true,
                    data: Book,
                    msg: 'the book Updated sucfly'
                })
            })
            
        }).catch(err => {
            res.status(500).send({
                status: false,
                msg: 'error'
            });
            throw new Error(err);
        })

});

//delete
router.delete('/:id', (req,res) => {
    Book.findByIdAndRemove({ _id : req.params.id }).then(function(Book){
        res.json({
            status: true,
            data: Book,
            msg: 'the book deleted sucfly'
        })
        
    }).catch(err => {
        res.status(500).send({
            status: false,
            msg: 'error'
        });
        throw new Error(err);
    })
    

});



module.exports = router;