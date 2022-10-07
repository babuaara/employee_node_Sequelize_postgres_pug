const employee = require('../models').employee;
const employeePayroll = require('../models').employeePayroll;
const roles = require('../models').roles;
const express = require('express');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { response } = require('../app');

const getEmployee = async (req, res) => {
  try{
  console.log('Getting students');
  let whereClause = {};
  if(req.params.department !="Admin"){
    whereClause.departmentId =req.params.department;
  }
  const emp = await employee.findAll({where: whereClause});
  res.send(emp);
}catch(err){
  console.log("Error ",err);
} 
}

const getEmployeePayroll = async (req, res) => {
  try{
  console.log('Getting Payroll');
  const payroll = await employeePayroll.findAll();
  res.send(payroll);
}catch(err){
  console.log("Error ",err);
} 
}

const getRoleList = async (req, res) => {
  try{
  const roleList = await roles.findAll({
    where: { departmentId: req.params.departmentName },
    attributes: ['roleName']
  });
  res.send({success: true, role: roleList });
}catch(err){
  console.log("Error ",err);
} 
}

const createEmployee = async (req, res) => {
  try{
  console.log('Adding Employee');
  let { firstName, lastName, email,  phoneNumber, department, role, permanentAddress, currentAddress, password, cpassword } = req.body;
  const empByEmail = await employee.findOne({ where: { email: email } })
  if (!empByEmail) {
    let hashedPassword = await bcrypt.hash(password, 15);
    console.log("Hased Password", hashedPassword);
    const emp = await employee.create({
      firstname: firstName, lastname: lastName, email: email,
      phonenumber:  phoneNumber, password: hashedPassword , departmentId: department , roleId: role , permanentAddress:permanentAddress , currentAddress : currentAddress
    });
    console.log("Babu's auto-generated ID:", {
      message: `Registered Successful ${firstName}`
    });
    res.render('../views/include/login.pug');
  } else {
    console.log('Email Already Available');
    res.render('../views/include/reg.pug');
  }
}catch(err){
  console.log("Error ",err);
} 
}

const addEmployee = async (req, res) => {
  try{
  console.log('Adding Employee');
  let { firstname, lastname, email, phonenumber, departmentEmployeeAdd, roleEmployeeAdd, permanentAddress, currentAddress, password, cpassword } = req.body;
  const empByEmail = await employee.findOne({ where: { email: email } })
  if (!empByEmail) {
    let hashedPassword = await bcrypt.hash(password, 15);
    console.log({ firstname, lastname, email, phonenumber, departmentEmployeeAdd, roleEmployeeAdd, permanentAddress, currentAddress, password, cpassword });
    console.log("Insert query");
    console.log("Hased Password", hashedPassword);
    const emp = await employee.create({
      firstname: firstname, lastname: lastname, email: email,
      phonenumber: phonenumber, password: hashedPassword , departmentId: departmentEmployeeAdd , roleId: roleEmployeeAdd , permanentAddress:permanentAddress , currentAddress : currentAddress
    });
    console.log("Babu's auto-generated ID:", { message: `Registered Successful ${firstname}` });
    res.send({ status: true, message: `Registered Successful ${firstname}` })
  } else {
    res.send({ status: false, message: `Email already exists` })
  }
}catch(err){
  console.log("Error ",err);
} 
}

const addEmployeePayroll = async (req, res) => {
  try{
  console.log('Adding Employee Payroll');
    const emp = await employeePayroll.create({
      departmentName: req.body.departmentName , roleName: req.body.roleName , dayCount:req.body.dayCount , amountPayable : req.body.amountPayable , totalAmount : req.body.totalAmount
    });
    console.log("Babu's auto-generated ID:", { message: `Registered Successful addPayroll` });
    res.send({ status: true, message: `Updated Successful`}); 
}catch(err){
  console.log("Error ",err);
} 
}

const getEmployeeById = async (req, res) => {
  try{
  console.log('Getting students by id');
  let { id } = req.body;
  console.log(id);
  const empById = await employee.findOne({ where: { id: id } })
  console.log("employee Detail", empById);
  res.status(200).json({ empById });
  // .then(results =>{res.send(empById);})
  // .catch(err=>{console.log(err);});
}catch(err){
  console.log("Error ",err);
} 
}

const loginCheckByEmail = async (req, res) => {
  try{
    console.log('log in');
    const emp = await employee.findOne({ where: { email: req.body.email } });
    bcrypt.compare(req.body.password, emp.password, (err, isMatch) => {
    
    if (err) { console.log(err); }
    
    if (isMatch) {
      console.log("Password is correct",emp.departmentId)
      res.send({ success: true , emp});
    } else {
      console.log("Password is incorrect")
      res.render('include/login');
    }
  });
  }catch(err){
    console.log("Error ",err);
  }  
}

const updateEmployeeById = async (req, res) => {
  try{
  console.log('Updating students');
  console.log('req.body============================>',req.body);
  
  await employee.update({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, phonenumber: req.body.phonenumber,
    departmentId: req.body.departmentEmployeeAdd , roleId: req.body.roleEmployeeAdd , permanentAddress: req.body.permanentAddress , currentAddress : req.body.currentAddress }, {
    where: {
      id: req.body.id
    }
  });
  console.log("updated LastName is");
  res.status(200);
}catch(err){
  console.log("Error ",err);
} 
}

const removeEmployee = async (req, res) => {
  try{
  console.log('Request for Remove students');
  let { id } = req.body;
  console.log(id);
  const emp = await employee.destroy({
    where: { id: id }
  });
  console.log("Requested Employee Removed Successfully !!!!");
  res.status(200);
}catch(err){
  console.log("Error ",err);
} 
}
module.exports = {
  getEmployee, getEmployeeById, removeEmployee,
  createEmployee, updateEmployeeById, loginCheckByEmail, addEmployee, getRoleList , addEmployeePayroll , getEmployeePayroll
}