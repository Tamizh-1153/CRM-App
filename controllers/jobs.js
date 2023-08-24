const { NotFoundError } = require("../errors")
const { ServiceRequest, Leads, Contacts } = require("../models/Job")
const  User  = require('../models/User')
const { StatusCodes } = require("http-status-codes")

const createServiceRequest = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  req.body.createdBy = req.user.userId
  const serviceRequest = await ServiceRequest.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ serviceRequest })
}

const createLeads = async (req, res) => {
  console.log(req.user)
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  req.body.createdBy = req.user.userId
  const leads = await Leads.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ leads })
}

const createContacts = async (req, res) => {
  console.log(req.user)
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  req.body.createdBy = req.user.userId
  const contacts = await Contacts.create({ ...req.body })
  res.status(StatusCodes.CREATED).json({ contacts })
}

const getAllServiceRequest = async (req, res) => {
  const fUser=req.user.role
  const serviceRequests = await ServiceRequest.find({
    createdBy: req.user.userId,
  }).sort("createdAt")
  res
    .status(StatusCodes.OK)
    .json({fUser, serviceRequests, count: serviceRequests.length })
}

const getAllLeads = async (req, res) => {
  console.log(req.user)
  const leads = await Leads.find({
    createdBy: req.user.userId,
  }).sort("createdAt")
  console.log(leads)
  res.status(StatusCodes.OK).json({ leads, count: leads.length })
}

const getAllContacts = async (req, res) => {
  const contacts = await Contacts.find({
    createdBy: req.user.userId,
  }).sort("createdAt")
  console.log(contacts)
  res.status(StatusCodes.OK).json({ contacts, count: contacts.length })
}

const getServiceRequest = async (req, res) => {
  const {
    user: { userId },
    params: { id: srId },
  } = req

  const serviceRequest = await ServiceRequest.findOne({
    _id: srId,
    createdBy: userId,
  })
  if (!serviceRequest) {
    throw new NotFoundError(`No service requests with ${srId}`)
  }
  res.status(StatusCodes.OK).json({ serviceRequest })
}

const getLead = async (req, res) => {
  const {
    user: { userId },
    params: { id: ldId },
  } = req
  console.log(userId, ldId)

  const lead = await Leads.findOne({ _id: ldId, createdBy: userId })
  if (!lead) {
    throw new NotFoundError(`No leads with ${ldId}`)
  }
  res.status(StatusCodes.OK).json({ lead })
}

const getContact = async (req, res) => {
  const {
    user: { userId },
    params: { id: ctsId },
  } = req
  console.log(userId, ctsId)

  const contact = await Contacts.findOne({ _id: ctsId, createdBy: userId })
  if (!contact) {
    throw new NotFoundError(`No leads with ${ldId}`)
  }
  res.status(StatusCodes.OK).json({ contact })
}

const deleteServiceRequest = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  const {
    user: { userId },
    params: { id: srId },
  } = req
  console.log(userId, srId)
  const serviceRequest = await ServiceRequest.findByIdAndRemove({
    _id: srId,
    createdBy: userId,
  })
  if (!serviceRequest) {
    throw new NotFoundError(`No job with ${srId}`)
  }
  res.status(StatusCodes.OK).send("Service request deleted successfully")
}

const deleteLead = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  const {
    user: { userId },
    params: { id: ldId },
  } = req
  console.log(userId, ldId)
  const lead = await Leads.findByIdAndRemove({ _id: ldId, createdBy: userId })
  if (!lead) {
    throw new NotFoundError(`No job with ${ldId}`)
  }
  res.status(StatusCodes.OK).send("Lead deleted successfully")
}

const deleteContact = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  const {
    user: { userId },
    params: { id: ctsId },
  } = req
  console.log(userId, ctsId)
  const contact = await Contacts.findByIdAndRemove({
    _id: ctsId,
    createdBy: userId,
  })
  if (!contact) {
    throw new NotFoundError(`No job with ${ctsId}`)
  }
  res.status(StatusCodes.OK).send("Contact deleted successfully")
}

const updateServiceRequest = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  const {
    user: { userId },
    params: { id: srId },
    body: { serviceRequest },
  } = req

  const serviceRequestData = await ServiceRequest.findByIdAndUpdate(
    { _id: srId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!serviceRequestData) {
    throw new NotFoundError(`No job with ${srId}`)
  }
  res.status(StatusCodes.OK).json({ serviceRequestData })
}

const updateLead = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  const {
    user: { userId },
    params: { id: ldId },
    body: { leads },
  } = req

  const leadData = await Leads.findByIdAndUpdate(
    { _id: ldId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!leadData) {
    throw new NotFoundError(`No leads with ${ldId}`)
  }
  res.status(StatusCodes.OK).json({ leadData })
}

const updateContact = async (req, res) => {
  if (req.user.role == "junior employee") {
    return res.send("Authorization denied")
  }
  const {
    user: { userId },
    params: { id: ctsId },
    body: { contacts },
  } = req

  const contactData = await Contacts.findByIdAndUpdate(
    { _id: ctsId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!contactData) {
    throw new NotFoundError(`No contacts with ${ctsId}`)
  }
  res.status(StatusCodes.OK).json({ contactData })
}

const getAllInfo = async (req, res) => {
  const {
    user: { userId },
  } = req
  const serviceRequests = await ServiceRequest.find({ createdBy: userId }).sort(
    "createdAt"
  )
  const leads = await Leads.find({ createdBy: userId }).sort("createdAt")
  const contacts = await Contacts.find({ createdBy: userId }).sort("createdAt")
  const data = {
    serviceRequests,
    leads,
    contacts,
  }
  res.status(StatusCodes.OK).json({
    data,
    srCount: serviceRequests.length,
    ldCount: leads.length,
    ctsCount: contacts.length,
  })
}

const getAllEmployees = async (req, res) => {
  const allEmployees = await User.find({
    $or: [{ role: "junior employee" }, { role: "senior employee" }],
  })
  res.json({allEmployees})
}

module.exports = {
  createServiceRequest,
  createLeads,
  createContacts,
  getAllServiceRequest,
  getAllLeads,
  getAllContacts,
  getServiceRequest,
  getLead,
  getContact,
  deleteServiceRequest,
  deleteLead,
  deleteContact,
  updateServiceRequest,
  updateLead,
  updateContact,
  getAllInfo,
  getAllEmployees
}
