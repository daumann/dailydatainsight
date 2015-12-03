var insightID = 12;


var numberFormat = d3.format(".2f");

var usChart = dc.geoChoroplethChart("#us-chart");

d3.csv("../misc/vc.csv", function (csv) {

    var
        spendHistChart  = dc.barChart("#chart-hist-spend"),
        spendHistChart2  = dc.barChart("#chart-hist-spend2"),
        spendHistChart3  = dc.barChart("#chart-hist-spend3"),
        spendHistChart4  = dc.barChart("#chart-hist-spend4"),
        spendHistChart5  = dc.barChart("#chart-hist-spend5"),
        spendHistChart6  = dc.barChart("#chart-hist-spend6"),
        spendHistChart7  = dc.barChart("#chart-hist-spend7"),
        spendHistChart8  = dc.barChart("#chart-hist-spend8"),
        spenderRowChart = dc.rowChart("#chart-row-spenders");

    var colorID1=0;
    var colorID2=0;
    var colorID3=0;
    var colorID4=0;

    var dimWidth = 127;

    var colors1 = ["#28583E","#D79B43"]
    var colors2 = ["#5D7A28","#4A8567","#C7931B","#C66619","#973615"]

    var colors5 = ["#FF0000","#FF7F00","#FFFF00","#7FFF00","#00FF00"]
    var colors4 = ["#5D7A28","#97A322","#C7931B","#C66619","#973615"]

    var hierarchy = [];

    d3.csv("../misc/Data-AppAnalytics.csv", function(error, spendData) {
// normalize/parse data

        console.debug(spendData);
        spendData.forEach(function(d) {

            hierarchy.push(JSON.parse(d.hierarchy));
            d.Spent = d.population;//.match(/\d+/);

        });

// set crossfilter
        var ndx = crossfilter(spendData),
            yearDim  = ndx.dimension(function(d) {return +d.Year;}),
            spendDim = ndx.dimension(function(d) {console.debug("returning Spent:", d.Spent); return Math.floor(d.Spent/10);}),

            timeDim = ndx.dimension(function(d) { console.debug("retour", parseInt(d.Id)); return parseInt(d.Id);}),

            nameDim  = ndx.dimension(function(d) {return d.group;}),
            spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
            spendPerName = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
            spendHist    = spendDim.group().reduceCount();


        var timeHist    = timeDim.group().reduceCount();
        var timeHist2    = timeDim.group().reduceSum(function(d) {return d.population;});
        var hdiHist    = timeDim.group().reduceSum(function(d)   {return d.Hdi;});
        var genderHist    = timeDim.group().reduceSum(function(d)   {return d.gender;});
        var ageDHist    = timeDim.group().reduceSum(function(d)   {return d.ageD;});
        var schoolHist    = timeDim.group().reduceSum(function(d)   {return d.school;});
        var internetHist    = timeDim.group().reduceSum(function(d)   {return d.internet;});
        var lifeHist    = timeDim.group().reduceSum(function(d)   {return d.life;});
        var refugeesHist    = timeDim.group().reduceSum(function(d)   {return d.refugees;});
        var gniHist    = timeDim.group().reduceSum(function(d)   {return d.gni;});


        var data = crossfilter(csv);

        var states = data.dimension(function (d) {
            return d["State"];
        });
        var stateRaisedSum = states.group().reduceSum(function (d) {   return d["Raised"];    });


        d3.json("../misc/world.json", function (statesJson) {
            usChart.projection(d3.geo.mercator()
                    .scale(148)
                    .translate([440, 300]))
                .width(990)
                .height(500)
                .dimension(states)
                .group(stateRaisedSum)
                .colorCalculator(function (d,i,f) {

                    if (d !== undefined){
                        console.debug(statesJson.features[i].properties.name, d);

                        var tmpRel ="";
                        var tmpPop =0;

                        for(var k=0;k<csv.length;k++)
                        {

                            if (statesJson.features[i].properties.name == csv[k].State) {



                                if(tmpPop<parseInt(csv[k].Raised) && csv[k].Religion != "Total"){
                                    tmpRel =csv[k].Religion;
                                    tmpPop =parseInt(csv[k].Raised);

                                    //  console.debug("Changed")
                                }
                                // if (statesJson.features[i].properties.name== "Bangladesh")
                                //   console.debug("found",csv[k].Religion,csv[k].Raised);

                            }
                        }
                        if (statesJson.features[i].properties.name== "Bangladesh") {
                            console.debug("!",tmpRel)
                        }
                        if(tmpRel == "Muslim" || tmpRel.indexOf("Islam") != -1  || tmpRel.indexOf("Hindu") != -1) return "#498663";
                        else if (tmpRel.indexOf("Budd") != -1) return "#818649";
                        else if(statesJson.features[i].properties.name== "New Zealand" ||
                            statesJson.features[i].properties.name== "South Africa" ||
                            tmpRel.indexOf("Catholic") != -1 ||
                            tmpRel.indexOf("Church") != -1 ||
                            tmpRel.indexOf("Christian") != -1 ||
                            tmpRel.indexOf("Brethren") != -1 ||
                            tmpRel.indexOf("Baptist") != -1 ||
                            tmpRel.indexOf("Apostolic") != -1 ||
                            tmpRel.indexOf("Evangelical") != -1 ||
                            tmpRel.indexOf("Lutheran") != -1 ||
                            tmpRel.indexOf("Orthodox") != -1 ||
                            tmpRel.indexOf("Presbyterian") != -1 ||
                            tmpRel.indexOf("Protestant") != -1 ||
                            tmpRel.indexOf("Quakers") != -1 ||
                            tmpRel.indexOf("Pentecostal") != -1 ||
                            tmpRel.indexOf("Methodist") != -1 ||
                            tmpRel.indexOf("Anglican") != -1 ||
                            tmpRel.indexOf("Apostolic") != -1 ||
                            tmpRel.indexOf("Jesus") != -1 ||
                            tmpRel.indexOf("Reform") != -1 ||
                            tmpRel.indexOf("Apostolic") != -1 ||
                            tmpRel.indexOf("Jehovah") != -1 ){  return "#494E86";}
                        else if (tmpRel.indexOf("Jewish") != -1) return "#864A49";
                        else if (tmpRel.indexOf("Athe") != -1 || tmpRel.indexOf("No Rel") != -1) return "#864981";


                        else{
                            console.debug("not cat", tmpRel);
                            return 'yellow';
                        }



                    }  /* if(csv[i].Religion == "Muslim") return "red";
                     else {
                     return '#ccc';
                     }})*/
                    return d ? usChart.colors()(d) : '#ccc'; })
                .overlayGeoJson(statesJson.features, "state", function (d) {
                    //   console.debug("!", d.length)
                    return d.properties.name;
                })
                .title(function (d) {
                    return "Country: " + d.key;
                });




            spendHistChart
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(hdiHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){  colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][4]-1];});

            spendHistChart.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart.xAxis().ticks(0);
            spendHistChart.yAxis().ticks(5);

            spendHistChart2
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(genderHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){ colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][6]-1];});

            spendHistChart2.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart2.xAxis().ticks(0);
            spendHistChart2.yAxis().ticks(5);

            spendHistChart3
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(schoolHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){  colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][1]-1];});

            spendHistChart3.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart3.xAxis().ticks(0);
            spendHistChart3.yAxis().ticks(5);

            spendHistChart4
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(lifeHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][3]-1];});

            spendHistChart4.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart4.xAxis().ticks(0);
            spendHistChart4.yAxis().ticks(5);

            spendHistChart5
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(internetHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][2]-1];});

            spendHistChart5.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart5.xAxis().ticks(0);
            spendHistChart5.yAxis().ticks(5);

            spendHistChart6
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(ageDHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][0]-1];});

            spendHistChart6.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart6.xAxis().ticks(0);
            spendHistChart6.yAxis().ticks(5);

            spendHistChart7
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(refugeesHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){  colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][5]-1];});

            spendHistChart7.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart7.xAxis().ticks(0);
            spendHistChart7.yAxis().ticks(5);

            spendHistChart8
                .width(dimWidth).height(200)
                .dimension(timeDim)
                .group(gniHist)
                .x(d3.scale.linear().domain([0,6]))
                .elasticY(false)
                .colors(function(){ colorID4++; if (colorID4 >5) colorID4=1; return colors4[hierarchy[colorID4-1][7]-1];});

            spendHistChart8.xAxis().tickFormat(function(d) {return d}); // convert back to base unit
            spendHistChart8.xAxis().ticks(0);
            spendHistChart8.yAxis().ticks(5);



            var colors3 = ["#5D7A28","#4A8567","#C7931B","#C66619","#973615"];
            var colors47 = ["#6A1F1D","#6A1D63","#636A1D","#1D246A","#1d6a3e"];
            // 1 jew
            // 3 budd
            // 4 christ
            // 5 isl

            colorID3 = 0;
            spenderRowChart
                .width(1000).height(200)
                .dimension(nameDim)
                .group(spendPerName)
                .elasticX(false)
                .colors( function(d,i){ colorID3++; if (colorID3 >4) colorID3=0; return colors47[colorID3];});



            dc.renderAll();
        });

    });

//yearRingChart.turnOnControls(true)
    spendHistChart.turnOnControls(true)
    spendHistChart2.turnOnControls(true)
    spendHistChart3.turnOnControls(true)
    spendHistChart4.turnOnControls(true)
    spendHistChart5.turnOnControls(true)
    spendHistChart6.turnOnControls(true)
    spendHistChart7.turnOnControls(true)
    spendHistChart8.turnOnControls(true)

    spenderRowChart.turnOnControls(true)


});