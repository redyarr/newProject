

const Anime = require('../models/anime');

exports.getCards= (req,res,next)=>{
 
  
Anime.findAll().
then((anime) => {
    
    // you tried the session thing but didnt finish
    res.render('home',{anime, title:"anime-list"
});
})
.catch((err) => {
    console.log(err);
});


}


exports.getAddAnime = (req,res,next)=>{
    res.render('admin/addAnime',{title:"add-Anime"});

}
exports.postAddAnime=(req,res,next)=>{
const name=req.body.name;
const genre=req.body.genre;
const episodes=req.body.episodes;
const imageUrl=req.body.imageUrl;

Anime.create(
{
  title:name,
    genre:genre,
    episodes:episodes,
    imageUrl:imageUrl
}
).then(() => {
    res.redirect('/')
    
}).catch((err) => {
    console.log(" could'nt post anime !", err);
});
}


exports.postDeteleCard = (req,res,next)=>{
    Anime.findOne({id:req.body.animeId})
    .then((anime) => {
        anime.destroy();
        res.redirect('/')
    })
    .catch((err) => {
        console.log(err);
        
    });


}

exports.getAnimeEps=(req,res,next)=>{
const animeId = req.params.id;
Anime.findByPk(animeId)
.then((anime) => {

    res.render('animeEps',{anime:anime});
    
})
.catch((err) => {
    console.log("couldn't get anime details",err);
});


    

}