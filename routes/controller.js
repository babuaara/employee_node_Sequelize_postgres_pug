const employee = require('../models').employee;
const express = require('express');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { response } = require('../app');

const getEmployee =async(req,res)=>{
    console.log('Getting students');
    const emp = await employee.findAll();
    res.send(emp);
    };

const createEmployee=async(req,res)=>{
    console.log('Adding Employee');
    let{firstname,lastname,email,phonenumber,password,cpassword}=req.body;
    const empByEmail=await employee.findOne({ where:{email:email} } )
    if(!empByEmail){
    let hashedPassword=await bcrypt.hash(password,15);
    console.log({firstname,lastname,email,phonenumber,password,cpassword});
    console.log("Hased Password",hashedPassword);
    const emp =await employee.create({ firstname:firstname , lastname:lastname, email:email, 
    phonenumber:phonenumber, password:hashedPassword });
    console.log("Babu's auto-generated ID:",{
    message: `Registered Successful ${firstname}`
    });
    res.render('../views/include/login.pug');
    }else{
      console.log('Email Already Available');
      res.render('../views/include/reg.pug');
    }}

    const addEmployee=async(req,res)=>{
      console.log('Adding Employee');
      let{firstname,lastname,email,phonenumber,password,cpassword}=req.body;
      const empByEmail=await employee.findOne({ where:{email:email} } )
      if(!empByEmail){
      let hashedPassword=await bcrypt.hash(password,15);
      console.log({firstname,lastname,email,phonenumber,password,cpassword});
      console.log("Insert query");
      console.log("Hased Password",hashedPassword);
      const emp =await employee.create({ firstname:firstname , lastname:lastname, email:email, 
      phonenumber:phonenumber, password:hashedPassword });
      console.log("Babu's auto-generated ID:",{message: `Registered Successful ${firstname}`});
      res.send({status: true, message: `Registered Successful ${firstname}`})
    }else{
      res.send({status: false, message:  `Email already exists`})
    }}
    
const getEmployeeById=async(req,res)=>{
    console.log('Getting students by id');
    let{id}=req.body;
    console.log(id);
    const empById=await employee.findOne({ where:{id:id} } )
    console.log("employee Detail",empById);
    res.status(200).json({empById});
    // .then(results =>{res.send(empById);})
    // .catch(err=>{console.log(err);});
    };

const loginCheckByEmail=async(req,res)=>{
    console.log('log in');
    let{email,password}=req.body;
    const emp= await employee.findOne({where:{email:email}});
    let firstname= emp.firstname;
      bcrypt.compare(password, emp.password, (err, isMatch) => {
        if (err) { console.log(err); }
        if (isMatch) {
          console.log("Password is correct") 
          res.render('../views/include/dashboard.pug',{firstname,emp}); 
        } else {
          console.log("Password is incorrect")
          res.render('include/login'); 
        }
      });
    }
   
const updateEmployeeById=async(req,res) => {
    console.log('Updating students');
    let{id,firstname,lastname,email,phonenumber}=req.body;
    const emp =await employee.update({ firstname:firstname,lastname:lastname,email:email,phonenumber:phonenumber }, {
    where: {
    id:id
    }
    });
    console.log("updated LastName is",lastname);
    res.status(200);
    };

const removeEmployee=async(req,res) => {
    console.log('Request for Remove students');
    let{id}=req.body;
    console.log(id);
    const emp =await employee.destroy({
        where: {id:id}
      });
      console.log("Requested Employee Removed Successfully !!!!");
      res.status(200);
    };

module.exports={
    getEmployee,getEmployeeById,removeEmployee,
    createEmployee,updateEmployeeById,loginCheckByEmail,addEmployee
};