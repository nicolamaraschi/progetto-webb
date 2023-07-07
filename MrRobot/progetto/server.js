const express       = require('express');
const path          = require('path');
const morgan        = require('morgan');
const dao           = require('./dao.js');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session       = require('express-session')
const { rejects }   = require('assert');
const exp           = require('constants');



var app = express();
const port = 3000;

// set up the middleware
app.use(morgan('tiny'));

// set up the 'public' component as a static website
app.use(express.static('public'));

// every requests body will be considered as in JSON format
app.use(express.json());

passport.use(new LocalStrategy(
    function(username, password, done) {
      
      // Controllo se la password è un numero intero
      if (password == parseInt(password, 10)) {
        
        // L'amministratore sta effettuando il login
        
        dao.getAdmin(username, password).then(({ admin, check }) => {
          // Controllo se l'amministratore esiste
          if (!admin) {
            return done(null, false, { message: 'Incorrect Username' });
          }
          
          // Controllo se la password è corretta
          if (!check) {
            return done(null, false, { message: 'Incorrect password' });
          }
          
          // Login amministratore riuscito
          return done(null, admin);
        });
      } else {
        
        // L'utente sta effettuando il login
        
        dao.getUser(username, password).then(({ admin, check }) => {
          // Controllo se l'utente esiste
          if (!admin) {
            return done(null, false, { message: 'Incorrect Username' });
          }
          
          // Controllo se la password è corretta
          if (!check) {
            return done(null, false, { message: 'Incorrect password' });
          }
          
          // Login utente riuscito
          return done(null, admin);
        });
      }
    }
  ));
  

app.use(session({
    secret : "mySecretPhrase",
    resave : false,
    saveUninitialized : false
}))

passport.serializeUser(function(admin, done) {
    done(null, admin.nome);
});

passport.deserializeUser(function(id, done) {
    dao.getAdminById(id).then(admin => {
        done(null, admin);
    });
});

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).json({"statusCode" : 401, "message" : "not authenticated"});
}
  

app.post('/userPost', isLoggedIn, (req, res, next) =>{
    console.log(req.body);
    if(req.body.categoria != null && req.body.nome != null && req.body.descrizione != null ){
        dao.userPostRequest(req.body)
        .then(()=>{
           
            res.status(200).send();
        })
        .catch((error)=>{
            
            res.status(500).send();
            res.end();
        })
    }
    
})

app.post('/api/adminLogin', function(req, res, next){
    passport.authenticate('local', function(err, admin, info){
        if(err){return next(err)}
        
        if(!admin){
            return res.status(401).json(info);
        }
        req.login(admin, function(err){
            if(err){return next(err);}
           
            return res.json(admin.nome);
        });
    })(req, res, next);
});



app.post('/api/userLogin', function(req, res, next){
    console.log(req.body)
    passport.authenticate('local', function(err, admin, info){
        if(err){return next(err)}
       
        if(!admin){
            return res.status(401).json(info);
        }
        req.login(admin, function(err){
            if(err){return next(err);}
            
            return res.json(admin.nome);
        });
    })(req, res, next);
});


app.post('/register', function(req, res){
   
    if(req.body != null){
        // PRENDE LA QUERY DAL DABASE PER AGGIUNTE UTENTE
        dao.newuser(req.body)
        .then(()=>{
           
            res.status(200).send();
        })
        .catch((error)=>{
           
            res.status(500).send();
            res.end();
        })
    }
    
})


app.delete('/api/session/current', function(req, res){
    req.logout();
    res.end();
})

app.put('/comuneUpdate', isLoggedIn, (req, res)=>{
    console.log(req.body);
    dao.updateRequest(req.body)
    .then(()=>res.status(200).send())
    .catch((error)=> res.status(res.status).send());
})

app.get('/api/userRequests',isLoggedIn, (req, res)=>{
    dao.getRequests()
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get('/api/indexRequests', (req, res)=>{
    dao.getIndexRequests()
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get('/api/adminRequests', isLoggedIn, (req, res)=>{
    dao.getAdminRequests()
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get("/indexSearch", (req, res) =>{
    dao.getIndexSearchRequest(req.query)
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, function(){
    console.log("Connected on port " + port);
});