
var express = require('express');
var path = require('path');
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const memoryStore = new session.MemoryStore()

const myCookieParser = cookieParser('big scary long string that humans cannot parse', {})
var app = express();

// debugging middleware
let requestCntr = 0;
app.use((req, res, next) => {
    let thisRequest = requestCntr++;
    console.log(`REQUEST ${thisRequest}: ${req.method}, ${req.originalUrl}, `, req.headers);
    // watch for end of theresponse
    res.on('close', () => {
        console.log(`RESPONSE ${thisRequest}: close response, res.statusCode = ${res.statusCode}, outbound headers: `, res.getHeaders());
    });
    next();
});

app.use(
  cors({
    origin: "http://localhost:42483",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'big scary long string that humans cannot parse',
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
  cookie: {sameSite: "none"}
}))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  
  req.session.views = req.session.views ? req.session.views + 1 : 1
  res.set('custom', JSON.stringify(req.headers.cookie))
  res.set("access-control-expose-headers", ['custom', 'cookie'])
  res.set("access-control-allow-headers", "cookie")
  console.log('right before sending', res.getHeaders())
  res.cookie('rememberme', 1 )
  res.json({msg: "hello"})
  console.log('right after sending', res.getHeaders())
  

})




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({err: err.message});
});

module.exports = app;
