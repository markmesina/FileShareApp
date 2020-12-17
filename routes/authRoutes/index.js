const router = require('express').Router();
const passport = require('passport');
// const {} = require('../../../controllers/userController')


// /auth prepended

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
)

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.

router.route('/google/callback').get(
  passport.authenticate("google"),
  (req, res) => {
    if (!req.user.displayName) {
      return res.redirect("/register_user");
    }
    res.redirect("/");
  }
);

router.route('/facebook').get(
  passport.authenticate("facebook")
);

router.route('/facebook/callback').get(
  (req, res) => {
    if (!req.user.displayName) {
      return res.redirect("/register_user");
    }
    res.redirect("/");
  }
);

module.exports = router

