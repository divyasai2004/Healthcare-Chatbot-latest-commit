const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({ 
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },  
    password: { type: String, required: true },  
    
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);


// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     fullname: { type: String, required: true },  
//     email: { type: String, required: true, unique: true },  
//     dob: { type: Number, required: true },  
//     gender: { type: String },  
//     username: { type: String, required: true, unique: true },  
//     password: { type: String, required: true },  
//     role: { type: String, enum: ['admin', 'user'], default: 'user', required: true }  // ✅ Added Role Field
// });
// const User = mongoose.model('User', userSchema);
// module.exports = User;


