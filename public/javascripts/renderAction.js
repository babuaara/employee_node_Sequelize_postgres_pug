// const e = require("express");

//DataTable
var departmentLoginUser=localStorage.getItem('departmentLoginUser');
// new DateTime(document.getElementById('test'));
var tableEmployee=$('#empTable').DataTable( {
    language: {
        search: "Search in table:"
    }, select: {style:'os',
items:'cell'},
    fixedHeader:           {
        header: true,
        footer: true
    },order:[[5,'dsc']],
    // rowGroup:true,
    rowGroup:{
        dataSrc: 'permanentAddress'
    },
    rowReorder : true,
    // initComplete: function () {
    //     this.api().columns([3]).every(function () {
    //             var column = this;
    //             var select = $('<select><option value="">Select Department</option></select>').appendTo($(column.header()).empty());
    //             $(this.header()).find('input').on('keyup change', function () {
    //                 // column.search(this.value).draw();    
            
    //                 // if(column.search() !== this.value)
    //                 //     {
    //                 //         column.search(this.value).draw();
    //                 //     }
    //                     var val = $.fn.dataTable.util.escapeRegex($(this).val());
    //                     // alert($(this).val())
    //                     column.search(val ? '^' + val + '$' : '', true, false).draw();
    //                 });
    //             column.data().unique().sort().each(function (d, j) {
    //                     select.append('<option value="' + d + '">' + d + '</option>');
    //                 });
    //         });
    // },
    dom: 'Bfrtip', 
    fixedColumns:   {
        left: 1,
        right: 1
    },
    buttons: [{text: 'Add Employee',className: 'btn-primary',
        action: function ( e, dt, node, config ) {
            $('#employeeModalAdd').modal('show');
            dt.ajax.reload();}
        },{
            extend: 'collection',
            className: "coll",
            text: 'Export',
            buttons: [ 
                {extend: "copy", className: "btn-primary"},
                {extend:"csv", className: "btn-primary", title : "Employee CSV", messageTop: "Employee Complete Details", messageBottom: "Employee Complete Details"},
                {extend:"excel", className: "btn-primary"},
                {extend:"pdf", className: "btn-primary"},
                {extend:"print", className: "btn-primary"},
                ],
        }, 'colvis',
        {
            text: 'JSON Format',
            action: function ( e, dt, button, config ) {
                var data = dt.buttons.exportData();

                $.fn.dataTable.fileSave(
                    new Blob( [ JSON.stringify( data ) ] ),
                    'Export.json'
                );
            }
        }
        // ,  {
        //     extend: 'selected',
        //     text:'Row Selected',
        //     action: function ( e, dt, node, config ) {
        //         var rows = dt.rows( { selected: true } ).count();
 
        //         alert( 'There are '+rows+'(s) selected in the table' );
        //     }
        // }
    ],
        
    "ajax": {
        "url": "emps/"+localStorage.getItem('departmentLoginUser'),"type": "GET","dataSrc": "","datatype": 'json'
            },
    "columns": [  
        { data: null, render: function ( data, type, row ) {
        // Combine the first and last names into a single table data
         return data.firstname+' '+data.lastname;
        } },
        {"data": "email"},
        {"data": "phonenumber"},
        {"data": "departmentId"},
        {"data": "roleId"},
        {"data": "permanentAddress"},
        {"data": "currentAddress"},
        {
            data: null,
            defaultContent: '<button class="btn btn-success" id="editEmp">  Edit </button> &nbsp&nbsp&nbsp <button class="btn btn-danger" id="deleteEmp">  Delete </button>',
            orderable: false, 
            } 
        ]
});
$(document).ready(function () {
//freeze tableEmployee outside Datatable
    // new $.fn.dataTable.FixedColumns( tableEmployee, {
    //     leftColumns: 1,
    //     rightColumns: 1
    // } );
// get the data from the cell that currently has focus
    var dataCell=tableEmployee.cell( { focused: true } ).data();
    console.log(dataCell);


var tablePayroll=$('#payrollTable').DataTable( {
    dom : 'Bf',
    buttons: [{text: 'Add Payroll',className: 'btn-primary',
        action: function ( e, dt, node, config ) {
            $('#payrollModal').modal('show');}
        },
        {
            extend: 'collection',
            text: 'Export',
            buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print']
        }, 'colvis'
    ],
        "ajax": {
        "url": "getPayroll","type": "GET","dataSrc": "","datatype": 'json'},
    "columns": [ 
        {    
            render: function (data, type, row, meta) {    
                return meta.row + meta.settings._iDisplayStart + 1;    
            }    
        }, 
        {"data": "departmentName"},
        {"data": "roleName"},
        {"data": "dayCount"},
        {"data": "amountPayable"},
        {"data": "totalAmount"} ,
        {
            data: null,
            defaultContent: '<button class="btn btn-success" id="savePayroll" hidden>  Save </button> &nbsp&nbsp&nbsp<button class="btn btn-danger" id="deletePayroll">  Delete </button>',
            orderable: false, 
            },
        ]
});
// console.log(tableEmployee.columns().flatten());
// console.log(tableEmployee.column([0]).search($(this).val()));
// tableEmployee.columns().flatten().each(function(cols){
//     var select =$('<select/>').appendTo(tableEmployee.column(cols).footer()).on('change',function(){
//         tableEmployee.column(cols).search($(this).val()).draw();
//     });
//     tableEmployee.column(cols).cache('search').sort().unique().each(function(colsSelect){
//         select.append( $('<option value="'+colsSelect+'">'+colsSelect+'</option>') );
//     });
// });
// console.log(JSON.stringify(data));

$('#empTable tbody').on( 'click', 'tr', function () {

    // var index= tableEmployee.column(2).index('visible');
    // tableEmployee.column( 3 ).visible( false );
    // var rowData = tableEmployee.row( this ).data();
   
    // var rowData = tableEmployee.row( ':eq(4)' ).data();
    // tableEmployee.search( 'Coimbatore' ).draw();
        // console.log(JSON.stringify(rowData));
     
    // console.log(JSON.stringify(rowData.firstname));
    // if(rowData.firstname == "anil"){
    //     console.log("Success Selection");
    // }else{
    //     console.log("Failuer Selection Try Again");
    // }
    // ... do something with `rowData`
  } );

var data = [
    [
        "Tiger Nixon",
        "System Architect",
        "Edinburgh",
        "5421",
        "2011/04/25",
        "$3,120"
    ],
    [
        "Garrett Winters",
        "Director",
        "Edinburgh",
        "8422",
        "2011/07/25",
        "$5,300"
    ]
]

// payroll
    var payNew = $('#payrollNew').DataTable({
        dom : 'Bf',
        autoFill: true,
        buttons : [{text: 'Add Payroll',className: 'btn-primary',
        action: function ( e, dt, node, config ) {
            $('#payrollModalNew').modal('show');
        },
        },{text: 'Add Row',className: 'btn-primary',
        action: function ( e, dt, node, config ) {
            payNew.row.add([]).draw(false);
        },
        }
    ],
    // data : data
    "ajax": {
        "url": "getPayroll","type": "GET","dataSrc": "","datatype": 'json'},
        "columns":[{
            defaultContent: "",
            data: "departmentName",
            render: function(data, type, row, meta){
                 return '<select class="departmentDrop"><option value="" selected>Select Your Department</option>'+
                 +'<option value="Admin">Admin</option><option value="Accounts">Accounts</option><option value="HR">Human Resource</option>'+
                '<option value="Development">Development</option><option value="Sales">Sales</option><option value="Collection">Collection</option>'+
                '<option value="Trainee">Trainee</option><option value="customerServiceExecutive">Customer Service Executive</option></select>';
            }
          },
        {
            defaultContent: "",
            data: "roleName",
            render: function(data, type, row, meta){
                // roleClass(data);
                var roleClass='<select class="roleDT"/>';
                $('.departmentDrop').change(function(){
                    // alert($(this).val());
                    if(($(this).val())=="Admin"){
                        roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Admin'>Sr.Admin</option><option value='Jr.Admin'>Jr.Admin</option>");
                        }
                        else if(($(this).val())=="Accounts"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Accounts'>Sr.Accounts</option><option value='Jr.Accounts'>Jr.Accounts</option>");
                        }
                        else if(($(this).val())=="HR"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.HR'>Sr.Human Resource</option><option value='Jr.HR'>Jr.Human Resource</option>");
                        }
                        else if(($(this).val())=="Development"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.FullStackDeveloper'>Sr. Full Stack Developer</option><option value='Jr.FullStackDeveloper'>Jr. Full Stack Developer</option><option value='Sr.AndroidDeveloper'>Sr. Android Developer</option><option value='Jr.AndroidDeveloper'>Jr. Android Developer</option><option value='Sr.IOSDeveloper'>Sr. IOS Developer</option><option value='Jr.IOSDeveloper'>Jr. IOS Developer</option>");
                        }
                        else if(($(this).val())=="Sales"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Sales'>Sr.Sales</option><option value='Jr.Sales'>Jr.Sales</option>");
                        }
                        else if(($(this).val())=="Collection"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Collection'>Sr.Collection</option><option value='Jr.Collection'>Jr.Collection</option>");
                        }
                        else if(($(this).val())=="Trainee"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Trainee'>Trainee Intern</option>");
                        }
                        else if(($(this).val())=="customerServiceExecutive"){
                            roleClass=$('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.customerServiceExecutive'>Sr. Customer Service Executive</option><option value='Jr.customerServiceExecutive'>Jr. Customer Service Executive</option>");
                        }else
                        {
                            roleClass=$('.roleDT').html('<select class="roleDT"><option value="" selected>Select Your role</option></select>').trigger('change');
                        }
                    })

                return roleClass;
           }
        },
        {
            defaultContent: "",
            data: "dayCount",
            render:function(data, type, row, meta){
                if(data !=null)
                {
                    return `<input class="dayCount" value="${data}"/>`;
                }
                return `<input class="dayCount" value=""/>`;
            }
        },
        {
            defaultContent: "",
            data: "amountPayable",
            render: function(data, type, row, meta){
                if(data !=null)
                {
                    return `<input class="amountPayable" value="${data}"/>`
                }
                return `<input class="dayCount" value=""/>`;
            }
        },
        {   defaultContent: "",
            data: 'totalAmount',
            render : function(data, type, row, meta){
                if(data ==null){
                    var total= `<input class="totalAmount" disabled/>`;
                    $('.dayCount .amountPayable').keyup(function(){
                       total = $('.totalAmount').val((parseFloat($('.daycount').val())) * (parseFloat($('.amountPayable').val())));   
                    });
                    return total;                        
                }else{
                return `<input class="amountPayable" value="${data}" disabled/>`;
                }
            }
        },
    ],
    });

    // function departmentClass(data){
    //     // for(let dataNew of data){
    //     //     console.log(data);
    //     // }    
    //     console.log(data);

    //     $('.departmentDrop').append($('<option value="" selected>Select Your Department</option>'
    //              +'<option value="Admin">Admin</option><option value="Accounts">Accounts</option><option value="HR">Human Resource</option>'+
    //             '<option value="Development">Development</option><option value="Sales">Sales</option><option value="Collection">Collection</option>'+
    //             '<option value="Trainee">Trainee</option><option value="customerServiceExecutive">Customer Service Executive</option></select>'));
    // }

    // function roleClass(data){
    //     $('.departmentDrop').change(function(){
    //             // alert($(this).val());
    //             if(($(this).val())=="Admin"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Admin'>Sr.Admin</option><option value='Jr.Admin'>Jr.Admin</option>");
    //                 }
    //                 else if(($(this).val())=="Accounts"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Accounts'>Sr.Accounts</option><option value='Jr.Accounts'>Jr.Accounts</option>");
    //                 }
    //                 else if(($(this).val())=="HR"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.HR'>Sr.Human Resource</option><option value='Jr.HR'>Jr.Human Resource</option>");
    //                 }
    //                 else if(($(this).val())=="Development"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.FullStackDeveloper'>Sr. Full Stack Developer</option><option value='Jr.FullStackDeveloper'>Jr. Full Stack Developer</option><option value='Sr.AndroidDeveloper'>Sr. Android Developer</option><option value='Jr.AndroidDeveloper'>Jr. Android Developer</option><option value='Sr.IOSDeveloper'>Sr. IOS Developer</option><option value='Jr.IOSDeveloper'>Jr. IOS Developer</option>");
    //                 }
    //                 else if(($(this).val())=="Sales"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Sales'>Sr.Sales</option><option value='Jr.Sales'>Jr.Sales</option>");
    //                 }
    //                 else if(($(this).val())=="Collection"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.Collection'>Sr.Collection</option><option value='Jr.Collection'>Jr.Collection</option>");
    //                 }
    //                 else if(($(this).val())=="Trainee"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Trainee'>Trainee Intern</option>");
    //                 }
    //                 else if(($(this).val())=="customerServiceExecutive"){
    //                 $('.roleDT').html("<option value='' selected='selected'>Select Role</option><option value='Sr.customerServiceExecutive'>Sr. Customer Service Executive</option><option value='Jr.customerServiceExecutive'>Jr. Customer Service Executive</option>");
    //                 }else
    //                 {
    //                 $('.roleDT').html('<select class="roleDT"><option value="" selected>Select Your role</option></select>');
    //                 }
    //             })
    //     // alert(data);
    // }

    $('#addPayrollNew').on('click',function(){
        payNew.row.add([
            $('#departmentNew').val(),
            $('#rolePayNew').val(),
            $('#dayCountNew').val(),
            $('#amountPayableNew').val(),
            $('#totalAmountNew').val()
        ]).draw(false);
        $('#payrollModalNew').modal('toggle');
    });


// Login User Call
$("#login").on('click',function(){
    alert("checked");
    $.ajax({
        url: 'dashboard',
        type: 'post',
        data: $( "form" ).serialize(),
        dataType: 'json',
        success :(json)=>{
            console.log(json);
            if(json.success == true){
                window.location = "dashboard";
                localStorage.setItem('departmentLoginUser',json.emp.departmentId);
            }
            else{
                alert("Login Failed, Login Again");
            }      
        }
        })   
})

//checkbox for Permanent & current Address
    $("#employeeAddCheck, #checkboxCopy").change(function(){
        if (this.checked) { 
            $("#currentAddress").val($("#permanentAddress").val());
        }
        else{
            $("#currentAddress").val(null);
        }  
    });

    $("#checkboxSameEdit").change(function(){
        if (this.checked) { 
            $("#currentAddressEdit").val($("#permanentAddressEdit").val());
        }
        else{
            $("#currentAddressEdit").val(null);
        }  
    });


    $("#checkReset").change(function(){
         if(this.checked){
            $('#dayCountNew, #dayCount').val(null);
            $("#departmentNew, #department").val(null).trigger('change');
            $('#rolePayNew, #rolePay').val(null);
            $('#monthViewNew, #monthView').val(null);
            $('#amountPayableNew, #amountPayable').val(null);
            $('#totalAmountNew, #totalAmount').val(null);     
        }
    });

    //Day Calculator
    $('#monthViewNew, #monthView').hide();
    $("#monthNew, #month").change(function(){
        if (this.checked) { 
        $('#monthViewNew, #monthView').show();
        $('#dayCountNew, #dayCount').attr('disabled', 'disabled');
        }
        else{
            $('#monthViewNew, #monthView').hide();
        }   
    });
    
    $("#days").change(function(){
        $('#monthViewNew, #monthView').hide();
        $('#dayCountNew, #dayCount').prop('disabled', false).val(null);
    });
    
    $("#monthViewNew, #monthView").change(function(){
        $('#dayCountNew, #dayCount').val(null);
        let monthViewNew = $(this).val();
        alert(monthViewNew);
        if((monthViewNew === "1") || (monthViewNew === "3") || (monthViewNew === "5") || (monthViewNew === "7") || (monthViewNew === "8") || (monthViewNew === "10") || (monthViewNew === "12")){
            $("#dayCountNew, #dayCount").val(31);

        }else if((monthViewNew === "4") || (monthViewNew === "6") || (monthViewNew === "9") || (monthViewNew === "11")){
            $("#dayCountNew, #dayCount").val(30);

        }else if(monthViewNew === "2"){
            $("#dayCountNew, #dayCount").val(28);

        }
        else{
            alert("Select Month And Continue");
        }
    });

    $("#year").change(function(){
        $('#monthViewNew, #monthView').hide();
        $('#dayCountNew, #dayCount').prop('disabled', true);
        $("#dayCountNew, #dayCount").val(365);
    });

    //logic for amountPayable
    $("#amountPayableNew, #amountPayable").on('change',function(){
        $("#totalAmountNew, #totalAmount").val(($("#dayCountNew, #dayCount").val())*($("#amountPayableNew, #amountPayable").val()));
   });
    
   //department & role Dropdown
    // $(".department-select2").select2({
	// 	theme: "classic",
	// 	placeholder: "Select Department",
	// 	allowClear: true
	// });

    // $(".role-select2").select2({
	// 	theme: "classic",
	// 	placeholder: "Select Role",
	// 	allowClear: true
	// });

    //role for department 
    $(`.department-select2, .departmentPay-select2, .departmentReg-select2, .departmentPayNew-select2`).change(function () {        
        var val = $(this).val();
        if (val == "Admin") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.Admin'>Sr.Admin</option><option value='Jr.Admin'>Jr.Admin</option>");
        } else if (val == "Accounts") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.Accounts'>Sr.Accounts</option><option value='Jr.Accounts'>Jr.Accounts</option>");
        } else if (val == "HR") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.HR'>Sr.HR</option><option value='Jr.HR'>Jr.HR</option>");
        } else if (val == "Development") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.FullStackDeveloper'>Sr. Full Stack Developer</option><option value='Jr.FullStackDeveloper'>Jr. Full Stack Developer</option><option value='Sr.AndroidDeveloper'>Sr. Android Developer</option><option value='Jr.AndroidDeveloper'>Jr. Android Developer</option><option value='Sr.IOSDeveloper'>Sr. IOS Developer</option><option value='Jr.IOSDeveloper'>Jr. IOS Developer</option>");
        }else if (val == "Sales") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.Sales'>Sr. Sales</option><option value='Jr.Sales'>Jr. Sales</option>");
        }else if (val == "Collection") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.Collection'>Sr. Collection</option><option value='Jr.Collection'>Jr. Collection</option>");
        }
        else if (val == "Trainee") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Trainee Intern'>Trainee Intern</option>");
        }
        else if (val == "CustomerServiceExecutive") {
            $(`.role-select2, .rolePay-select2, .roleReg-select2, .rolePayNew-select2, .roleEdit-select2`).html("<option value='' selected='selected'>Select Role</option><option value='Sr.CustomerServiceExecutive'>Sr. Customer Service Executive</option><option value='Jr.CustomerServiceExecutive'>Jr. Customer Service Executive</option>");
        }

    });

    //role for department using ajax
    // $(`.department-select2`).on('change', function () {
    //     if ($(this).val()) {
    //         alert($(this).val())
    //         // $(`#role`).val(null).trigger('change');
    //         $.ajax({
    //             type: 'GET',
    //             dataType: "json",
    //             url: 'roleList/' + $(this).val(),
    //             success: function (json) {
    //                 alert(JSON.stringify(json))
    //                 if (json.success === true) {
    //                     let results = json.role.map(function (obj) {
    //                         var rObj = {};
    //                         rObj =obj.roleName;
    //                           return rObj;
    //                         });  
    //                         // alert(JSON.parse(JSON.stringify(results))); 
    //                         let roleList = [];      
    //                         roleList = JSON.parse(JSON.stringify(results));
    //                         var option = new Option(json.roleName, true);
    //                         alert(roleList)
    //                         // $(`#employeeModalAdd #roleEmployeeAdd`).select2({
    //                         //     theme: "classic",
	// 						// 	placeholder: "Select Role",
	// 						// 	allowClear: true,
    //                         //     data: roleList
    //                         // });

    //                         // $('.role-select2').append(roleList).trigger('change');
                        
    //                         // $('#employeeModalAdd #role').val(results).trigger('change');
    //                         // $('#employeeModalAdd #role').select2({
    //                         //     data: roleList
    //                         // });        
                  
    //                 } else {
    //                     alert("Role List Cant Load.");
    //                 }
    //             }
    //         });
    //     } 
    // });

    //role for department

    // $(".role-select2").select2();


    $('#employeeModalAdd').on('hidden.bs.modal', function () {
    $('#employeeModalAdd #department').val(null).trigger('change');
    });

//Edit Employee record
$('#empTable tbody').on('click', '#editEmp', function () {   
    var row = tableEmployee.row( $(this).parents('tr') );
    var d = row.data();
    var index = row.index();
    var id = { id: d.id}
    /*Your Ajax Function Here*/
    $.ajax({
        type: 'post',
        url: 'update',
        data: id,
        dataType: 'json',
        success :(json)=>{
            console.log("json",json);
              $('#employeeModal').modal('show');
              $('#id').val(json.empById.id);
              $('#firstname').val(json.empById.firstname);
              $('#lastname').val(json.empById.lastname);
              $('#email').val(json.empById.email);
              $('#phonenumber').val(json.empById.phonenumber);
              $('.department-select2').val(json.empById.departmentId).trigger('change');
              $('#roleEmployeeEdit').val(json.empById.roleId);
              $('#permanentAddressEdit').val(json.empById.permanentAddress);
              $('#currentAddressEdit').val(json.empById.currentAddress);         
        }
    })
});

$('#payrollTable tbody').on('click', 'tr','#deletePayroll', function () { 
    var abc= tablePayroll.row(this).data(); 
    console.log(abc);
});


$('#payrollTable tbody').on('click','td:not(:has(button))', function () {     
    $(this).attr('contenteditable', 'true');
    $('#savePayroll').removeAttr("hidden","hidden");
  });


//Edit Modal Updated
$(function(){
    $('#edit_submit').on('click', function(e){
        e.preventDefault();
        var id = $('#id').val();
        var firstname = $('#firstname').val();
        var lastname = $('#lastname').val();
        var email = $('#email').val();
        var phonenumber = $('#phonenumber').val();
        var departmentEmployeeAdd = $('#departmentEmployeeAdd').val();
        var roleEmployeeAdd = $('#roleEmployeeEdit').val();
        var permanentAddress = $('#permanentAddressEdit').val();
        var currentAddress = $('#currentAddressEdit').val();
         $.ajax({
            url: 'update',
            type: 'put',
            data: {id,firstname,lastname,email,phonenumber,departmentEmployeeAdd,roleEmployeeAdd,permanentAddress,currentAddress},
            })    
            $('#empTable').DataTable().ajax.reload();  
            $('#employeeModal').modal('hide');
            alert("Updated User Successfully !!!!");
    });
});

//Add Modal
$(function(){
    $('#add_submit').on('click', function(){
        var firstname = $('#firstNameAdd').val();
        var lastname = $('#lastNameAdd').val();
        var email = $('#emailAdd').val();
        var phonenumber = $('#phoneNumberAdd').val();
        var departmentEmployeeAdd = $('#departmentEmployeeAdd').val();
        var roleEmployeeAdd = $('#roleEmployeeAdd').val();
        var permanentAddress = $('#permanentAddress').val();
        var currentAddress = $('#currentAddress').val();
        var password = $('#password_add').val();
        var cpassword = $('#cpassword_add').val();
        if(firstname == '' && lastname == '' && email == '' && phonenumber == '' && departmentEmployeeAdd == '' && roleEmployeeAdd == '' && 
            permanentAddress == '' && currentAddress == '' && password== '' && cpassword == ''){
            alert("Complete the form with filling all fields");
        }else{
        $.ajax({
            url: 'add',
            type: 'post',
            data: {firstname,lastname,email,phonenumber,departmentEmployeeAdd, roleEmployeeAdd, permanentAddress, currentAddress,password,cpassword},
            success : function(res){
                $('#employeeModalAdd').modal('hide')
                tableEmployee.ajax.reload();                
                alert(res.message);
            }
        }) 
        }
    });
});

//Add Modal Payroll
$(function(){
    $('#addPayrollSubmit').on('click', function(){
        var departmentName = $('#department').val();
        var roleName = $('#rolePay').val();
        var dayCount = $('#dayCount').val();
        var amountPayable = $('#amountPayable').val();
        var totalAmount = $('#totalAmount').val();
        if(departmentName == '' && roleName == '' && dayCount == '' && amountPayable == '' && totalAmount== ''){
            alert("Complete the form with filling all fields");
        }else{
         alert(dayCount+amountPayable+totalAmount);
        $.ajax({
            url: 'addPayroll',
            type: 'post',
            data: {departmentName,roleName,dayCount,amountPayable,totalAmount},
            success : function(res){
                $('#payrollModal').modal('hide')
                tablePayroll.ajax.reload();                
                alert(res.message);
            }
        }) 
        }});
});


//Delete Employee record
$('#empTable tbody').on('click', '#deleteEmp', function () {   
    var row = tableEmployee.row( $(this).parents('tr') );
    var d = row.data();
    var index = row.index();
    var json = { id: d.id,firstname:d.firstname}
      if(confirm("Are You Sure You want to Delete this data?  "+json.firstname)){
        $.ajax({
            type:'delete',
            url: 'delete',
            data: json,
            dataType: 'json'
        })
        tableEmployee.ajax.reload();     
        alert("Employee Removed Successfully !!!!");
     }
});
});


