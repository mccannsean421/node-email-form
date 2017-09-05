var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('../views/index.pug');
});

router.get('/contact', (req, res, next) => {
	res.render('../views/contact.pug');
})

module.exports = router