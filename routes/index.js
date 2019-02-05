var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:lang', (req, res) => {
  req.session.ulang = req.params.lang;
  res.redirect('back');
});

module.exports = router;
