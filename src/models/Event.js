const { default: mongoose, Schema } = require("mongoose");

const EventSchema = new Schema({
    type: String,
    page: String,
    uri: String
}, {timestamps: true})

export const Event = mongoose.models?.Event || mongoose.model('Event', EventSchema)