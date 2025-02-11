const mongoose = require("mongoose");
const CardModule = require("./CardModule");

const model = mongoose.Schema({
card: { type: mongoose.Schema.Types.ObjectId, ref: "AuthModel"},
ClientMail:{type:String},
ClientText: {type:String}
});

module.exports=mongoose.model("ContactModule",model,"/contacts");