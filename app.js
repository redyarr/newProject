const express = require('express');
const app=express();
const path= require('path');
const sequelize = require('./util/Database');
const csrf = require('csurf');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');

const Anime = require('./models/anime.js');
const bodyParser = require('body-parser');
const PORT = 3000;


const adminRoute = require('./routes/admin');
const signUpRoute= require('./routes/SignUp');
const userRoute = require('./routes/user');
const err =require('./controllers/error.js');

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '2003Nr123',
    database: 'node_project',
  };
  const sessionStore = new MySQLStore(options);
  

  const csrfProtection = csrf();
  

app.set("view engine","ejs");
app.set("views","views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'redyar',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }));

  app.use(csrfProtection);
app.use(flash());


  app.use((req,res,next) => {
    console.log(req.session);
res.locals.isLoggedIn = req.session.isLoggedIn ||false;
res.locals.user = req.session.user || null;
res.locals.csrfToken = req.csrfToken();
next();
  });


app.use(signUpRoute);

app.use('/admin',adminRoute);
app.use(userRoute);


app.use(err.get404)



sequelize.
sync()
.then(() => {
    app.listen(PORT, ()=>{
    console.log("the server is up on port: " +  PORT + "!");
})
}).catch((err) => {
    console.log(err);
});
