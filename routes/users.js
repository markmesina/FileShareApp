const router = require('express').Router();

// Bring in the User Regisration function
const { 
    userRegister, 
    userLogin,
    userAuth,
    serializeUser,
    checkRole,
} = require('../utils/Auth');

// users registration route
router.post('/register-user', async (req, res) => {
    await userRegister(req.body, 'user', res);

});
// admin registration route
router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, 'admin', res);
});

// superadmin registration route
router.post('/register-superadmin', async (req, res) => {
    await userRegister(req.body, 'superadmin', res);
});


// users login route
router.post('/login-user', async (req, res) => {
    await userLogin(req.body, 'user', res);
});
// admin login route
router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, 'admin', res);
});
// superadmin login route
router.post('/login-superadmin', async (req, res) => {
    await userLogin(req.body, 'superadmin', res);
});


// profile route
router.get('profile', async (req, res) => { 

    return res.json(serializeUser(req.user));
});
     
// users Protected route
router.get('/user-protected', userAuth, checkRole(['user']),async (req, res) => {
    return res.json('Hello user');

});

// admin Protected route
router.get('/admin-protected', userAuth, checkRole(['admin']), async (req, res) => {
    return res.json('Hello admin');

});

// superadmin Protected route
router.get('/superadmin-protected', userAuth, checkRole(['superadmin']), async (req, res) => {
    return res.json('Hello superadmin');

});

module.exports = router;
