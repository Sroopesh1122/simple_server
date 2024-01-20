const { createList, deleteList, getAllList, getlist, updateList } = require('../controllers/todoList_controller');
const { authMiddleware } = require('../middlewares/authMiddleWare');
const {loginChecker} =require('../middlewares/loginChecker')
const router = require('express').Router();


router.post("/create",authMiddleware,loginChecker,createList)
router.delete("/delete/:id",authMiddleware,loginChecker,deleteList);
router.get("/",authMiddleware,loginChecker,getAllList)
router.get("/:id",authMiddleware,loginChecker,getlist)
router.put("/:id",authMiddleware,loginChecker,updateList)

module.exports = router