const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await BlogPost.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    let userid = users[Math.floor(Math.random() * users.length)].id
    if (commentData[2] === comment)
      userid = null
    await Comment.create({
      ...comment,
      user_id: userid,
    });
  }

  process.exit(0);
};

seedDatabase();
