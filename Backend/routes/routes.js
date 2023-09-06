const express = require('express');
const router = express.Router();

const {createNewStudent, verifyOTP,getAllRegisteredStudents,updateTask}=require('../controllers/task')

router.route('/').post(createNewStudent).patch(verifyOTP);
router.route('/getAllRegisteredStudents').get(getAllRegisteredStudents);
router.route('/updateTask/:id/:truthvalue').patch(updateTask);

module.exports=router;