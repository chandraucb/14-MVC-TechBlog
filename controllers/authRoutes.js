const router = require("express").Router();

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res, next) => {

    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.render("logout");
        });
    } else {
        res.render("logout");
    }
});

module.exports = router;