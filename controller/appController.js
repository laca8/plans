const App = require("../models/App");
const addApp = async (req, res) => {
  const { name, manager, user, subGoals } = req.body;
  try {
    const app = await App.create({
      name,
      manager,
      subGoals,
      user: req.user._id,
    });
    res.json(app);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const listApp = async (req, res) => {
  try {
    const apps = await App.find();

    res.json(apps);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const listAppByUser = async (req, res) => {
  try {
    const apps = await App.aggregate([
      {
        $match: { user: req.user._id },
      },
      /*  {
        $unwind: {
          path: "$subGoals",
        },
      },
      {
        $lookup: {
          from: "activities",
          localField: "subGoals._id",
          foreignField: "goal",
          as: "subGoals.activities",
        },
      },*/
    ]);
    res.json(apps);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const updateApp = async (req, res) => {
  try {
    let app = await App.findById(req.params.id);
    if (!app) {
      res.json({ msg: "app not found" });
    }
    let newApp = await App.updateOne(
      { _id: req.params.id },

      {
        $set: {
          "subGoals.$[m].impOutcome": req.body.impOutcome,
          "subGoals.$[m].precentage": req.body.precentage,
          "subGoals.$[m].outActivities": req.body.outActivities,
          "subGoals.$[m].review": req.body.review,
          "subGoals.$[m].numAct": req.body.numAct,
          "subGoals.$[m].impTime": req.body.impTime,
          "subGoals.$[m].impCostWages": req.body.impCostWages,
          "subGoals.$[m].impCostSupplies": req.body.impCostSupplies,
        },
      },
      { arrayFilters: [{ "m._id": req.params.goalId }] }
    );
    res.json(newApp);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const updateApp2 = async (req, res) => {
  try {
    let app = await App.findById(req.params.id);
    if (!app) {
      res.json({ msg: "app not found" });
    }
    let newApp = await App.updateOne(
      { _id: req.params.id },

      {
        $set: {
          "subGoals.$[m].outcome": req.body.outcome,
          "subGoals.$[m].outActivities": req.body.outActivities,
        },
      },
      { arrayFilters: [{ "m._id": req.params.goalId }] }
    );
    res.json(newApp);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const listAppById = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    res.json(app);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteApp = async (req, res) => {
  try {
    const app = await App.findById(req.params.id);
    if (!app) {
      res.status(404).json({ msg: "program not found" });
    }
    await app.remove();
    res.json("progarm deleted");
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addApp,
  listApp,
  listAppByUser,
  updateApp,
  listAppById,
  updateApp2,
  deleteApp,
};
