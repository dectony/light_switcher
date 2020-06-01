const mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    userName: {type: String, required: '{PATH} is required!', unique: true},
    salt: String,
    hashed_password: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    Authenticated: function (passwordToMatch) {
        return encryption.hashPassword(this.salt, passwordToMatch) === this.hashed_password;
    },

    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};

const User = mongoose.model('User', userSchema);
exports.doSomeTests = function(){
    const personSchema = Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        age: Number,
        stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
      });
      
      const storySchema = Schema({
        author: { type: Schema.Types.ObjectId, ref: 'Person' },
        title: String,
        fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
      });
      
      const Story = mongoose.model('Story', storySchema);
      const Person = mongoose.model('Person', personSchema);


      const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50
      });
      
      author.save(function (err) {
        if (err) return handleError(err);
      
        const story1 = new Story({
          title: 'Casino Royale',
          author: author._id    // assign the _id from the person
        });
      
        story1.save(function (err) {
          if (err) return handleError(err);
          // that's it!
        });
      });



      Story.findOne({ title: 'Casino Royale' }).
            populate('author').
            exec(function (err, story) {
            if (err) return handleError(err);
                console.log('The author is %s', story.author.name);
                    // prints "The author is Ian Fleming"
  });
};
//default init
exports.createDefaultUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'dec');
            User.create({
                firstName: 'Luke',
                lastName: 'Skywalker',
                userName: 'dec',
                salt: salt,
                hashed_password: hash,
                roles: ['admin']
            });
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'hex');
            User.create({
                firstName: 'Anakin',
                lastName: 'Skywalker',
                userName: 'hex',
                salt: salt,
                hashed_password: hash,
                roles: []
            });
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'ber');
            User.create({
                firstName: 'Obi-Wan',
                lastName: 'Kenobi',
                userName: 'ber',
                salt: salt,
                hashed_password: hash});
        }
    })
};

exports.UserModel = userSchema;