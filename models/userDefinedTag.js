const mongoose = require("mongoose");

const UserDefinedTagSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  tags: {
    type: Array,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("userDefinedTag", UserDefinedTagSchema);
