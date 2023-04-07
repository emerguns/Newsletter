const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  const firstName = req.body.fName; 
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const url = " url mailchimp";

  const options = {
    auth: {
      username: "emerson1",
      password: "API"
    }
  };

  axios.post(url, data, options)
    .then(function(response){
      if (response.status === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
      console.log(response.data);
    })
    .catch(function(error){
      console.log(error);
      res.sendFile(__dirname + "/failure.html");
    });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});


//API key == 9c1fd4aec609c3c5e97a8d81891787ac-us8 
//list id == 0e568b82fa 