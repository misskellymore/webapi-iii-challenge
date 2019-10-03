const express = require('express');
const User = require('./userDb.js');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    User.get()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'err geting user'});
    });

});


// passed in userid below
router.get('/:id', validateUserId, (req, res) => {
// changed json(user) to json(req.user) 

res.status(200).json(req.user);    

});


router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', validateUserId, (req, res) => {
    // user id
    const {id} = req.user;
    User.remove(id)
    .then(() => res.status(204).end())
    .catch(err => {
        console.log(err);
        res.status(500).json({ err: 'error del user'});

    });

});


// By passing in validateUserId it will run as a peice of middleware
// We dont have to use if/else bc we can assume that the user already exists
router.put('/:id', validateUserId, (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    User.update(id, {name})
        .then(update => {
            if (update) {
                User.getById(id)
                .then(user => res.status(200).json(user))
                .catch(err => {
                    console.log('from put', err);
                    res.status(500).json({err: 'error getting user'})
                })
            }
          
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({err: 'error updating user'})
        });
});

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params;
    User.getById(id)
        .then(user => {
            if (user) {
                // middleware is a good place to update the req obj
                // making all the code above cleaner bc we dont have to worry 
                // if the user doesnt exist, taking out if/else
                req.user = user;
                next();
            } else {
                res.status(404).json({err: 'user does not exist'})
            }
        })

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
