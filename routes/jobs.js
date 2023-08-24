const express = require("express")
const router = express.Router()

const {
  getAllJobs,
  
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
} = require("../controllers/jobs")

//router.route("/").post(createJob).get(getAllJobs)
//router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob)
router.route('/all').get(getAllInfo)
router.route('/all-employees').get(getAllEmployees)
router.route('/sr').post(createServiceRequest).get(getAllServiceRequest)
router.route('/ld').post(createLeads).get(getAllLeads)
router.route('/cts').post(createContacts).get(getAllContacts)
router.route("/sr/:id").get(getServiceRequest).delete(deleteServiceRequest).patch(updateServiceRequest)
router.route('/ld/:id').get(getLead).delete(deleteLead).patch(updateLead)
router.route('/cts/:id').get(getContact).delete(deleteContact).patch(updateContact)

module.exports = router
