
const { Post, PostPin, Speciality, ReportPost, PostBookmark, PostComment, Group, CommentReply, User, UserProfile, Reaction } = require('../models');
const { Op } = require('sequelize');
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
export const getAllServist = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    const groups = await Group.findAll({
      where: {
        is_active: true
      },
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    const responseData = groups.map(group => ({
      id: group.id,
      groupName: group.group_name,
      profileImage: group.profile_image,
      // lastMessage: "how are you" add last message from chat 
    }));

    const response = {
      message: 'List of groups retrieved successfully.',
      data: responseData,
      page: {
        offset: parseInt(offset),
        limit: parseInt(limit),
        count: groups.length
      }
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching groups:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const addReply = async (req, res) => {
  try {
    const { postId } = req.query;
    const { commentId, text, level, replyId } = req.body;
    console.log(req.body
    );
    await CommentReply.create({
      post_id: postId,
      user_id: req.user.id,
      parent_reply_id: replyId,
      comment_id: commentId,
      text: text,
      level: level
    });

    return res.status(200).json({ message: 'Reply added successfully.' });
  } catch (error) {
    console.error('Error adding reply:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
export const updateReply = async (req, res) => {
  try {
    const { replyId } = req.query;
    const { text } = req.body;
    const reply = await CommentReply.findByPk(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found.' });
    }
    const payload = {
      text: text
    }
    await reply.update(payload);
    return res.status(200).json({ message: 'Reply edited successfully.' });
  } catch (error) {
    throw error;
  }
}
export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.query;

    const reply = await CommentReply.findByPk(replyId);
    console.log("reply========", reply);
    if (!reply) {
      return res.status(404).json({ message: 'Reply not found.' });
    }
    await reply.update({ is_active: false });
    return res.json({ message: 'Reply deleted successfully.' });
  } catch (error) {
    console.error('Error deleting reply:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const getPostDetails = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByPk(postId, {
      include: [
        {
          model: PostComment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'first_name', 'last_name'],
              include: [{
                model: UserProfile,
                as: 'profile',
                attributes: ['job_title', 'user_handle', 'profile_pic']
              }]
            },
            {
              model: CommentReply,
              as: 'replies',
              include: [
                {
                  model: User,
                  as: 'user',
                  attributes: ['id', 'first_name', 'last_name'],
                  include: [{
                    model: UserProfile,
                    as: 'profile',
                    attributes: ['job_title', 'user_handle', 'profile_pic']
                  }]
                }
              ]
            }
          ]
        },
        {
          model: User, as: 'creator', attributes: ['id', 'first_name', 'last_name'],
          include: [{
            model: UserProfile,
            as: 'profile',
            attributes: ['job_title', 'user_handle', 'profile_pic']
          }]
        },
        { model: Speciality, as: 'speciality', attributes: ['id', 'speciality'] }
      ],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    console.log("post==", post)
    const responseData = {
      id: post.id,
      postTitle: post.postTitle,
      message: post.message,
      postAnonymously: post.post_anonymously,
      hiringRecommendation: post.hiring_recommendation,
      speciality: {
        id: post.speciality.id,
        specialityName: post.speciality.speciality,
      },
      updatedAt: post.updated_at,
      createdBy: {
        id: post.creator.id,
        firstName: post.creator.first_name,
        lastName: post.creator.last_name,
        profilePic: post.creator.profile.profile_pic,
        jobTitle: post.creator.profile.job_title,
        userHandle: post.creator.profile.user_handle,
      },
      likeCount: post.like_count,
      commentCount: post.comment_count,
      isBookmarked: post.is_bookmarked,
      isPinned: post.is_pinned,
      isLiked: post.is_liked,
      comments: post.comments.map(comment => ({
        commentId: comment.id,
        profilePic: comment.user.profile.profile_pic,
        firstName: comment.user.first_name,
        lastName: comment.user.last_name,
        jobTitle: comment.user.profile.job_title,
        userHandle: comment.user.profile.user_handle,
        message: comment.comment,
        likeCount: comment.like_count,
        updatedAt: comment.updated_at,
        replies: comment.replies.map(reply => ({
          profilePic: reply.user.profile.profile_pic,
          firstName: reply.user.first_name,
          lastName: reply.user.last_name,
          jobTitle: reply.user.profile.job_title,
          updatedAt: reply.updated_at,
          // likeCount: reply.like_count,
          // isLiked: reply.is_liked,
        })),
      })),
    };

    return res.json({ message: 'Post fetched successfully.', data: responseData });
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
export const postReaction = async (req, res) => {
  const { postId } = req.params;
  console.log("req.paraams", req.params)
  const reaction = req.body.reaction;

  try {
    const existingReaction = await Reaction.findOne({
      where: {
        post_id: postId,
        user_id: req.user.id
      }
    });

    if (existingReaction) {
      return res.json({ message: "You have already liked this post." });
    }
    const newReaction = await Reaction.create({
      post_id: postId,
      user_id: req.user.id,
      reaction: reaction
    });
    console.log("newReaction", newReaction);
    // const likeCount = await getLikeCountForPost(postId);
    const response = {
      message: "Post liked successfully.",
      // likeCount: likeCount
    };
    res.json(response);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Error liking post" });
  }
};
export const fetchTags = async () => {
  try {
    const postTags = await PostTag.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['firstName', 'lastName'],
          include: [
            {
              model: UserProfile,
              as: 'profile',
              attributes: ['profilePic']
            }
          ]
        }
      ]
    });
    const responseData = postTags.map(tag => ({
      id: tag.id,
      firstName: tag.user.first_name,
      lastName: tag.user.last_name,
      profilePic: tag.user.profile.profile_pic
    }));

    const response = {
      message: "Tag list successfully.",
      data: responseData
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching post tags:", error);
    res.status(500).json({ error: "Error fetching post tags" });
  }
}
export const fetchPosts = async (req, res) => {
  try {
    const { offset, limit, orderBy, orderDir, search, groupId } = req.query;
    const validOrderColumns = ['created_at', 'updated_at', 'post_title'];
    const validOrderDirs = ['ASC', 'DESC'];
    const sanitizedOrderBy = validOrderColumns.includes(orderBy) ? orderBy : 'createdAt';
    const sanitizedOrderDir = validOrderDirs.includes(orderDir) ? orderDir : 'DESC';
    console.log("req.query", req.query);
    const query = {
      where: {},
      order: [[sanitizedOrderBy, sanitizedOrderDir]],
      include: [
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'first_name', 'last_name'],
          include: [
            {
              model: UserProfile,
              as: 'profile',
              attributes: ['profile_pic'],
            },
          ],
        },
        {
          model: Speciality,
          as: 'speciality',
          attributes: ['id', 'speciality'],
        },
      ],
    };

    if (search) {
      query.where.post_title = { [Op.like]: `%${search}%` };
    }
    if (groupId) {
      query.where.groupId = groupId;
    }
    if (offset !== undefined && limit !== undefined) {
      query.offset = parseInt(offset);
      query.limit = parseInt(limit);
    }
    const posts = await Post.findAll(query);
    const count = await Post.count({ where: query.where });

    const payload = posts.map(post => ({
      id: post.id,
      postTitle: post.post_title,
      message: post.message,
      location: post.location,
      postAnonymously: post.post_anonymously,
      hiringRecommendation: post.hiring_recommendation,
      speciality: {
        id: post.speciality.id,
        specialityName: post.speciality.speciality
      },
      updatedAt: post.updated_at,
      createdBy: {
        id: post.creator.id,
        firstName: post.creator.first_name,
        lastName: post.creator.last_name,
        profilePic: post.creator.profile_pic
      },
      // likeCount: post.likeCount,
      // commentCount: post.commentCount,
      // isBookmarked: post.isBookmarked,
      // isPinned: post.isPinned,
      // isLiked: post.isLiked
    }));

    res.status(200).json({
      message: 'Posts fetched successfully.',
      data: { payload },
      page: {
        offset,
        limit,
        count,
      },
    });
  } catch (error) {
    console.error(`Error fetching posts: ${error}`);
    res.status(500).json({ message: 'Internal server error' });
  }
};
