const { Schema, model } = require('mongoose');

const inputSchema = new Schema({
    circuit: String,
    value: Number
},
{
    timestamps: true
})

module.exports = model('Input', inputSchema);
