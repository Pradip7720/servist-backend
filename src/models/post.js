module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4
			},
			post_title: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			message: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			location: {
				type: DataTypes.UUID,
				allowNull: true
			},
			speciality: {
				type: DataTypes.UUID,
				allowNull: true
			},
			post_anonymously: {
				type: DataTypes.BOOLEAN,
				allowNull: false
			},
			hiring_recommendation: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			is_active: {
				type: DataTypes.BOOLEAN,
				defaultValue: true
			},
			total_upvotes: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
				allowNull: false
			},
			created_date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			updated_date: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			},
			created_by: {
				type: DataTypes.UUID,
				allowNull: true
			},
			updated_by: {
				type: DataTypes.UUID,
				allowNull: true
			}
		}, {
		timestamps: false, // To disable sequelize from automatically adding createdAt and updatedAt fields
		underscored: true, // To use snake case for column names
		tableName: 'posts' // To specify the table name explicitly
	});

	// Define associations if any
	// Post.associate = function(models) {
	//   // Define associations here
	// };
}