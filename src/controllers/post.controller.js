

// import { Post, PostTag, Speciality } from '../models'; // Import your Sequelize models
const { Post, PostPin, Speciality } = require('../models');

export const createPost = async (req, res) => {
  try {

    console.log("req.body", req.body)
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
      id: 'e1582912-8d92-42b5-a815-830e0d29a740',
      post_title: postTitle,
      message: message,
      location: location,
      attachment: attachment,
      tags: tags,
      post_anonymously: postAnonymously,
      hiring_recommendation: hiringRecommendation,
      speciality_id: speciality,
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
    const { postId } = req.params;
    const userId = req.user.id;
    await PostPin.create({
      post_id: postId,
      user_id: userId,
      created_at: new Date()
    });

    return res.status(201).json({ message: "post pinned successfully." });
  } catch (error) {
    console.error('Error pinning post:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


export const getSpecialities = async (req, res) => {
  try {

    const specialities = await Speciality.findAll({
      where: {
        is_active: true
      }
    });
    if (specialities.length === 0) {
      return res.status(404).json({ message: 'No specialities found.' });
    }
    const data = specialities.map(speciality => ({
      id: speciality.id,
      name: speciality.speciality,
    }));
    return res.status(200).json({ message: 'Speciality list fetched successfully.', data: data });
  } catch (error) {
    console.error(`Error fetching specialities: ${error}`);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

