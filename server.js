const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const proxy = require('http-proxy-middleware');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const path = require('path');

const router = require('./routes');

const Issues = require('./models/issues');
const { nextTick } = require('process');

var app = express();
var PORT = process.env.PORT || 8080;

const MONGODB_URI = 'mongodb+srv://user:MerryChristmas@cluster0.6ry3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("connected");
})

//Causes issue with API but fixes routing?
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/client/build/index.html'));
//     console.log(path.join(__dirname, '/client/build/index.html'));
// });


app.use(express.static(path.join(__dirname, 'client/build')));

app.get("/api", (req, res) => {
    Issues.find({})
        .then((data) =>{
            //console.log('Data: ', data);
            //if(req.body.data == true)
            console.log("REQ iS "+req.body);
                res.json(data);

        })
        .catch((error) =>{
            console.log('error: ', error);
        });
});

// req.isAuthenticated is provided from the auth router
app.get('/api/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    console.log('joined');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
    //console.log(path.join(__dirname, '/client/build/index.html'));
});

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:8080',
    clientID: 'VwGsxJrBdA0k9nzTa604ow8DbAMNO8Ri',
    issuerBaseURL: 'https://dev-1af63l0x.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// app.get('/api/profile', requiresAuth(), (req, res) => {
//     res.send(JSON.stringify(req.oidc.user));
// });

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(express.static('client/build'));
app.use(morgan('tiny'));
// app.use(cors());
app.use("/api", router);

// // if(process.env.NODE_ENV === 'production'){
     //app.use(express.static('client/build'));
     //app.use(express.static(path.join(__dirname, 'client/build')));
// // }


app.listen(PORT, console.log(`Server is starting at ${PORT}`))