const express = require('express')
const ActivityController = require('../controllers/ActivityController');
const Router = express.Router();


//mostrar todo
Router.get('/activities/:userId', ActivityController.getActivities)
 	  .get('/activity/:activityId', ActivityController.getActivity)
 	  .post('/activity', ActivityController.saveActivity)
 	  .put('/activity/:activityId', ActivityController.updateActivity)
 	  .delete('/activity/:activityId', ActivityController.deleteActivity);

module.exports = Router;