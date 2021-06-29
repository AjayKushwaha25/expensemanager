const router = require('express').Router()
const useCtrl = require('../controllers/userController')

router.post('/register', useCtrl.register)

router.post('/login', useCtrl.login)

// router.patch('/addExpense', useCtrl.addExpense)

module.exports = router