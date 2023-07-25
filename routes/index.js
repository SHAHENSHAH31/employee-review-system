const express= require('express');
const router=express.Router();
console.log('hii');

router.use('/',require('./users'));
router.use('/review',require('./reviews'));

module.exports=router;
