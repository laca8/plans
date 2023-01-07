const mongoose = require("mongoose");
const actSchema = new mongoose.Schema({
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "app",
  },

  activities: [
    {
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
    },
  ],
});
module.exports = mongoose.model("activity", actSchema);
