var express = require('express');
var router = express.Router();


router.get('/bobby', function(req, res, next) {
    res.render('index', { title: 'Cool, huh!', condition: true, anyArray: [1,2,3] });
  });

router.post('/test/submit', function (req, res, next)
{
  var id = req.body.id;
  res.redirect('/test/' + id);
})

module.exports = router;
