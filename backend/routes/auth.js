const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        text: 'auth'
    }
    res.json(obj);
});

module.exports = router;