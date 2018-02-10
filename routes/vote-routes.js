const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '472913',
    key: 'fc022804a502bf4b2d33',
    secret: '1aa0f1ce3eb8ba9ddae0',
    cluster: 'ap2',
    encrypted: true
});

router.get('/', (req, res) => {
    res.send('VOTE');
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });
    return res.json({sucess: true, message:'Thank you for voting'});
});

module.exports = router;