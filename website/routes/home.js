var express = require('express');
var router = express.Router();
const passport = require('passport');
// helps us log out 
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

/* GET home page. */
router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

router.post('/submit', checkNotAuthenticated, passport.authenticate('local',
{
  // on succes, go to user page
  // on failure, go back to login / homepage

  successRedirect:'/test',
  failureRedirect:'/',
  failureFlash: true
  // check validity of values
 // req.check('email', 'invalid email address').isEmail();
  //req.check('password', 'Password is invalid').isLength({min: 4}).equals(req.body.confirmPassword);

  // IF NOT VALID (user or password not found)
    
  
    // console.log(req.body)
    // console.log(req.session)

    // var errors = req.validationErrors();
    // if (errors)
    // {
    //   req.session.errors = errors;
    //   req.session.success = false;
    // }
    // else
    // {
    //   req.session.success = true;
    //   res.redirect('/test')
    // }
  
  // otherwise we redirect to the user page 
  // res.redirect('/test');

}));

ensureAuthenticated = (req, res, next) =>
{
  console.log("checking authentication");
  if (req.isAuthenticated())
  {
    console.log("WE ARE ATHENTICATED")
    // /test will move to the next function which renders the page
    return next()
  }
  console.log("did this run?")
  // otherwise we redirect to the user page
  res.redirect('/')
  
}

// if the user is authenticated, then they should not be able  to go to log in
function checkNotAuthenticated  (req, res, next )
{
  if (req.isAuthenticated())
  {
    // redirect to the users unique page
    res.redirect('/test')
  }

  // otherwise continue with the nect function
  next();
}

// will be the userpage
router.get('/test', ensureAuthenticated, function(req, res, next) {
  res.render('test', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  // req.session.errors = null;
});


// for logging out
router.delete('/logout', (req, res) =>
{
  // passport provided method to delete session
  req.logOut()
  // resdiret user back to the home page
  res.redirect('/')
})



module.exports = router;
