
const { GroupNotificationPreferences } = require('../models');
export const setNotificationPref = async (req, res) => {
    try {
        const { groupId } = req.params;
        const {
            dailyRoundups,
            weeklyRoundups
        } = req.body;

        const updatedPreferences = await GroupNotificationPreferences.update({
            weekly_roundup: weeklyRoundups,
            daily_roundup: dailyRoundups,
            group_id: groupId
        }, {
            where: { user_id: req.user.id }
        });

        // const updatedData = updatedPreferences[1].dataValues;
        return res.json({
            message: "Notification preferences updated successfully.",
            data: updatedPreferences
        });
    } catch (error) {
        console.error(`Error updating notification preferences: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
}