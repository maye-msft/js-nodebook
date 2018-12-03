var app = require('./server/main.js');
app.listen(process.env.PORT || 1337);

console.log('please open url http://localhost:1337/')