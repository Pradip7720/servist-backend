module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4,
        },
        post_title: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
        },
        location: {
            type: DataTypes.STRING(250),
        },
        speciality_id: {
            type: DataTypes.UUID,
        },
        post_anonymously: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        hiring_recommendation: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        total_views: {
            type: DataTypes.INTEGER,
        },
        total_comments: {
            type: DataTypes.INTEGER,
        },
        latitude: {
            type: DataTypes.STRING(255),
        },
        longitude: {
            type: DataTypes.STRING(255),
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
        created_by: {
            type: DataTypes.UUID,
        },
        updated_by: {
            type: DataTypes.UUID,
        },
    }, {
        tableName: 'posts',
        timestamps: false,
        updatedAt: 'updated_at',
        indexes: [
            {
                name: 'idx_posts_speciality_id',
                fields: ['speciality_id'],
            },
            {
                name: 'idx_posts_created_by',
                fields: ['created_by'],
            },
        ],
    });

    Post.associate = models => {
        Post.hasMany(models.PostComment, {
            foreignKey: 'post_id',
            as: 'comments',
        });
        Post.belongsTo(models.User, {
            foreignKey: 'created_by',
            as: 'creator',
        });
        Post.belongsTo(models.Speciality, {
            foreignKey: 'speciality_id',
            as: 'speciality',
        });
        Post.belongsTo(models.UserProfile, {
            foreignKey: 'created_by',
            as: 'profile',
            through: 'User',
        });
        Post.hasMany(models.PostTags, {
            foreignKey: 'post_id',
            as: 'postTags',
        });
        // Post.belongsToMany(models.Group, { through: 'PostGroups', foreignKey: 'postId' });
    };

    return Post;
};
