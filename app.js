const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https")
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"))

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")

})

app.post("/",function(req,res){
   var firstName = req.body.fname;
   var lastName = req.body.lname
   var email = req.body.email
   console.log(firstName,lastName,email)
    var data = {
        members: [
            {
         email_address: email,
         status:  "subscribed",
         merge_fields: {
            FNAME: firstName,
            LNAME: lastName
         }
        }
    ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/2f77ec4236"
    const options = {
        method:"POST",
        auth: "Goku:4476e61f214395366c4d01f8f6194453-us21"
    }
   const request =  https.request(url,options,function(response){

    if (response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    }
     response.on("data",function(data){
        console.log(JSON.parse(data))
     })
    })
request.write(jsonData);
request.end();

})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on localhost 3000.")
})






//api key
//4476e61f214395366c4d01f8f6194453-us21

//Audience ID
// 2f77ec4236