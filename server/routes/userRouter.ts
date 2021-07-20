import { Router } from "express"

const router: Router = require('express').Router()
const useCtrl = require('../controllers/userController')
const Users = require("../models/userModel");

router.post('/register', useCtrl.register)

router.post('/login', useCtrl.login)

router.get('/profile/:id', useCtrl.userProfile)

router.put('/addExpense/:id', useCtrl.addExpense)

router.put('/addIncome/:id', useCtrl.addIncome)

// Update User Details
router.put('/profile/:id', useCtrl.updateUserProfile);

// router.get('/getuser/:id')

// router.patch('/addExpense', useCtrl.addExpense)

module.exports = router