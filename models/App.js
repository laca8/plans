const mongoose = require("mongoose");
const appSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
      required: [true, "اسم البرنامج  مطلوب"],
    },
    manager: {
      type: String,
      required: [true, "مدير البرنامج مطلوب"],
    },
    goal: {
      type: String,
    },
    law: {
      type: Array,
    },
    subGoals: [
      {
        name: {
          type: String,
          required: [true, "اسم الهدف مطلوب"],
        },
        activity: {
          type: String,
        },
        time1: {
          type: String,
        },
        year1: {
          type: String,
        },
        impTime: {
          type: String,
        },
        costSupplies: {
          type: Number,
        },
        costWages: {
          type: Number,
        },
        impCostSupplies: {
          type: Number,
        },
        impCostWages: {
          type: Number,
        },
        impOfficer: {
          type: String,
        },
        city: {
          type: String,
        },
        partners: {
          type: String,
        },
        numSeminars: {
          type: String,
        },
        numAtt: {
          type: String,
        },
        outcome: {
          type: Number,
        },
        impOutcome: {
          type: Number,
          default: 0,
        },
        precentage: {
          type: Number,
          default: 0,
        },
        outActivities: {
          type: String,
        },
        numAct: {
          type: String,
        },
        ind: {
          type: String,
        },
        source: {
          type: String,
        },
        review: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("app", appSchema);
