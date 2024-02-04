const router = require("express").Router();
const dictionaryController = require('../controllers/dictionaryController');

router
.route('/definition')
.post(dictionaryController.dictionary);


module.exports=router