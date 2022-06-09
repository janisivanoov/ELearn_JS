var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password:{
    type: String,
    bcrypt: true
  },
  type:{
    type: String
  }
});

var User =  module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};

module.exports.saveStudent = function(newUser, newStudent, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err;

        newUser.password = hash;
        console.log('Student is being saved');
        async.parallel([newUser.save, newStudent.save], callback);
    });
};

module.exports.saveInstructor = function(newUser, newInstructor, callback){
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if(err) throw err;

        newUser.password = hash;
        console.log('Instructor is being saved');
        async.parallel([newUser.save, newInstructor.save], callback);
    });
};

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err){
          throw err;
        }

        callback(null, isMatch);
    });
};