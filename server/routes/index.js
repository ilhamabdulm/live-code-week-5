const router = require('express').Router()
const UserController = require('../controllers/userController')
const ComicController = require('../controllers/comicController')
const Authenticate = require('../middlewares/authenticate')

// User
router.post('/login', UserController.login)
router.post('/register', UserController.register)
// Comics
router.get('/comics', ComicController.getAll)
router.put('/comics/:id', Authenticate, ComicController.editData)

module.exports = router
