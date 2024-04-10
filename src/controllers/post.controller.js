

// import { Post, PostTag, Speciality } from '../models'; // Import your Sequelize models
const { Post,PostPin } = require('../models');

export const createPost = async (req, res) => {
  try {

    console.log("dxsjkjk", req.body)
    const {
      postTitle,
      message,
      location,
      attachment,
      postAnonymously,
      hiringRecommendation,
      speciality,
      groupId,
      tags,
    } = req.body;

    const post = await Post.create({
      post_title: postTitle,
      message,
      location,
      attachment,
      post_anonymously: postAnonymously,
      hiringRecommendation,
      specialityId: speciality, //  specialityId is the foreign key in the Post model
    });

    console.log("jkds", Post)
    await post.addGroups(groupId); //  groupId is an array of group IDs

    await Promise.all(tags.map(tagId => PostTag.create({ postId: post.id, tagId })));
    return res.status(201).json({ message: 'Post created successfully.' });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const deletePost = async (req, res) => {
  try {

    const postId = req.params.postId;
    console.log("postId", postId)
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    await post.update({ is_active: false });
    return res.json({ message: 'Post deleted successfully.' });
  }
  catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

export const pinPost = async (req, res) => {
  try {
    // Extract postId from request parameters
    const { postId } = req.params;
    console.log("postId", postId)
    // Extract userId 
    // const userId = req.user.id;

    // Now you can store postId and userId in the database
    // For example, using Sequelize ORM:
    const postPin = await PostPin.create({
      post_id: postId,
      user_id: "6aeca083-75c8-45cd-8a55-f2011d2b7453",
      created_at: new Date()
    });

    return res.status(201).json({ success: true, data: postPin });
  } catch (error) {
    console.error('Error pinning post:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
