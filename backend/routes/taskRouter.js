const router = require("express").Router()
const checkToken = require("../helpers/check-token")

const taskController = require("../controllers/taskControllers")
const { verify } = require("jsonwebtoken")


router.route("/create").post( checkToken,(req,res) => taskController.create(req, res))
router.route('/all').get(checkToken, (req, res) => taskController.getAll(req, res))
router.route('/complete').get(checkToken,(req,res) => taskController.getConplete(req,res))
router.route('/usertask/:id').get(checkToken, (req, res) => taskController.get(req,res))
router.route("/:id").patch(checkToken, (req,res) => taskController.update(req, res))
router.route("/delete/:id").delete(checkToken, (req,res) => taskController.delete(req,res))


module.exports = router