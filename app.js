const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const router = require("./routes/adminRoutes")
const sequelize = require("./utils/database");
const Candie = require("./models/candies");
const Users = require("./models/user");


const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

app.use(async (req,res,next)=>{
    try{
        const user =await Users.findByPk(1);
        req.user = user;
        next()
    } catch(err){
        console.log(err)
    }
})

app.use(router);

Users.hasMany(Candie)
Candie.belongsTo(Users);

sequelize.
sync()
.then(()=>{
    return Users.findByPk(1)
}).then(user=>{
    if(!user){
       return Users.create({name:"Salik Iqbal",emailId:"salik@gmail.com"})
    }
    return user
}).then((user)=>{
    app.listen(3000)
})
.catch(err=>{
    console.log(err);
})