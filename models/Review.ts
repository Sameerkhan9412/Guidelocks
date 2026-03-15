import mongoose,{Schema} from "mongoose";

const ReviewSchema = new Schema({

name:{
type:String,
required:true
},

message:{
type:String,
required:true
},

rating:{
type:Number,
default:5
}

},{timestamps:true});

export default mongoose.models.Review ||
mongoose.model("Review",ReviewSchema);