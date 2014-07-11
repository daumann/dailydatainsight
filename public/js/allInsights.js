var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];


d3.tsv('articleArchiv/quotes.csv', function (error, allQuotes) {
    
    document.getElementById("quotes").innerHTML = allQuotes[Math.round((Math.random() * (allQuotes.length-1)))].Quote.replace(/&x22;/g, '"');

});

//d3.csv('articleArchiv/articles.csv', function (error, allArticles) {
    $.get('/getMeta/2').done(function(allArticles){

    //geoData = { type: "FeatureCollection", features: reformat(allArticles) };
    console.debug(allArticles);


    for (var i=0;i<allArticles.length;i++)
    {
        console.log("*** "+i+" ***");
        if (insightID == allArticles[i].id){
            document.getElementById("points").innerHTML = allArticles[i].points;
            document.getElementById("postDate").innerHTML = new Date(allArticles[i].date).getDate() + '. '+ monthNames[new Date(allArticles[i].date).getMonth()] + ' ' + new Date(allArticles[i].date).getFullYear();
            document.getElementById("insightTitle").innerHTML = allArticles[i].title;


            // adding Badges
            
            badgeDiv='';
            if(allArticles[i].isInteractive == "true"){
                badgeDiv= '<img src="../img/badgeInteractive.png" title="This visualisation is interactive." height="39"  style="display:block; float: right; margin-top: 10px; margin-bottom: -10px; " onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;">';
            }

            if(allArticles[i].isLive == "true"){
                badgeDiv=badgeDiv+'<img src="../img/badgeLive.png" title="This visualisation uses a live data source which is automatically updated." height="39"  style="display:block; float: right; margin-top: 10px; margin-bottom: -10px; " onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;">';
            }

            if(allArticles[i].isTop == "true"){
                badgeDiv=badgeDiv+'<img src="../img/badgeTop.png" title="This visualisation is or has been voted amongst the top 5 visualisations of this page." height="39"  style="display:block; float: right; margin-top: 10px; margin-bottom: -10px; " onclick="console.debug(this.title)" onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;">';

            }
            document.getElementById("insightBadges").innerHTML = badgeDiv;
            
            // adding VoteButtons

            document.getElementById("upVoteDiv").innerHTML = '<img onclick="upVote('+allArticles[i].id+')" src="img/up.svg" title="This visualisation shows research effort; it is clear and appropriate" height="39" style="cursor: pointer; margin-bottom: -10px;" onmouseover="this.style.opacity=0.5;" onmouseout="this.style.opacity=1;">';
            document.getElementById("downVoteDiv").innerHTML = '<img onclick="downVote('+allArticles[i].id+')" src="img/down.svg" title="This visualisation does not show research effort; it is not clear or inappropriate" height="39"  style="cursor: pointer; margin-top: -10px;" onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;">'
            
        }
    }

            // change comments to "ago format"

            $('#comments').children('div').each(function () {
                currDate = new Date($($(this).children().eq(0)[0]).children().eq(1)[0].firstChild.innerHTML);
                $($(this).children().eq(0)[0]).children().eq(1)[0].firstChild.innerHTML = timeSince(currDate) + ' ago';
            });

    
            for (i=document.getElementById("comments").children.length-1; i>=0; i--){
                document.getElementById("commentsSorted").innerHTML = document.getElementById("commentsSorted").innerHTML + document.getElementById("comments").children[i].innerHTML;
            }

   document.getElementById("comments").innerHTML = "";
            
            /*
            

            
            
            */
    
    
            /*,allArticles[i].points, allArticles[i].title, allArticles[i].subtitle, allArticles[i].commentsCount, allArticles[i].date, allArticles[i].contentThumbURL, allArticles[i].contentURL, allArticles[i].referenceURLs, allArticles[i].isInteractive, allArticles[i].isLive, allArticles[i].isTop);



    }
             */
    // saveCSV serverside!

    //  console.debug();
});

var timeSince = function(date) {
    if (typeof date !== 'object') {
        date = new Date(date);
    }

    var seconds = Math.floor((new Date() - date) / 1000);
    var intervalType;
    console.debug(date + ' transformed to seconds: '+seconds);
    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        intervalType = 'year';
    } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
            console.debug("interval: "+interval)
            intervalType = 'month';
        } else {
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) {
                intervalType = 'day';
            } else {
                interval = Math.floor(seconds / 3600);
                if (interval >= 1) {
                    intervalType = "hour";
                } else {
                    interval = Math.floor(seconds / 60);
                    if (interval >= 1) {
                        intervalType = "minute";
                    } else {
                        interval = seconds;
                        intervalType = "second";
                    }
                }
            }
        }
    }

    if (interval > 1) {
        intervalType += 's';
    }

    return interval + ' ' + intervalType;
};

function upVote(id){

    if (localStorage.getItem(id) != 1) {
        localStorage.setItem(id, 1);

        $.post('/ratingChanged/' + id + '/up', function () {
        });

        event.srcElement.parentElement.nextElementSibling.firstChild.innerHTML = parseInt(event.srcElement.parentElement.nextElementSibling.firstChild.innerHTML) + 1;
    }
}

function downVote(id){

    if (localStorage.getItem(id) != 1) {
        localStorage.setItem(id, 1);

        $.post('/ratingChanged/' + id + '/down', function () {
        });

        event.srcElement.parentElement.previousElementSibling.firstChild.innerHTML = parseInt(event.srcElement.parentElement.previousElementSibling.firstChild.innerHTML) - 1;
    }
}
