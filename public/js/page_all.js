d3.tsv('articleArchiv/quotes.csv', function (error, allQuotes) {

    document.getElementById("quotes").innerHTML = allQuotes[Math.round((Math.random() * (allQuotes.length-1)))].Quote.replace(/&x22;/g, '"');

});

var sortByDate = true;

var sampleSVG = d3.select("#VIS3")
    .append("svg:svg")
    .attr("width", 100)
    .attr("height", 100);

sampleSVG.append("svg:circle")
    .style("stroke", "black")
    .style("fill", "purple")
    .attr("r", 40)
    .attr("cx", 50)
    .attr("cy", 50)


$(document).ready(function(){
    $('#content').infinitescroll({
        navSelector: "#next:last",
        nextSelector: "#next:last",
        itemSelector: "#content",
        debug: false,
        dataType: 'html',
        maxPage: 6,
        path: function(index) {
            console.debug("going to index"+index+".html");
            return "index" + index + ".html";
        }
        // appendCallback	: false, // USE FOR PREPENDING
    }, function(newElements, data, url){
        // used for prepending data
        // $(newElements).css('background-color','#ffef00');
        // $(this).prepend(newElements);
    });
});

// TODO: show custom tooltip on badges
var geoData;

function reformat (array) {
    var data = [];
    array.map(function (d){
        data.push({
            id: +d.id,
            points: d.points,
            title: d.title,
            commentsCount: d.commentsCount,
            date: +d.date,
            contentThumbURL: d.contentThumbURL,
            contentURL: d.contentURL,
            referenceURLs: d.referenceURLs

        });
    });
    return data;
}

function clickedButton1(){
    var dates = {
        convert:function(d) {
            // Converts the date in d to a date-object. The input can be:
            //   a date object: returned without modification
            //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
            //   a number     : Interpreted as number of milliseconds
            //                  since 1 Jan 1970 (a timestamp)
            //   a string     : Any format supported by the javascript engine, like
            //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
            //  an object     : Interpreted as an object with year, month and date
            //                  attributes.  **NOTE** month is 0-11.
            return (
                    d.constructor === Date ? d :
                    d.constructor === Array ? new Date(d[0],d[1],d[2]) :
                    d.constructor === Number ? new Date(d) :
                    d.constructor === String ? new Date(d) :
                    typeof d === "object" ? new Date(d.year,d.month,d.date) :
                NaN
                );
        },
        compare:function(a,b) {
            // Compare two dates (could be of any type supported by the convert
            // function above) and returns:
            //  -1 : if a < b
            //   0 : if a = b
            //   1 : if a > b
            // NaN : if a or b is an illegal date
            // NOTE: The code inside isFinite does an assignment (=).
            return (
                    isFinite(a=this.convert(a).valueOf()) &&
                isFinite(b=this.convert(b).valueOf()) ?
                (a>b)-(a<b) :
                NaN
                );
        },
        inRange:function(d,start,end) {
            // Checks if date in d is between dates in start and end.
            // Returns a boolean or NaN:
            //    true  : if d is between start and end (inclusive)
            //    false : if d is before start or after end
            //    NaN   : if one or more of the dates is illegal.
            // NOTE: The code inside isFinite does an assignment (=).
            return (
                    isFinite(d=this.convert(d).valueOf()) &&
                isFinite(start=this.convert(start).valueOf()) &&
                isFinite(end=this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
                );
        }
    }


    $("#content").empty();

    $.get('/getMeta/2').done(function(allArticles){

        //geoData = { type: "FeatureCollection", features: reformat(allArticles) };
        console.debug(allArticles);

        if(sortByDate){

            allArticles.sort(function (a, b) {
                console.debug((new Date(a.date)));
                if (dates.compare(a.date,b.date) == 1 )
                    return -1;
                if (dates.compare(a.date,b.date) == -1 )
                    return 1;
                // a must be equal to b
                return 0;
            });
        }
        else {
            allArticles.sort(function (a, b) {
                if (parseInt(a.points) > parseInt(b.points))
                    return -1;
                if (parseInt(a.points) < parseInt(b.points))
                    return 1;
                // a must be equal to b
                return 0;
            });
        }


        for (var i=0;i<allArticles.length;i++)
        {
            console.log("*** "+i+" ***");
            addArticle(allArticles[i].id,allArticles[i].points, allArticles[i].title, allArticles[i].subtitle, allArticles[i].commentsCount, allArticles[i].date, allArticles[i].contentThumbURL, allArticles[i].contentURL, allArticles[i].referenceURLs, allArticles[i].isInteractive, allArticles[i].isLive, allArticles[i].isTop);



        }

        // saveCSV serverside!

        //  console.debug();

    });
}

// load JSON

// LOOP thru sorted list

//addArticle(points, title, commentsCount, date, contentThumbURL, contentURL, referenceURLs);

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


function clickedButton2(){

    var points, title, commentsCount, date, contentThumbURL, contentURL, referenceURLs

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm} today = dd+'/'+mm+'/'+yyyy;
// only ID gets transmitted, then all the other parameters are looked up.

    points = 12;
    title = "FO00OTBALL";
    subtitle = "Total Bundesliga championships won by clubs";
    commentsCount = 14;
    date = today;
    contentThumbURL = "thumbs/placeholderSVG1.png";
    contentURL = "351";
    referenceURLs = new Array("www.wikipedia.org/1","www.wikipedia.org/2");
    isInteractive = true;
    isLive = false;
    isTop = true;

    addArticle(points, title, subtitle,commentsCount, date,
        contentThumbURL, contentURL, referenceURLs, isInteractive,
        isLive, isTop);

}


function addArticle(id, points, title,subtitle,commentsCount, date, contentThumbURL, contentURL, referenceURLs,isInteractive,isLive,isTop){
    var id

// only ID gets transmitted, then all the other parameters are looked up.

    console.log("*** adding new article ***");


// START *** badge assembly

    badgeDiv='<div class="badges" style="display:none">';

    if(isInteractive == "true"){
        console.log(isInteractive + isLive + isTop);
        badgeDiv=badgeDiv+'<div><img src="img/badgeInteractive.png" title="This visualisation is interactive." height="39"  style="margin-top: -10px;" onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;"></div>';
    }

    if(isLive == "true"){
        badgeDiv=badgeDiv+'<div><img src="img/badgeLive.png" title="This visualisation uses a live data source which is automatically updated." height="39"  style="margin-top: -10px;" onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;"></div>';
    }

    if(isTop == "true"){
        badgeDiv=badgeDiv+'<div><img src="img/badgeTop.png" title="This visualisation is or has been voted amongst the top 5 visualisations of this page." height="39"  style="margin-top: -10px;" onclick="console.debug(this.title)" onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;"></div>';
    }
    badgeDiv=badgeDiv+' </div>';

// END *** badge assembly

    var newArticle='<article id="jsid-entry-entity-a8W2NDZ" class="badge-entry-container badge-entry-entity" onmouseover="$(this).find(&quot;.subtitle&quot;)[0].style.opacity=1; ; $(this).find(&quot;.dateSpan&quot;)[0].style.display = &quot;block&quot;; $(this).find(&quot;.articleComments&quot;)[0].style.display = &quot;block&quot;; $(this).find(&quot;.topLine&quot;)[0].style.opacity=&quot;0.5&quot; ; $(this).find(&quot;.bottomLine&quot;)[0].style.opacity=&quot;0.5&quot; ; $(this).find(&quot;.badges&quot;)[0].style.display = &quot;block&quot; ;" onmouseout="$(this).find(&quot;.subtitle&quot;)[0].style.opacity=0.3; $(this).find(&quot;.dateSpan&quot;)[0].style.display = &quot;none&quot;; $(this).find(&quot;.articleComments&quot;)[0].style.display= &quot;none&quot;; $(this).find(&quot;.badges&quot;)[0].style.display = &quot;none&quot;; $(this).find(&quot;.topLine&quot;)[0].style.opacity=&quot;0&quot; ; $(this).find(&quot;.bottomLine&quot;)[0].style.opacity=&quot;0&quot; ; ">	<div class="topLine" style="opacity:0; margin-bottom:-18; margin-top:-10">________________________________________________________________________________________________________________________________________________________________</div><table ><tr><td style="opacity: 0.6;">    <header>    	<div style=" text-align: center; padding-right: 10px;">	 <div><img onclick="upVote('+id+')" src="img/up.svg" title="This visualisation shows research effort; it is clear and appropriate" height="39" style="cursor: pointer; margin-bottom: -10px;" onmouseover="this.style.opacity=0.5;" onmouseout="this.style.opacity=1;"></div><div style="text-align: center;"><span class="points">'
        +points+
        '</span></div><div><img onclick="downVote('+id+')" src="img/down.svg" title="This visualisation does not show research effort; it is not clear or inappropriate" height="39"  style="cursor: pointer; margin-top: -10px;" onmouseover="this.style.opacity=0.5;"  onmouseout="this.style.opacity=1;"></div>' + badgeDiv + '</td><td width="100%"><h2 style="text-align: left;"  >  <a href="/'+id+'" target="_blank" >'
        +title+
        '  </a> <span class="dateSpan" style="display: none; float: right; font-size: medium; margin-top: 14px;">'
        +date+
        '</span></div> </h2> <p class="post-meta" style="padding-bottom: 10px; display: none;">  <a style="text-decoration: underline; " href="/'+id+'" target="_blank" data-evt="EntryAction,CommentLinkUnderTitle,ListPage" >add comment</a> </p> </header><div class="article-vis" ><a href="/'+id+'">        <div class="badge-animated-container-static gif-post presenting" style="padding-top: 10px;">  <img class="badge-item-img" src="'+contentThumbURL+'" style="width: 100%" alt="I must go, my people need me." />    </div>   </a></div><div class="all_posts" ><a href="/'+id+'" class="subtitle" style="opacity:0.3; color: black">'
        +subtitle+
        ' &#187;</a> <a class="articleComments" style=" float:right; font-size: small; font-size: small; display: none;" href="/'+id+'#commentSection">add comment</a></div></td></tr></table><div class="bottomLine" style="opacity:0; margin-top: -15px;">________________________________________________________________________________________________________________________________________________________________</div></article>';

    $("#content").append(newArticle);

}


clickedButton1();