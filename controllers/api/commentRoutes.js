const router = require('express').Router();
const { Comment } = require('../../models');

/* post function to create comment entry for a blogpost
*/
router.post('/', async (req, res) => {
  try {
    //Get user id from logged session otherwise use whatever sent in the body
    const userid = req.session.user_id?req.session.user_id:req.body.user_id

    const newComment = await Comment.create({
      ...req.body,
      user_id: userid
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

module.exports = router;