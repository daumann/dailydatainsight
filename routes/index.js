
var mongoose = require( 'mongoose' );

var nodemailer = require("nodemailer");


//var myRatingArray = mongoose.model( 'ratingArray');
//var Article = mongoose.model('Article', ArticleSchema);

/*
var commentArray = [mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment2'),mongoose.model( 'Comment3'),mongoose.model( 'Comment4'),mongoose.model( 'Comment5'),mongoose.model( 'Comment6'),mongoose.model( 'Comment7'),mongoose.model( 'Comment8'),mongoose.model( 'Comment9'),mongoose.model( 'Comment10'),mongoose.model( 'Comment11'),mongoose.model( 'Comment12'),mongoose.model( 'Comment13'),mongoose.model( 'Comment14')];
*/


/* iterate thru list and initialize if not there */
var fs = require('fs');
var Converter=require("csvtojson").Converter;
var json2csv = require('nice-json2csv');

//CSV File Path or CSV String or Readable Stream Object
var csvFileName="public/articleArchiv/articles.csv";
var csvFileNameNew="public/articleArchiv/articles.csv";

var csvConverter=new Converter();
csvConverter.on("end_parsed",function(jsonObj){

    //console.log("jsonObj:");
   // console.log(jsonObj);

 //   console.log(ArticleModel.count());


    ArticleModel.find({ }, function(err, toCount) {

        console.log("online article Count: "+toCount.length);
        runningID = toCount.length;



    console.log("article Count: "+jsonObj.length);

    for (k = 0; k < jsonObj.length; k++) {


     //   var runningID = 0;
        console.log("Checking for id: " + k + " -> "+jsonObj[k].id);

        ArticleModel.find({ id: jsonObj[k].id }, function(err, foundArticles) {
            console.log("In with runningID = : " + runningID);

            if (err) { console.log(err); }

            if (foundArticles.length == 0){
                console.log("Inside found nothing");
                var Yuengling = new ArticleModel({
                    id: jsonObj[runningID].id,
                    points: jsonObj[runningID].points,
                    id       : jsonObj[runningID].id,
                    rating      : jsonObj[runningID].rating,
                    commentsCount : jsonObj[runningID].commentsCount,
                    date: jsonObj[runningID].date,
                    contentThumbURL: jsonObj[runningID].contentThumbURL,
                    subtitle: jsonObj[runningID].subtitle,
                    title: jsonObj[runningID].title
                    
                });
                Yuengling.save(function(err){
                    if (err) { console.log(err); }
                    else {console.log("Article added:" + Yuengling)}
                });

                runningID++;
            }

        });


        // todo: integrate with upvote/downvote - build with this document - sort with this document.
        /*
        console.log(jsonObj[k].id  +'vs'+insightID)
        if (jsonObj[k].id == insightID) {

            if(req.params.type  == "up"){
                jsonObj[k].points = (Math.round(jsonObj[k].points) + 1).toString();
                console.log("result:"+jsonObj[k].points);
            }
            if (req.params.type  == "down"){
                jsonObj[k].points = (Math.round(jsonObj[k].points) - 1).toString();
                console.log("result:"+jsonObj[k].points);
            }

        }
        */
    }
    });
});
fs.createReadStream(csvFileName).pipe(csvConverter);




// increase, decrease points!



 exports.rate = function ( req, res ){
     console.log(req.params.type + "-points article "+req.params.id)

     ArticleModel.find({ id: req.params.id }, function(err, articles) {
         if(req.params.type  == "up"){
             articles.forEach(function(selectedArticle){
                 selectedArticle.increaseRating();
                 selectedArticle.save(function(err){
                     if (err) { console.log(err); }
                     else {/*console.log("Article updated:" + selectedArticle)*/}
                 });
                 console.log("increased points of: " + selectedArticle);

             });
         }
         if (req.params.type  == "down"){
             articles.forEach(function(selectedArticle){
                 selectedArticle.decreaseRating();
                 selectedArticle.save(function(err){
                     if (err) { console.log(err); }
                     else {/*console.log("Article updated:" + selectedArticle)*/}
                 });
                 console.log("decreased points of: " + selectedArticle);

             });
         }
     });

 }



exports.index = function ( req, res ){

    res.render( 'page_all', {
        title : 'Daily Data Insights: Showroom'
    });

}; 

exports.page_about = function ( req, res ){
    res.render( 'page_about', {
        title : 'Daily Data Insights: About'
    });

};

exports.page_create = function ( req, res ){
        res.render( 'page_create', {
            title : 'Daily Data Insights: Create'
        });
};


/*
exports.vote = function ( req, res ){
    
    console.log(req.params.type + "vote for id "+req.params.id)
    
    var fs = require('fs');

    var Converter=require("csvtojson").core.Converter;
    var json2csv = require('nice-json2csv');


//CSV File Path or CSV String or Readable Stream Object
    var csvFileName="public/articleArchiv/articles.csv";
    var csvFileNameNew="public/articleArchiv/articles.csv";


//new converter instance
    var csvConverter=new Converter();

//end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed",function(jsonObj){

        console.log("jsonObj:");
        console.log(jsonObj);

        var insightID = req.params.id;
        console.log(jsonObj.length);
        //      client side!
        for (k = 0; k < jsonObj.length; k++) {

            console.log(jsonObj[k].id  +'vs'+insightID)
            if (jsonObj[k].id == insightID) {

                if(req.params.type  == "up"){
                    jsonObj[k].points = (Math.round(jsonObj[k].points) + 1).toString();
                    console.log("result:"+jsonObj[k].points);
                }
                if (req.params.type  == "down"){
                    jsonObj[k].points = (Math.round(jsonObj[k].points) - 1).toString();
                    console.log("result:"+jsonObj[k].points);
                }

            }
        }

        var csvContent = json2csv.convert(jsonObj);

        console.log("csvContent:");
        console.log(csvContent);

        fs.writeFile(csvFileNameNew, csvContent, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("Vote successful."+req.params.type);
            }
        });
    });

fs.createReadStream(csvFileName).pipe(csvConverter);

}
*/

// similar to this?
exports.getMeta = function(req, res) {
        console.log("inside getTest")
    ArticleModel.find({ }, function(err, ArticleMeta) {
        res.send((ArticleMeta));
    });


};



exports.insight = function ( req, res ){

        res.render( 'one/'+req.params.id, {
            title : 'Daily Data Insights: '+req.params.id /*,
            comments : comments*/
        });

};

exports.create = function ( req, res ){
/*
    new commentArray[req.params.id]({
        username : req.body.username,
        content : req.body.comment,
        created : Date.now()
    }).save( function( err, comment, count ){
            console.log(comment + " - comment posted");
            res.redirect(req.get('referer'));

    });
    */
}




