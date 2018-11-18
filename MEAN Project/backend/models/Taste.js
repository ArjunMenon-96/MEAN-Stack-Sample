var mongoose =require('mongoose');

const Schema = mongoose.Schema;

let Taste = new Schema({
       
    food: {
        type: String
    },
    type: {
        type: String
    },
    review: {
        type: String
    },
    rating: {
        type: Number
    },
    
 
    
    
});


module.exports=mongoose.model('Taste',Taste,); 