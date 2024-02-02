const router = require("express").Router();
const dictionaryController = require('../controllers/dictionaryController');

router
.route('/word')
.post(dictionaryController.dictionary);
module.exports=router