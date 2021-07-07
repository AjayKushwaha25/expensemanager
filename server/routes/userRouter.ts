const router = require('express').Router()
const useCtrl = require('../controllers/userController')

router.post('/register', useCtrl.register)

router.post('/login', useCtrl.login)

router.put('/addExpense/:id', useCtrl.addExpense)

router.put('/addIncome/:id', useCtrl.addIncome)

// router.get('/getuser/:id')

// router.patch('/addExpense', useCtrl.addExpense)

module.exports = router