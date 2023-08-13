const bcrypt = require('bcryptjs');
const Users = require('../models/users');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const flash = require('connect-flash/lib/flash');
const crypto = require('crypto');

//this is used to send emails. 
const transporter = nodemailer.createTransport(sendGridTransport(
    {
        auth:{
          // this key you get from your sendGrid account.
            api_key:"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"
        }
    }
))


exports.getSignUp = (req, res, next) => {
    //  const isLoggedIn = req.session.isLoggedIn;

   
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
            }else{
                message = null;
            }
    res.render('signUp', { title: "signUp",errorMsg: message
    
});



}

exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const picUrl = req.body.picUrl;

    bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
            Users.findOne({ where: { email: email } })
                .then((user) => {
                    if (!user) {
                        Users.create({
                            name: name,
                            email: email,
                            password: hashedPassword,
                            picUrl: picUrl
                        })
                            .then(() => {  res.redirect('/login');
                             return  transporter.sendMail({
                                    to:email,
                                    from:"redyarh@gmail.com",
                                    subject:'you successfully signed up !',
                                    html:`<h3>Hi ${name},you successfully signed up !</h3><br/>`                            
                                })
                              
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        req.flash('error','email already exists!')
                        res.redirect('/signUp');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
};



exports.getLogin = (req, res, next) => {

    let message = req.flash('error');
    if(message.length > 0) {
message = message[0];
    }else{
        message = null;
    }
    console.log(message);
  
    const user  = req.session.user;
    res.render('login', { title: "login" ,errorMsg: message});

}


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Users.findOne({ where: { email: email } })
        .then((user) => {
            if (user) {
                // Comparing the password using bcrypt.compare method
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            req.session.isLoggedIn = true;
                            req.session.user = user;
                            res.redirect('/');
                        } else {
                            req.flash('error', 'Invalid Email or Password');
                            res.redirect('/login');
                        }
                    })
                    .catch((err) => {
                        console.log('Error comparing password:', err);
                        res.redirect('/login');
                    });
            } else {
                req.flash('error', 'Invalid Email or Password');
                res.redirect('/login');
            }
        })
        .catch((err) => {
            console.log('Error finding user:', err);
            res.redirect('/login');
        });
}



exports.postLogOut = (req, res) => { 

    req.session.destroy();
res.redirect('/');


}


exports.getReset = (req,res,next)=>{

    let message = req.flash('error');
    if(message.length > 0) {
message = message[0];
    }else{
        message = null;
    }
res.render('reset.ejs',{title:'reset Password',errorMsg:message })


}

exports.postReset = (req,res,next)=>{

    crypto.randomBytes(32,(err,buffer)=>{
if(err){
    console.log(err);
    res.redirect('/reset');
}
const token= buffer.toString("hex");
Users.findOne({email:req.body.email}).then((user) => {
    if(!user){
        req.flash('error','a user with this email doesnt exist!');
return res.redirect('/reset')
    }
    user.resetToken=token,

  user.resetTokenExpiration=Date.now()+3600000;

  return user.save();
    
    })
    .then(()=>{
res.redirect('/');
        return  transporter.sendMail({
            to:req.body.email,
            from:"redyarh@gmail.com",
            subject:'reset your password',
            html:`<h3>you requested a password reset</h3><br/>
            <h3>click this <a href = "http://localhost:3000/reset/${token}>LINK</a> to set a new password </h3><br>
        `                            
        })
    })
.catch((err) => {


    console.log(err);


});

    })

    


}


