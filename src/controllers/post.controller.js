const { Post, PostPin, Speciality, ReportPost, PostBookmark, PostComment } = require('../models');

export const createPost = async (req, res) => {
  try {
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
    const existingPin = await PostPin.findOne({
      where: {
        post_id: postId,
        user_id: userId,
      },
    });

    if (existingPin) {
      return res.status(400).json({ message: 'Post already pinned by the user.' });
    }
    await PostPin.create({
      post_id: postId,
      user_id: userId
    });
    return res.status(201).json({ message: 'Post pinned successfully.' });
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

export const reportPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    const existingReport = await ReportPost.findOne({
      where: {
        user_id: userId,
        post_id: postId,
      },
    });

    if (existingReport) {
      return res.status(400).json({ message: 'Post already reported by the user.' });
    }

    await ReportPost.create({
      user_id: userId,
      post_id: postId,
      reason,
    });

    res.status(201).json({
      message: 'Post reported successfully.'
    });
  } catch (error) {
    console.error(`Error reporting post: ${error}`);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const existingBookmark = await PostBookmark.findOne({ where: { post_id: postId, user_id: userId } });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Post already bookmarked.' });
    }
    await PostBookmark.create({ post_id: postId, user_id: userId });
    return res.status(201).json({ message: 'Post bookmarked successfully.' });
  } catch (error) {
    console.error('Error bookmarking post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const addCommentToPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { message } = req.body;
    await PostComment.create({
      user_id: req.user.id,
      post_id: postId,
      comment: message
    });
    return res.status(201).json({ message: 'Comment added successfully.' });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
