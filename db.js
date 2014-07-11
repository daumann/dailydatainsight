var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Comment = new Schema({
    username : String,
    content  : String,
    created  : Date
});

var RatingSchema = new Schema({
    name    : { type: String, trim: true, index: true },
    stars :  { type: Number, required: true }
});


Article = new Schema({
    id       : Number,
    points      : Number,
    commentsCount : Number,
    date: String,
    contentThumbURL: String,
    subtitle: String,
    title: String

}).method('increaseRating', function(){
        this.points += 1;
        return this.points;
    }).method('decreaseRating', function(){
        this.points -= 1;
        return this.points;
    });

/**
 * Increase points of Yuengling
 */
//Yuengling.increaseRating();

/**
 * Decrese points of Yuengling
 */
//Yuengling.decreaseRating();


ArticleModel = mongoose.model('Article', Article);
//mongoose.model( 'ratingArray', Point );

mongoose.model( 'Comment', Comment );
mongoose.model( 'Comment1', Comment );
mongoose.model( 'Comment2', Comment );
mongoose.model( 'Comment3', Comment );
mongoose.model( 'Comment4', Comment );
mongoose.model( 'Comment5', Comment );
mongoose.model( 'Comment6', Comment );
mongoose.model( 'Comment7', Comment );
mongoose.model( 'Comment8', Comment );
mongoose.model( 'Comment9', Comment );
mongoose.model( 'Comment10', Comment );
mongoose.model( 'Comment11', Comment );
mongoose.model( 'Comment12', Comment );
mongoose.model( 'Comment13', Comment );
mongoose.model( 'Comment14', Comment );
mongoose.model( 'Comment15', Comment );
mongoose.model( 'Comment16', Comment );
mongoose.model( 'Comment17', Comment );
mongoose.model( 'Comment18', Comment );
mongoose.model( 'Comment19', Comment );
mongoose.model( 'Comment20', Comment );

mongoose.connect( 'mongodb://ddi:mongohq@kahana.mongohq.com:10093/ddi_comments' );
