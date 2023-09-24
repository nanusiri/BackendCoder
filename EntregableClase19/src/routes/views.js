const express = require('express');
const router = express.Router();

router.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    const { first_name, last_name, email, age, password } = req.session.user;

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        return res.render('adminProfile', { first_name, last_name, email, age })
    }

    res.render('profile', { first_name, last_name, email, age });
});


module.exports = router;