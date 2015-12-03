var insightID = 11;

var dataset = [ {"key":"Uruk","values":[{"x":-4500,"y":0},{"x":-4000,"y":5000},{"x":-3500,"y":8000},{"x":-3000,"y":45000},{"x":-2500,"y":50000},{"x":-2000,"y":60000},{"x":-1500,"y":75000},{"x":-850,"y":5000},{"x":-800,"y":30000},{"x":-250,"y":40000},{"x":-141,"y":30000},{"x":300,"y":100},{"x":700,"y":0}]},
    {"key":"Memphis","values":[{"x":-4000,"y":0},{"x":-3100,"y":20000},{"x":-2250,"y":35000},{"x":-2000,"y":60000},{"x":-1100,"y":50000},{"x":650,"y":0}]},
    {"key":"Babylon","values":[{"x":-2300,"y":0},{"x":-1750,"y":65000},{"x":-1200,"y":80000},{"x":-600,"y":125000},{"x":-500,"y":160000},{"x":-400,"y":150000},{"x":141,"y":0}]},
    {"key":"Alexandria","values":[{"x":-4000,"y":0},{"x":-300,"y":150000},{"x":-200,"y":400000},{"x":-100,"y":600000},{"x":100,"y":700000},{"x":300,"y":600000},{"x":350,"y":100000},{"x":750,"y":40000},{"x":1798,"y":8000},{"x":1863,"y":170000}    ,{"x":1872,"y":200000},{"x":1882,"y":232000},{"x":1927,"y":600000}   ,{"x":1947,"y":950000},{"x":1965,"y":1500000},{"x":2000,"y":3500000}]}
    ,
    {"area": true, "key":"Rome","values":[{"x":-1200,"y":0},{"x":-1000,"y":3145},{"x":-900,"y":7400},{"x":-800,"y":24240},{"x":-700,"y":60600},{"x":-578,"y":80000},{"x":-509,"y":130000},{"x":-459,"y":117000},{"x":-340,"y":164000},{"x":-276,"y":271000},{"x":-154,"y":324000},{"x":-100,"y":500000},{"x":-44,"y":1000000},{"x":100,"y":1650000},{"x":300,"y":1200000},{"x":400,"y":1100000},{"x":450,"y":500000},{"x":500,"y":100000},{"x":550,"y":50000},{"x":600,"y":90000},{"x":752,"y":40000},{"x":800,"y":50000},{"x":1000,"y":30000},{"x":1347,"y":17000},{"x":1519,"y":50000},{"x":1527,"y":32000},{"x":1590,"y":90000},{"x":1660,"y":120000},{"x":1798,"y":150000},{"x":1814,"y":117000},{"x":1832,"y":138000},{"x":1848,"y":150000},{"x":1871,"y":244000},{"x":1900,"y":600000},{"x":1921,"y":692000},{"x":1931,"y":1000000},{"x":1944,"y":1600000},{"x":1990,"y":3500000}]},
    {"key":"Constantinople","values":[{"x":-671,"y":0},{"x":100,"y":36000},{"x":361,"y":300000},{"x":500,"y":450000},{"x":700,"y":300000},{"x":800,"y":400000},{"x":900,"y":250000},{"x":1000,"y":300000},{"x":1100,"y":200000},{"x":1200,"y":150000},{"x":1261,"y":100000},{"x":1350,"y":80000},{"x":1453,"y":45000},{"x":1500,"y":200000},{"x":1550,"y":660000},{"x":1700,"y":700000},{"x":1800,"y":570000},{"x":1850,"y":785000},{"x":1914,"y":1125000},{"x":1924,"y":500000},{"x":1927,"y":680000},{"x":1935,"y":741000},{"x":1940,"y":793000},{"x":1945,"y":860000},{"x":1950,"y":983000},{"x":1955,"y":1258000},{"x":1960,"y":1466000},{"x":1965,"y":1742000},{"x":1970,"y":2132000},{"x":1975,"y":2547000},{"x":1980,"y":2772000},{"x":1985,"y":3500000}]},

    {"key":"Athens","values":[{"x":-4000,"y":0},{"x":-1412 ,"y":10000},{"x":-450,"y":400000},{"x":500,"y":10000},{"x":1832,"y":5000},{"x":1870,"y":44500},{"x":1896,"y":123000}    ,{"x":1921,"y":718000},{"x":1991,"y":3500000}]},

    {"key":"London","values":[{"x":40,"y":0},{"x":43,"y":60000},{"x":1400,"y":30000},{"x":1700,"y":100000},{"x":1800,"y":1000000},{"x":1850,"y":2100000},{"x":1870,"y":3500000}]},
    {"key":"Paris","values":[{"x":-100,"y":0},{"x":-70,"y":25000},{"x":150,"y":75000},{"x":500,"y":40000},{"x":1000,"y":30000},{"x":1200,"y":120000},{"x":1350,"y":250000}    ,{"x":1500,"y":200000},{"x":1550,"y":275000},{"x":1600,"y":210000},{"x":1650,"y":42000},{"x":1780,"y":550000}    ,{"x":1835,"y":1000000},{"x":1910,"y":3000000},{"x":1920,"y":3500000}]}
];

function yearFormat(date) {
    var year = date.getFullYear();
    return year <= 0 ? 1 - year + "BC" : year + "AD";
}

function parseDate(dateString) {
    //  dateString = "-2";
    console.debug("Inside dateString with: ", dateString, typeof(dateString))
    // 'dateString' must either conform to the ISO date format YYYY-MM-DD
    // or be a full year without month and day.
    // AD years may not contain letters, only digits '0'-'9'!
    // Invalid AD years: '10 AD', '1234 AD', '500 CE', '300 n.Chr.'
    // Valid AD years: '1', '99', '2013'
    // BC years must contain letters or negative numbers!
    // Valid BC years: '1 BC', '-1', '12 BCE', '10 v.Chr.', '-384'
    // A dateString of '0' will be converted to '1 BC'.
    // Because JavaScript can't define AD years between 0..99,
    // these years require a special treatment.

    var format = d3.time.format("%Y-%m-%d"),
        date,
        year;

    date = format.parse(dateString);
    if (date !== null) return date;

    // BC yearStrings are not numbers!
    if (isNaN(dateString)) { // Handle BC year
        // Remove non-digits, convert to negative number
        year = -(dateString.replace(/[^0-9]/g, ""));
    } else { // Handle AD year
        // Convert to positive number
        year = +dateString;
    }
    if (year < 0 || year > 99) { // 'Normal' dates
        date = new Date(year, 6, 1);
    } else if (year == 0) { // Year 0 is '1 BC'
        date = new Date (-1, 6, 1);
    } else { // Create arbitrary year and then set the correct year
        // For full years, I chose to set the date to mid year (1st of July).
        date = new Date(year, 6, 1);
        date.setUTCFullYear(("0000" + year).slice(-4));
    }
    // Finally create the date
    return date;
}

function toYear(date, bcString) {
    // bcString is the prefix or postfix for BC dates.
    // If bcString starts with '-' (minus),
    // if will be placed in front of the year.
    bcString = bcString || " BC" // With blank!
    var year = date.getUTCFullYear();
    if (year > 0) return year.toString();
    if (bcString[0] == '-') return bcString + (-year);
    return (-year) + bcString;
}

myColor = d3.scale.category10();
$( document ).ready(function() {
//------------ CHART 1 
//defaultChartConfig("chart1", ci,true, true, {forceY:false});

    /*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
    nv.addGraph(function() {
        var chart = nv.models.lineChart().interpolate("basis")
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .transitionDuration(350)  //how fast do you want the lines to transition?
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
                .color(function (d,i){  return ["#a6cee3", "#fb9a99", "#b2df8a", "#33a02c", "#1f78b4", "#e31a1c", "#ff7f00", "grey", "#6a3d9a", "#cab2d6" ][i] })
            ;

        chart.xAxis     //Chart x-axis settings
            .tickFormat(function(d){

                //   console.debug(parseDate(d));
                console.debug(new Date(parseDate(d.toString())).getFullYear());
                var year= d3.format('.0f')(new Date(parseDate(d.toString())).getFullYear());

                if (year < 0)
                    return -1*d3.format('.0f')(new Date(parseDate(d.toString())).getFullYear()) +" BC"
                else
                    return d3.format('.0f')(new Date(parseDate(d.toString())).getFullYear())
            });

        chart.yAxis     //Chart y-axis settings
            .axisLabel('Population')
            .tickFormat(d3.format("0,000"));

        d3.select('#chart1 svg')    //Select the <svg> element you want to render the chart in.   
            .datum(dataset)         //Populate the <svg> element with chart data...
            .call(chart);          //Finally, render the chart!

        //Update the chart when window resizes.
        nv.utils.windowResize(function() { chart.update() });
        return chart;
    });
    setTimeout(function(){

        for (var i= 0; i<$(".tick.major").length; i++  )
        {
            console.debug($(".tick.major")[i].children[1].innerHTML);
            if($(".tick.major")[i].children[1].innerHTML == "1 BC"){
                $(".tick.major")[i].children[0].style.stroke = "grey";
                $(".tick.major")[i].children[0].style.strokeDasharray = "5, 5";
            }
        }

    }, 1000);


});