const mongoose = require("mongoose")

const serviceRequestSchema = new mongoose.Schema(
  {
    name:{
      type:String,
      required:true
    },
    assignEmp:{
      type:String,
    },
    type: {
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
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
)

const leadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignEmp: {
      type: String,
    },
    type: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "cancelled", "confirmed"],
      default: "new",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
)

const contactsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignEmp: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
)

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema)
const Leads = mongoose.model("Leads", leadsSchema)
const Contacts = mongoose.model("Contacts", contactsSchema)

module.exports = { ServiceRequest, Leads, Contacts }
