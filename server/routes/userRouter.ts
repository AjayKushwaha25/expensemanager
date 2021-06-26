const router = require('express').Router()
const useCtrl = require('../controllers/userController')

router.post('/register', useCtrl.register)


module.exports = router