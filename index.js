express = require("express");
app =  express();
session = require("express-session");
mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/stud");
	console.log("MongoDb server connected");

loginSchema =  mongoose.Schema({
	username: String,
	EmailId: String,
	Password: String
	
});

loginModel = mongoose.model("emps", loginSchema);

app.get("/Insert",(req,res)=> {
	nm = req.query.uname;
	emid = req.query.emid;
	pswd = req.query.pswd;
	obj = {username: nm ,EmailId: emid, Password: pswd};
	d = new loginModel(obj);
	d.save();
	res.sendFile(__dirname+ "/login.html");
});

app.get("/home", (req, res)=> {
	emid = req.query.emid;
	pwd = req.query.pswd;
	loginModel.findOne({EmailId: emid}, (err, data)=> {
		if(data.Password == pwd)
		{
			res.sendFile(__dirname+"/home.html");
		}else
			res.send("User name or password is incorrect");
	});
});

app.use(session({secret: 'Your secret', saveUninitialized: true, resave: false}));

app.get("/login", (req, res)=> {
	res.sendFile(__dirname + "/login.html");
});

app.get("/signup", (req, res)=> {
	res.sendFile(__dirname + "/reg.html");
});

app.get("/add", (req, res)=> {
	req.session.uname= req.query.uname;
});

app.get("/show", (req, res)=> {
	res.send(req.session.uname + "<a href='/rempage'>Remove Session</a>");
});

app.get("/rempage", (req, res)=> {
	req.session.destroy();
	res.send("Successfully Removed");
});

app.listen(5000, ()=>{
	console.log("Connection established");
})



