const Activity = require("../models/Activity");
const addActivities = async (req, res) => {
  const { goal, activities } = req.body;
  try {
    const app = await Activity.create({
      goal,
      activities,
    });
    res.json(app);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = {
  addActivities,
};
