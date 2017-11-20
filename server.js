//import dependencies
let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let db = require('./models');
let controllers = require('./controllers');
let User = db.User;
let passport = require('passport');
let io = require('socket.io')();
let session = require('express-session');
let cookieParser = require('cookie-parser');
let LocalStrategy = require('passport-local').Strategy;

var app = express(),
    router = express.Router();

var port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());

app.use(cookieParser())
app.use(session({
  secret: 'ilovepie', // change this!
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

// passport config
passport.use(new LocalStrategy(db.User.authenticate()))
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(db.User.deserializeUser())

//Prevent CORS errors
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// HOME
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

app.use('/api', router);
////////json endpoints ///////////
// /api/beaches
router.get('/beaches', controllers.beach.getAllBeaches)
router.get('/beaches/:beachId', controllers.beach.getOneBeach)

//******Beach Posts *****//
router.get('/beaches/:beachId/beachPosts', controllers.beachPost.getAllBeachPosts)
router.post('/beaches/:beachId/beachPosts', controllers.beachPost.newBeachPost)

router.get('/beaches/:beachId/beachPosts/:id', controllers.beachPost.getOne)
router.put('/beaches/:beachId/beachPosts/:id', controllers.beachPost.updateBeachPost)
router.delete('/beaches/:beachId/beachPosts/:id', controllers.beachPost.destroy)


//set route path and init API
router.get('/', function(req,res) {
  res.json({message: 'API Initialized!'});
});

// auth routes
app.post('/signup', function signup (req, res) {
  console.log(`${req.body.username} ${req.body.password}`)
  User.register(new User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function () {
        res.send(newUser)
      })
    }
  )
})

app.post('/login', passport.authenticate('local'), function (req, res) {
  console.log(JSON.stringify(req.user));
  res.send(req.user);
});

// passport log out
app.get('/logout', function(req, res){
  console.log("attempting to logout");
  req.logout();
  res.redirect('/');
});

    ////////////////////////
////////SOCKET IO /////////////
    ////////////////////////


//start server
app.listen(port, function() {
  console.log("API IS RUNNING ON PORT " + port);
})
