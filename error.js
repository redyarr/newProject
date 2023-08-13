exports.get404 =(req,res,next)=>{
    const isLoggedIn=req.session.isLoggedIn


res.status(404).render('404.ejs',{title:"page not found",isLoggedIn,});

}

 
