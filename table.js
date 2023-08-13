
const Users = require('../models/users');
exports.getTable= (req,res,next)=>{
    const isLoggedIn=req.session.isLoggedIn

    Users.findAll().then((users) => {
        res.render('admin/table.ejs',{users, title:"users table",isLoggedIn})
    }).catch((err) => {
        console.log('ERROR RETRIEVING USERS: ' ,err);
        res.status(500).send("ERROR RETRIEVING USERS")
    });


};


exports.deleteUser= (req,res,next)=>{
const userId = req.params.id;

Users.destroy({where:{id:userId}})
.then(()=>{
    res.redirect('/admin/userTable');
}).catch(err=>{
    console.log(err,"couldnt DELETE USER!!!");
})

    
};
exports.getEditUser= (req,res,next)=>{
    const isLoggedIn = req.session.isLoggedIn || false;  
const userId= req.params.id;

Users.findByPk(userId)
.then(user=>{
    res.render('admin/editUser.ejs',{user, title:"edit user",isLoggedIn});

}).catch(err=>{

    console.log(err,"couldn't find user to edit!");
})}

exports.postEditUser= (req,res,next)=>{
const UserId= req.params.id;
const UserName= req.body.name;
const UserEmail= req.body.email;
Users.update({
    name:UserName,
    email:UserEmail,
},{where:{id:UserId}}).then(res.redirect('/admin/userTable'))
.catch(err=>{
    console.log(err,"couldn't update the user record!");
})


};


