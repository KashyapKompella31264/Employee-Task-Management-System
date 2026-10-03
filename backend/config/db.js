const mysql=require("mysql2");

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"kashyap",
    database:"employee_task_manager"
});

db.connect((err)=>{
    if(err) {
        console.log("Database connection failed");
        return;
    }
    console.log("MySql is connected");
});
module.exports=db;