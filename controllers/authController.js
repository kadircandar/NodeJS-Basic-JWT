const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel.js');
 

var register = function (req, res){

    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password, 10);  // hashSync -> fonksiyonu, bcrypt kriptografik hash fonksiyonunu kullanarak bir metni (genellikle bir parolayı) hash değerine dönüştüren bir senkron fonksiyondur.

    newUser.save()
        .then(data => {
            data.hash_password = undefined
            res.send(data);
        })
        .catch(err => {
            err.status(500).send({
                message: err
            })
        })
}

var sign_in = function(req, res) {
    console.log("req", req.body)
    User.findOne({ email: req.body.email})
        .then((user) =>{
            console.log("data : ", user)

            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
            }
            return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });

        })
        .catch((err )=>{
            console.log((err) => {
                console.log("error : ",err);
                return res.status(500).json({ error: err });
            })
        });

};

var loginRequired = function(req, res, next) {
    if (req.user) {
        return res.status(200).json();
    } else {

        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};


var profile = function(req, res, next) {
    if (req.user) {
        res.send(req.user);
    }
    else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {
    register,
    sign_in,
    loginRequired,
    profile
}