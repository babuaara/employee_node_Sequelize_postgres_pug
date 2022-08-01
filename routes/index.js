var express = require('express');
var router = express.Router();
const controller= require('./controller');

/* GET home page. */
router.get('/',(req,res)=>{res.render('../views/index.pug', { title: 'Emp Express' })});
router.get('/login',(req,res)=>{res.render('../views/include/login.pug');});
router.get('/index',(req,res)=>{res.render('../views/index.pug');});
router.get('/reg',(req,res)=>{res.render('../views/include/reg.pug');});
router.get('/emps',controller.getEmployee);
router.post('/update',controller.getEmployeeById);
router.post('/reg',controller.createEmployee);
router.post('/add',controller.addEmployee);
router.put('/update',controller.updateEmployeeById);
router.delete('/delete',controller.removeEmployee);
router.post('/dashboard',controller.loginCheckByEmail);


module.exports = router;
