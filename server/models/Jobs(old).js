const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    serviceRequest: {
      type: String,
      enum: [
        "created",
        "open",
        "in_process",
        "released",
        "cancelled",
        "completed",
      ],
      default: "created",
    },
    leads: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "cancelled", "confirmed"],
      default: "new",
    },
    contacts: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Job", jobSchema)
