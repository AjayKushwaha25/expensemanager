const router = require('express').Router()
const useCtrl = require('../controllers/userController')

router.post('/register', useCtrl.register)

router.post('/login', useCtrl.login)

module.exports = router