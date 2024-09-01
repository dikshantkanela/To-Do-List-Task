const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})

const TodoModel = mongoose.model("todos",TodoSchema) //Model follows the above schema
module.exports = TodoModel;