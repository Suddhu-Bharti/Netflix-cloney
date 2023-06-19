const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, default: "" },
    genre: { type: String, default: "" },
    img: { type: String, default: "" },
    imgTitle: { type: String, default: "" },
    imgSm: { type: String, default: "" },
    trailer: { type: String, default: "" },
    video: { type: String, default: "" },
    duration: { type: String, default: "" },
    year: { type: String, default: "" },
    limit: { type: Number, default: 10 },
    isSeries: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);
