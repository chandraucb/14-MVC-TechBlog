const router = require("express").Router();
const { BlogPost,User,Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const posts = await BlogPost.findAll({
            include: [{ model: User},{ model: Comment }],
        });

        const plainPosts = posts.map((post) => {
            return post.get({ plain: true });
        });

        res.render('home', {
            blogpost: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

module.exports = router;