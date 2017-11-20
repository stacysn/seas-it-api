var db = require('../models');

var fetch = require('node-fetch');
const fetchJson = require('node-fetch-json');

function getAllBeaches(req, res){
  console.log("YOU'VE GOT ME AT getAllBeaches");
  db.Beach.find({}, function(err, allBeaches) {
    //access external db
    if (err)
      res.send(err);
      res.json(allBeaches);

  });
}
 // GET a beach
 //this code retrieves the info from external api each time it is being called and
 // does not get stored into db by not calling 'save'
function getOneBeach(req, response){
  db.Beach.findById(req.params.beachId, function(err, beach){
    if (err){res.send(err);}
    beach = beach.toObject();
    fetchJson(`http://api.spitcast.com/api/spot/forecast/${beach.spot_id}`)
      .then((res) => {
          beach.swell = res[0].shape_detail.swell,
          beach.tide = res[0].shape_detail.tide,
          beach.wind = res[0].shape_detail.wind,
          beach.size = res[0].size,
          beach.fetchWorks = true //checks if this is working
          response.json(beach);

      })
    })
}


module.exports = {
  getAllBeaches: getAllBeaches,
  getOneBeach: getOneBeach
};
