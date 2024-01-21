const { createUser, loginHandler, updateUser, logoutUser, Imageuploader, profileGetter } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleWare');
const { loginChecker } = require('../middlewares/loginChecker');
const {upload, imagesResize }= require('../middlewares/uploder');

const router = require('express').Router();


router.post("/create",createUser)
router.post("/login",loginHandler)
router.put("/update",authMiddleware,updateUser)
router.get("/profile",authMiddleware,profileGetter)
// router.put("/upload/:id",authMiddleware,loginChecker,upload.array('images',1),imagesResize,Imageuploader)
router.get("/logout",authMiddleware,logoutUser);
module.exports = router;