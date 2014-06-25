
var mongoose = require( 'mongoose' );

var nodemailer = require("nodemailer");

var Comment = mongoose.model( 'Comment'), Comment1 =mongoose.model( 'Comment'), Comment2 = mongoose.model( 'Comment2');



var commentArray = [mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment'),mongoose.model( 'Comment')];

exports.index = function ( req, res ){
  Comment.find( function ( err, comments, count ){
    res.render( 'page_all', {
        title : 'Comment System with Mongoose and Node',
        comments : comments
    });
  });
}; 

exports.page_about = function ( req, res ){
    Comment.find( function ( err, comments, count ){
    res.render( 'page_about', {
        title : 'Daily Data Insights: about',
        comments : comments
    });
  });
};

exports.page_create = function ( req, res ){
    Comment2.find( function ( err, comments, count ){
        res.render( 'page_create', {
            title : 'Daily Data Insights: about',
            comments : comments
        });
    });
};

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



exports.create = function ( req, res ){

        new commentArray[req.params.id]({
            username : req.body.username,
            content : req.body.comment,
            created : Date.now()
        }).save( function( err, comment, count ){
                console.log(comment + " - comment posted");
                res.redirect(req.get('referer'));


            });
    
    }




exports.insight = function ( req, res ){
    commentArray[req.params.id].find( function ( err, comments, count ){
        res.render( 'one/'+req.params.id, {
            title : 'Daily Data Insights: '+req.params.id,
            comments : comments
        });
    });
};