var db = require('../models');

// GET ALL BEACHPOSTS  /beaches/beachPosts
function getAllBeachPosts(req, res) {
  db.Beach.findById(req.params.beachId, function(err, beach) {
    if (err)
    res.send(err);

    res.json(beach.beachPosts);
  });
}

function newBeachPost(req, res){ //POST a new post
  db.Beach.findById(req.params.beachId, function(err, beach){
    var newBeachPost = new db.BeachPost(req.body);
    beach.beachPosts.unshift(newBeachPost);
    beach.save(function(err, savedBeach){
      if (err) res.json(err);
      res.json(newBeachPost);
    });
  });
}

function getOne(req, res){ //GET one beachPost
  db.Beach.findById(req.params.beachId, function (err, beach) {
    if (err) return res.json(err);
    res.json(beach.beachPosts.id(req.params.id));
  });
}

function updateBeachPost(req, res){
  console.log("You've hit me at updateBeachPost!");
  db.Beach.findById(req.params.beachId, function (err, beach) {
    if (err) return res.json(err);
    const beachPost = beach.beachPosts.id(req.params.id);
    for (let i in req.body) {
      beachPost[i] = req.body[i];
    }
    beach.save(function(err, beach) {
      if (err) return res.json(err);
      res.json(beachPost);
    });
  });
}

function destroy(req, res){
  db.Beach.findById(req.params.beachId, function(err, beach){
    let correctBeachPost = beach.beachPosts.id(req.params.id)
    if(correctBeachPost){
      correctBeachPost.remove();
      beach.save(function(err, saved){
        res.status(200).json(saved);
      })
    }
    else{
      return res.status(500).send("OH NO!!");
    }
  })
}


module.exports = {
  getAllBeachPosts: getAllBeachPosts,
  newBeachPost: newBeachPost,
  getOne: getOne,
  updateBeachPost: updateBeachPost,
  destroy: destroy
};
