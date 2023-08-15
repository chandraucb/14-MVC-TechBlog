const router = require("express").Router();

const { BlogPost,User,Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/:id', withAuth, async (req, res) => {
    try {
        console.log("Request ID :: " + req.params.id)
        const posts = await BlogPost.findAll({
            where: {
                id: req.params.id,
            },
            include: [{ all: true, nested: true }],
        });

        const plainPosts = posts.map((post) => {
            return post.get({ plain: true });
        });

        res.render('post', {
            blogpost: plainPosts,
            logged_in: req.session.logged_in,
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

module.exports = router;