var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Comment = new Schema({
    username : String,
    content  : String,
    created  : Date
});
 
mongoose.model( 'Comment', Comment );
mongoose.model( 'Comment1', Comment );
mongoose.model( 'Comment2', Comment );


mongoose.connect( 'mongodb://ddi:mongohq@kahana.mongohq.com:10093/ddi_comments' );
