const { Schema, models, model } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    email: String,
    image: String,
    emailVerified: Boolean
})

export const User = models?.User || model('User', UserSchema)