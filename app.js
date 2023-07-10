const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const  https =require("https");
const { log } = require("console");

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(request,response){
     response.sendFile(__dirname + "/signup.html");

});


app.post("/failure.html",function(req,res){
     res.redirect("/");
})

app.post("/",function(req,res){
     
     const firstName = req.body.fName;
     const lastName = req.body.lName;
     const Email = req.body.email;

     const data = {
          members:[{
               email_address: Email,
               status:"subscribed",
               merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
               }
          }
     ]
          };

const jsonData = JSON.stringify(data);

const url = "https://us21.api.mailchimp.com/3.0/lists/7d3550bddbb "
const options = {

     method:"post",
     auth:"Ronnel:6ea156d203aa7bef35589e794af9bdb0-us21"

}

const request = https.request(url,options,function(response){
          if (response.statusCode===200) {
               res.sendFile(__dirname  + "/success.html");
          }else{
               res.sendFile(__dirname + "/failure.html");
          };
     response.on("data",function(data) {
          
          console.log(JSON.parse(data) );
     });

});

request.write(jsonData);
request.end();

});



app.listen(process.env.PORT || 3000,function(){
console.log("server is running in port 3000!!");

})



//audienc id
// 7d3550bddb

//api key
//6ea156d203aa7bef35589e794af9bdb0-us21