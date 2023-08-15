const router = require('express').Router();
const { BlogPost,Comment,User } = require('../../models');

/* get function to retrieve all blogpost
*/

router.get('/', async (req, res) => {
  try {
    const postData = await BlogPost.findAll({ 
      include: [{ model: User },{ model: Comment }],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/* post function to create a blogpost
*/

router.post('/', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Unauthorized post!");
      return
    }
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

/* put function to update a blogpost
*/

router.put('/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(401).json("Unauthorized post!");
      return
    }
    const updatedPost = await BlogPost.update({
      ...req.body,
      user_id: req.session.user_id,
    }, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

/* get function to retrieve blogpost for logged in user
*/

router.get('/user', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.status(401).json("Unauthorized get!");
      return
    }

    const postData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [{ model:Comment }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!'  + req.session.user_id});
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


/* get function to retrieve a single blogpost by ID
*/

router.get('/:id', async (req, res) => {
  try {
    const postData = await BlogPost.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ all: true, nested: true }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* delete function to remove a blogpost
*/

router.delete('/:id', async (req, res) => {
  try {

    if (!req.session.logged_in) {
      res.status(401).json("Unauthorized delete!");
      return
    }

    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
