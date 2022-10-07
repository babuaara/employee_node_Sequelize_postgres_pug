var express = require('express');
var router = express.Router();
const controller= require('./controller');

/* GET home page. */
router.get('/',(req,res)=>{res.render('../views/index.pug', { title: 'Emp Express' })});
router.get('/login',(req,res)=>{res.render('../views/include/login.pug');});
router.get('/index',(req,res)=>{res.render('../views/index.pug', { title: 'Emp Express' });});
router.get('/reg',(req,res)=>{res.render('../views/include/reg.pug');});
router.get('/payroll',(req,res)=>{res.render('../views/include/payroll.pug', { title: 'Emp Payroll' });});
router.get('/payrollNew',(req,res)=>{res.render('../views/include/payrollNew.pug', { title: 'Emp Payroll' });});
router.get('/dashboard',(req,res)=>{res.render('../views/include/dashboard.pug', { title: 'Emp Express' });});
router.get('/emps/:department',controller.getEmployee);
router.get('/getPayroll',controller.getEmployeePayroll);
router.get('/roleList/:departmentName',controller.getRoleList);
// router.get('/departmentList',controller.getDepartmentList);
router.post('/update',controller.getEmployeeById);
router.post('/reg',controller.createEmployee);
router.post('/add',controller.addEmployee);
router.post('/addPayroll',controller.addEmployeePayroll);
router.put('/update',controller.updateEmployeeById);
router.delete('/delete',controller.removeEmployee);
router.post('/dashboard',controller.loginCheckByEmail);


module.exports = router;
