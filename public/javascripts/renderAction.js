//DataTable
$(document).ready(function () {
var table=$('#empTable').DataTable( {
    dom: 'Bfrtip',
    buttons: [{text: 'Add Employee',
        action: function ( e, dt, node, config ) {
            $('#employeeModalAdd').modal('show');}
        }],    
    "processing": true,
    "serverSide": true,"search": true,"responsive": true,"cache":false,
    "ajax": {
        "url": "emps","type": "GET","dataSrc": "","datatype": 'json'},
    "columns": [  
        { data: null, render: function ( data, type, row ) {
        // Combine the first and last names into a single table field
         return data.firstname+' '+data.lastname;
        } },
        {"data": "email"},
        {"data": "phonenumber"},
        {
            data: null,
            className: "dt-center editor-edit",
            defaultContent: '<i class="fa fa-pencil"/>',
            orderable: false, 
            },
             {
                data: null,
                className: "dt-center editor-delete",
                defaultContent: '<i class="fa fa-trash"/>',
                orderable: false,
           }  
        ]
});
//Edit Employee record
$('#empTable tbody').on('click', 'td.editor-edit', function () {   
    var row = table.row( $(this).parents('tr') );
    var d = row.data();
    var index = row.index();
    var id = { id: d.id}
    //  alert(id.id);
    /*Your Ajax Function Here*/
    $.ajax({
        type: 'post',
        url: 'update',
        data: id,
        dataType: 'json',
        success :(json)=>{
            // alert("success edit response");
              $('#employeeModal').modal('show');
              $('#id').val(json.empById.id);
              $('#firstname').val(json.empById.firstname);
              $('#lastname').val(json.empById.lastname);
              $('#email').val(json.empById.email);
              $('#phonenumber').val(json.empById.phonenumber);          
        }
    })
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
         $.ajax({
            url: 'update',
            type: 'put',
            data: {id,firstname,lastname,email,phonenumber},
            })    
            table.ajax.reload();
            $('#employeeModal').modal('hide');
            alert("Updated User Successfully !!!!");
    });
});

//Add Modal
$(function(){
    $('#add_submit').on('click', function(){
        var firstname = $('#firstname_add').val();
        var lastname = $('#lastname_add').val();
        var email = $('#email_add').val();
        var phonenumber = $('#phonenumber_add').val();
        var password = $('#password_add').val();
        var cpassword = $('#cpassword_add').val();
        if(firstname == '' && lastname == '' && email == '' && phonenumber == '' && password== '' && cpassword == ''){
            alert("Complete the form with filling all fields");
        }else{
        //  alert(firstname+lastname+email+phonenumber+password+cpassword);
        $.ajax({
            url: 'add',
            type: 'post',
            data: {firstname,lastname,email,phonenumber,password,cpassword},
            success : function(res){
                $('#employeeModalAdd').modal('hide')
                table.ajax.reload();                
                alert(res.message);
            }
        }) 
        }});
});

//Delete Employee record
$('#empTable tbody').on('click', 'td.editor-delete', function () {   
    var row = table.row( $(this).parents('tr') );
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
        table.ajax.reload();
        alert("Employee Removed Successfully !!!!");
     }
});
});


