const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pusher = require('pusher');
const Vote = require('../models/Vote');

var pusher = new Pusher({
    appId: '472913',
    key: 'fc022804a502bf4b2d33',
    secret: '1aa0f1ce3eb8ba9ddae0',
    cluster: 'ap2',
    encrypted: true
});

//GET routes for vote
router.get('/', (req, res) => {
    Vote.find()
    .then(votes => res.json({ sucess: true, votes: votes }));
});

//POST routes for vote
router.post('/', (req, res) => {
    const newVote = {
        points: 1,
        os: req.body.os
    };

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
        return res.json({sucess: true, message:'Thank you for voting'});
    });    
});

module.exports = router;