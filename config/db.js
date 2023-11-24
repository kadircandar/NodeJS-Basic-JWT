const mongoose = require('mongoose');

const con = mongoose.connect(process.env.MONGODB_URI).then(function(){
    //connected successfully
    console.log("DB Connected Successfully");
}, function(err) {
    //err handle
    console.log("DB Connected Error", err);

});

module.exports = {
    con
}