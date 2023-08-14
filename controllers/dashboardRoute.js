const router = require("express").Router();

const { BlogPost,User,Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const posts = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id,
              }
        });

        const plainPosts = posts.map((post) => {
            return post.get({ plain: true });
        });

        res.render('dashboard', {
            blogpost: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

router.get('/create', withAuth, (req, res) => {
    res.render("addpost");
});

router.get('/update', withAuth, (req, res) => {
    res.render("updatepost");
});

module.exports = router;