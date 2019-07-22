const db = require('../bootstrap/db');
const Schema = db.Schema;
const bcrypt = require('bcryptjs');


const UserSchema = new Schema ({
    username: {type: String, require:true},
    password: {type: String, require: true},
    email:    {type: String, require: true, unique: true}

},{
    collection: 'users',
    timestamps: true
})

//mongoose + Hooks //baraye in ke pass haminjoori neshoon dade nashe
UserSchema.pre('save', function(next){
    let user = this;
    if (user.isModified('password') || user.isNew){
        bcrypt.genSalt(10, function(err, salt){
            if (err) throw new Error(err);
            bcrypt.hash(user.password, salt, function(err, hashedPass){
                if (err) throw new Error(err);
                user.password = hashedPass;
                next();
            })
        });
    } else { next() }
});

//password = ooni ke client frestade
//this.pass = ooni ke db darim azash
UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, function(err, isMatch){
        cb(err, isMatch);
    });
}

module.exports = db.model('User', UserSchema);