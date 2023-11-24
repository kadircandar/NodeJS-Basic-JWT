'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */

var UserSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password); // bcrypt kriptografik hash fonksiyonunu kullanarak iki değeri karşılaştırmak için kullanılır. Genellikle kullanıcı parolalarını güvenli bir şekilde saklamak için kullanılır.
};

module.exports = mongoose.model('User', UserSchema);