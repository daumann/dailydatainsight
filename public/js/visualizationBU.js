var bakedDate = new Array();
var datapoints = new Array();
var init = false;
var mySmartTable = $('#smartTable');
var numberOfEntries = 5000;


function loadData(newValue){
    
    if(numberOfEntries != newValue){
        
    numberOfEntries = newValue;
        window.location.assign(location.href.replace(location.hash,"") + '#'+newValue);
        location.reload();
    }
    
    else {
        reset(0);
    }
    
}

function generateVisualization(url,coordinate_x,coordinate_y,dateStartTimeline,countryName,customZoom){
    //var host = "http://localhost:3000";


    numberOfEntries;

    var bakedNames = new Array();
    var bakedDescription = new Array();
    var bakedBirthPlace = new Array();
    var bakedLatitude = new Array();
    var bakedLongitude = new Array();


        //console.debug("geoNames");        
        //console.debug(geoNames);

        d3.tsv('data/personData.csv', function (error, personData) {

        //    console.debug(personData);

            for (var i=0;i<numberOfEntries;i++)
            {
//console.debug(personData[i]);
                var dt = personData[i].DATEOFBIRTH;
//console.debug(dt);
                // BC
                if (dt !== undefined && personData[i].DATEOFBIRTH.lastIndexOf("BC") != -1)
                {
                    //	console.debug(dt);
                    var yearBC;
                    if (dt.length > 10) {
                        var dateBC = new Date(dt.substr(0,dt.lastIndexOf(" ")));

                        //	console.debug("date bug before" + parseInt(dt.substr(0,dt.lastIndexOf(" "))));
                        var dtBCpreString = dt.substr(0,dt.lastIndexOf(" BC"));

                        //	console.debug("checking using this BC year:"+parseInt(dt.substr(dtBCpreString.lastIndexOf(" ")))+":");

                        var toCheck = parseInt(dt.substr(dtBCpreString.lastIndexOf(" ")));

                        if (isNaN(toCheck)) {
                            toCheck = parseInt(dtBCpreString);
                            //	console.debug("#### changing dtBCpreString:_"+toCheck+"_");
                        }

                        if(toCheck < 71)
                        {
                            dateBC.setFullYear(toCheck);
                            if (parseInt(dateBC.getFullYear()) < -1000)
                                dateBC.setFullYear(-parseInt(dateBC.getFullYear())+1900);

                        }
                        else
                        {
                            dateBC.setFullYear(toCheck);
                            if(isNaN(dateBC.getFullYear()))
                            {
                                dateBC.setFullYear(-parseInt(dt.substr(dtBCpreString.lastIndexOf(" "))))
                            }
                        }

                        dateBC.setFullYear(-dateBC.getFullYear());

                        yearBC = dateBC.getFullYear();
                        //	console.debug('+++++++++++++  '+yearBC);								
                    }
                    else {
                        var dateBC = new Date(dt.substr(0,dt.lastIndexOf(" ")));
                        var dtBCpreString = dt.substr(0,dt.lastIndexOf(" BC"));

                        dateBC.setFullYear(-parseInt(dtBCpreString))

                        //	console.debug(dt);
                        //	console.debug('----------------dateBC  '+dateBC);

                        //	yearBC = dateBC.getFullYear();
                        //console.debug('----------------  '+dateBC.getFullYear());


                    }
                    //console.debug(Date.parse(personData[i].DATEOFBIRTH));

                    if (!isNaN(yearBC)) {

                        //          title
                        personData[i].DATEOFBIRTH = dateBC;
                        //console.log(new Date(personData[i].DATEOFBIRTH).toISOString() +" BC");
                        // console.log(personData[i].NAME);
                        // console.log(dateBC); 
                        //console.log(personData[i].DATEOFBIRTH);   
                        // console.log(new Date(personData[i].DATEOFBIRTH));   

                        // console.log(i);


                        //      console.log(dateBC.toISOString());
                    }


                }

                // AD TODO:  0 -  69 AD vorhanden?
                else if (dt !== undefined && dt != "")
                {
                    //  console.debug(dt);
                    var dateAD = new Date(dt);
                    var yearAD = dateAD.getFullYear();
                    //	console.debug('-------------dateAD-dateAD-dateAD- '+yearAD);

                    if (!isNaN(yearAD) ) {
                        personData[i].DATEOFBIRTH = dateAD;
                        //console.log(new Date(personData[i].DATEOFBIRTH).toISOString() +" AD");
                    }

                }
            }



            console.debug("go");


            for (var i=0;i<numberOfEntries;i++)
            {

                var dateToPush = new Date(personData[i].DATEOFBIRTH);
                var nameToPush = personData[i].NAME
                var descriptionToPush = personData[i].SHORTDESCRIPTION
                var birthPlaceToPush = personData[i].PLACEOFBIRTH
                var latitudeToPush = personData[i].LATITUDE
                var longitudeToPush = personData[i].LONGITUDE

//console.debug("personData[i].LATITUDE: "+personData[i].LATITUDE);
//console.debug(personData[i]);
//console.debug("adding longitude: "+longitudeToPush);

                // console.debug("datapoints (persondata)  " );



                //    console.debug(birthPlaceToPush)
                //      console.debug(https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false);
                if (!isNaN(dateToPush) && dateToPush.toISOString() != "")
                {
                    //     console.debug("pushing: "+dateToPush.toISOString());


                    counnter++;

                    bakedDate.push(dateToPush.toISOString());
                    bakedNames.push(nameToPush);
                    bakedDescription.push(descriptionToPush);
                    bakedBirthPlace.push(birthPlaceToPush);

                    bakedLatitude.push(latitudeToPush);
                    bakedLongitude.push(longitudeToPush);


                }
            }

            goOn();
        });
        var counnter = 0;


        function goOn(){

            console.debug(" every second is failing - pushing "+counnter+" vs. using"+bakedDate.length);
            for (var i=0;i<bakedDate.length;i++)
            {

                var address = bakedBirthPlace[i];
                /*
                 if (false) //status == google.maps.GeocoderStatus.OK)
                 {
                 // do something with the geocoded result
                 //
                 //console.debug(results);
                 var myLat = bakedLatitude[i] //results[0].geometry.location.d.toString()
                 var myLon = bakedLongitude[i] //results[0].geometry.location.e.toString()


                 datapoints.push({"__v":2,"_id":i,"created":"2012-11-10T18:56:20.065Z","createdBy":{"name":"Christopher Tuckwood","_id":"5097f78f24f10c0200000001"},"description":bakedDescription[i],"event_date":bakedDate[i],"modified":"2013-04-12T18:57:59.851Z","modifiedBy":{"name":"sarah farrukh","_id":"50abdec058cdf40200000001"},"serialNumber":3,"soc":bakedBirthPlace[i],"stage":bakedDescription[i],"title":bakedNames[i],"sources":[{"url":"http://iranbriefing.net/?p=15671&utm_source=rss&utm_medium=rss&utm_campaign=ailing-bahai-student-denied-hospital-treatment","sourcetype":"NGO","_id":"516859379e93370200000045"}],"tags":[],"Location":{"latitude":myLat,"longitude":myLon,"title":bakedBirthPlace[i]}});
                 console.debug("returned: "+myLat + " -- " +myLon);
                 } else {
                 */

                //   console.debug("using date: "+bakedDate[i]);
                //   console.debug(d3.time.day(new Date(bakedDate[i])));
                // console.debug(i + "-" +bakedLatitude[i]+ "-" +bakedDescription[i]);

                datapoints.push({"__v":2,"_id":i,"created":"2012-11-10T18:56:20.065Z","createdBy":{"name":"Christopher Tuckwood","_id":"5097f78f24f10c0200000001"},"description":bakedDescription[i],"dateOfBirth":d3.time.day(new Date(bakedDate[i])),"modified":"2013-04-12T18:57:59.851Z","modifiedBy":{"name":"sarah farrukh","_id":"50abdec058cdf40200000001"},"serialNumber":3,"soc":bakedBirthPlace[i],"stage":bakedDescription[i],"title":bakedNames[i],"sources":[{"url":"http://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search="+bakedNames[i]+"&full"+bakedNames[i]+"=Search"}],"tags":[],"Location":{"latitude":bakedLatitude[i],"longitude":bakedLongitude[i],"title":bakedBirthPlace[i]}});
                //    console.debug(datapoints[i]);


                //     console.debug("failed to return geoMapping for "+bakedBirthPlace[i]);

                //     console.debug("returned: "+results[0].geometry.location.latitude + " -- " +results[0].geometry.location.longitude);
                // }

                //   setTimeout(function(){

                // }, 0);
                //    i++;
                //         });
            }
            doRest();
        }



        function doRest() {
            console.log("in doRest()");


            ////////////////////////////////////////
            /// Crossfilter Initial configuration///
            ////////////////////////////////////////

            // console.debug(datapoints);
            tags = [];
            var ymdFormat = d3.time.format("%Y-%m-%d");
            datapoints.forEach(function(p) {

                //	console.debug(p.event_date);
                //console.debug(moment.utc(p.event_date));
                p.event_date = ymdFormat.parse(moment.utc(p.event_date).format("YYYY-MM-DD"));
                p.created = ymdFormat.parse(moment.utc(p.created).format("YYYY-MM-DD"));
                //normalize tags
                if (typeof(p.tags)!='undefined'  && p.tags!==null){
                    p.tags.forEach(function(tag){
                        tags.push({title: tag.title,total: 1});
                    });
                }
            });
            var dateformat = d3.time.format("%B %d, %Y");

            var crossdatapoints = crossfilter(datapoints);
            var all = crossdatapoints.groupAll();
            var byId = crossdatapoints.dimension(function(p) { return p._id; });
            var bySerialNumber = crossdatapoints.dimension(function(p) { return p._id; });

            var byStage = crossdatapoints.dimension(function(p) { return p.stage; });

            var byCreator = crossdatapoints.dimension(function(p) { return p.createdBy.name; });

            var bySoc = crossdatapoints.dimension(function(p) { return p.soc; });

            var byTags = crossdatapoints.dimension(function(p){return p.tags;});

            var crosstags = crossfilter(tags);


            var tagList = crosstags.dimension(function(p){return p.title;});

            var byLocation = crossdatapoints.dimension(function(p) {
                return [p.Location.latitude,p.Location.longitude];
            });
            var byFullLocation = crossdatapoints.dimension(function(p) {return p.Location; });
            var byFullLocationtemp = crossdatapoints.dimension(function(p) {return p.Location; });

            var tagsFiltered = false;


            var byEventDate = crossdatapoints.dimension(function(p) { return d3.time.day(p.dateOfBirth); });
            //byEventDate.group().top(Infinity).forEach(function(p, i) {
            //	console.log(p.key + ": " + p.value);
            //});

            // Render the initial list of tag.
            var listtag = d3.select("#tag-list").data([taglist]);

            // Render the total number of datapoints
            d3.selectAll("#total").text(crossdatapoints.groupAll().reduceCount().value());


            var hide = false;
            var clicktoshow = false;
            //configure bootstrap popovers (for stage and hate crimes terms)
            $('#popover').popover({ trigger: 'manual' }).hover(function(e){
                if (!$("#popover").next('div.popover:visible').length && hide ===false){
                    $(this).popover('show');
                    e.preventDefault();
                } else if (hide){
                    hide = false;
                }
            }).click(function(e){
                if ($("#popover").next('div.popover:visible').length){
                    hide = true;
                } else {
                    clicktoshow=true;
                    $('#popover').popover('show');
                }
            });
            $('#popovertitle').popover({ trigger: 'manual' }).hover(function(e){
                if (!$("#popovertitle").next('div.popover:visible').length && hide ===false){
                    $(this).popover('show');
                    e.preventDefault();
                } else if (hide){
                    hide = false;
                }
            }).click(function(e){
                if ($("#popovertitle").next('div.popover:visible').length){
                    hide = true;
                } else {
                    clicktoshow=true;
                    $('#popovertitle').popover('show');
                }
            });
            $('#popovergeneral').popover({ trigger: 'manual' }).hover(function(e){
                if (!$("#popovergeneral").next('div.popover:visible').length && hide ===false){
                    $(this).popover('show');
                    e.preventDefault();
                } else if (hide){
                    hide = false;
                }
            }).click(function(e){
                if ($("#popovergeneral").next('div.popover:visible').length){
                    hide = true;
                } else {
                    clicktoshow=true;
                    $('#popovergeneral').popover('show');
                }
            });

            //hide on click somewhere on the screen
            $(document).click(function(e) {
                if (($("#popover").next('div.popover:visible').length || $("#popovertitle").next('div.popover:visible').length || $("#popovergeneral").next('div.popover:visible').length) && clicktoshow===false){
                    $('#popover').popover('hide');
                    $('#popovergeneral').popover('hide');
                    $('#popovertitle').popover('hide');
                } else if (clicktoshow){
                    clicktoshow=false;
                }
            });
            //Automatically check the box that defines if general datapoints should be shown
            $('#checkboxgeneral').prop('checked', true);

            //function to disable-renable the general stage datapoints on the map/list
            window.filterGeneral = function(general){
                byStage.filterFunction(function (stage) {
                    if (stage=='General' && general===false){
                        return false;
                    } else {
                        return true;
                    }
                });
                updateDatapoints();
                //redoTagList();
                renderAll();
            };
            ////////////////////////////////////////
            /// Leaflet and Mapping //
            ////////////////////////////////////////
            //create leaflet map


            var map = new L.Map("map", {
                center: [coordinate_x, coordinate_y],
                zoom: customZoom,
                zoomsliderControl: true,
                zoomControl: false,
                keyboard: false,
                minZoom: 1
            })
                .addLayer(L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roads/x={x}&y={y}&z={z}', {
                    minZoom: 0,
                    maxZoom: 20,
                    attribution: ''
                }));

            var info = L.control();

            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                this.update();
                return this._div;
            };

            // method that we will use to update the control based on feature properties passed
            info.update = function (location) {
                this._div.innerHTML = '<h4>Datapoints</h4>' +  (location ?
                    '<b>' + location + '</b>'
                    : countryName);
            };

            info.addTo(map);
            //necessary to integrate between d3 and leaflet
            function project(x) {
                var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
                return [point.x, point.y];
            }
            //projection to be used to convert GeoJSON to SVG
            var path = d3.geo.path().projection(project);

            var svg = d3.select(map.getPanes().overlayPane).append("svg")
                .data([generateMapData]);
            //our map will be included inside a <g> (group) tag, it is hidden while zooming on leaflet is happening
            var gleaf = svg.append("g").attr("class", "leaflet-zoom-hide");

            //the actual map created from data

            function generateMapData() {
                try{
                    d3.json(pathData, function(error, data) {
                        var feature = gleaf.selectAll(".subunit")
                            .data(topojson.feature(data, data.objects.subunits).features)
                            .enter().append("path")
                            //class name based on name of region
                            .attr("class", function(d) { return "subunit";})
                            .attr("d", path)
                            //random color for each sub region of that country
                            .style("fill", function() {
                                return "hsl(" + Math.random() * 360 + ",100%,50%)";
                            });

                        var bounds = d3.geo.bounds(topojson.feature(data, data.objects.subunits));
                        //we want to call reset everytime we zoom in or zoom out of the map
                        map.on("viewreset", reset);
                        //reset();
                        updateDatapoints();
                        // Reposition the SVG to cover the features.
                        function reset() {
                            /*
                             var bottomLeft = project(bounds[0]);
                             var topRight = project(bounds[1]);
                             svg.attr("width", topRight[0] - bottomLeft[0])
                             .attr("height", bottomLeft[1] - topRight[1])
                             .style("margin-left", bottomLeft[0] + "px")
                             .style("margin-top", topRight[1] + "px");
                             gleaf.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");
                             feature.attr("d", path);
                             //when we zoom in a lot,  hide the color background
                             if(map.getZoom()>10){
                             feature.style("fill-opacity","0");
                             } else {
                             feature.style("fill-opacity","0.2");
                             }
                             */
                        }
                    });

                }catch(err) {console.debug("Could not add data to map generateMapData");}
            }
            //create the leaflet marker cluster group
            var markers = L.markerClusterGroup({showCoverageOnHover:false,maxClusterRadius:40});
            var markers_list = {};
            //the datapoints on the map
            function updateDatapoints() {

                //remove all markers from the map in order to be able to do a refresh
                //mySmartTable.clear().draw();
                console.debug("**updating**");

                markers.clearLayers();
                markers_list = {};
                //for every datapoint

                console.debug(byId.top(Infinity));

                byId.top(Infinity).forEach(function(p, i) {
                    //create a marker at that specific position

                    console.debug(p.Location.latitude);
                    console.debug(p.Location.longitude);
                    if(/\d/.test(p.Location.latitude) && /\d/.test(p.Location.longitude)){

                        var marker = L.circleMarker([p.Location.latitude,p.Location.longitude]);


                        marker.setRadius(7);
                        //On mouse over, update the info overlay with the name of the location and turn to red
                        marker.on('mouseover',function (e) {
                            marker.setStyle({fillOpacity: 0.8,fillColor:'rgb(153,0,0)',color:'rgb(153,0,0)'});
                            info.update(p.title);
                        });

                        //On mouse out, re-update the info overlay with no value and normal color
                        marker.on('mouseout',function (e) {
                            marker.setStyle({fillOpacity: 0.5,fillColor:'rgb(9,106,156)',color:'rgb(9,106,156)'});
                            info.update();
                        });

                        //on click, show the specific datapoint
                        marker.on('click',function (e) {
                     //       console.debug(p._id);
                            info.update();
                            showModal(p._id);
                        });

                        marker.setStyle({fillOpacity: 0.5,fillColor:'rgb(9,106,156)'});
                        //add the marker to the map
                        //console.debug("markerr:");


                      //  console.debug("in addd with _latlng:"+$(marker)[0]._latlng);
                        markers.addLayer(marker);



                        //keep markers in a array so we can get refer to them later
                        markers_list[[p.Location.latitude,p.Location.longitude]]=marker;
                    }
                });

            }
            map.addLayer(markers);
            //display location name on mouse over on cluster (if they are all at the same location)
            //and turn red the cluster marker on the map
            markers.on('clustermouseover', function (a) {
                //add style hovered to the cluster icon, meaning it turns red
                $(a.layer._icon).addClass('hovered');

                //we look for the location name of where the cluster is located to put in the info box on the map
                var allchild = a.layer.getAllChildMarkers();
                //console.log(allchild[0].getLatLng());
                for (var key in allchild){
                    //console.log(allchild[key].getLatLng());
                    if (allchild[key].getLatLng().lat.toFixed(3)!=allchild[0].getLatLng().lat.toFixed(3) && allchild[key].getLatLng().lng.toFixed(3)!=allchild[0].getLatLng().lng.toFixed(3)){
                        //if the points in the cluster are not all at the same place (so currently grouped), we don't want to show location
                        info.update("Click to zoom");
                        return false;
                    }
                }
                byFullLocationtemp.filterFunction(function (datapointlocation) {
                    if (datapointlocation.latitude==allchild[0].getLatLng().lat && datapointlocation.longitude==allchild[0].getLatLng().lng){
                        //We found the location name so we show it
                        info.update(datapointlocation.title);
                        return true;
                    }
                    return false;
                });
                byFullLocationtemp.filterAll();
            });
            //when the cursor moves out, we remove the color red and remove location name
            markers.on('clustermouseout',function (a) {
                $(a.layer._icon).removeClass('hovered');
                info.update();
            });

            //when someone click on a cluster, we want to filter so that the list of datapoints only contain the ones inside the cluster
            markers.on('clusterclick',function (a) {
                info.update();
                var allchild = a.layer.getAllChildMarkers();
                //if there is no more cluster underneath that cluster, we stop filtering
                if (a.layer._childClusters.length != 0 ){
                    byFullLocation.filterFunction(function (datapointlocation) {
                        //we go through every location in crossfilter and we only keep it if it matches one of the child of the cluster we just clicked
                        for (var key in allchild){
                            if (datapointlocation.latitude==allchild[key].getLatLng().lat && datapointlocation.longitude==allchild[key].getLatLng().lng){
                                return true;
                            }
                        }
                        return false;
                    });
                    updateDatapoints();
                    //redoTagList();
                    renderAll();

                }
            });


            //configure bar chart for timeline
            var charts = [
                barChart()
                    .dimension(byEventDate)
                    .group(byEventDate.group())
                    .x(d3.time.scale.utc()
                        .domain([dateStartTimeline, new Date()])
                        .rangeRound([0, 960]))
            ];
            var chart = d3.selectAll(".chart")
                .data(charts)
                .each(function(chart) {
                    chart
                        .on("brush", function(){
                            updateDatapoints();
                            redoTagList();
                            renderAll();
                        })
                        .on("brushend", function(){
                            updateDatapoints();
                            redoTagList();
                            renderAll();
                        });
                });


            // Render the initial list of datapoints
            var list =  d3.selectAll("#datapoint-list").data([datapointlist]);
            //  var list2 =  d3.selectAll("#datapoint-list").data([datapointlist]);
            // Renders the specified chart or list.
            function render(method) {
                d3.select(this).call(method);
            }

            function renderAll() {
                list.each(render);
                listtag.each(render);
                chart.each(render);
                d3.select("#active").text((all.value()));
            }

            generateMapData();
            renderAll();


            //Javascript exexcuted onchange when dropdown menu for stage is changed
            /*	window.filterStage = function(stage){
             if (stage!==''){
             byStage.filterAll(null);
             byStage.filter(stage);
             $('#checkboxlabel').hide();
             } else {
             //Remove all filters
             byStage.filterAll(null);
             //if checkbox was not checked, dont show general stage
             if ($('#checkboxgeneral').is(':checked')===false){
             byStage.filterFunction(function (stage) {
             if (stage=='General'){
             return false;
             } else {
             return true;
             }
             });
             }
             $('#checkboxlabel').show();
             }
             updateDatapoints();
             redoTagList();
             renderAll();
             };

             */
            //Recreate the taglist
            function redoTagList() {
                var tags=[];
                byId.top(Infinity).forEach(function(p, i) {
                    if (p.tags!==null && typeof(p.tags)!='undefined'){
                        p.tags.forEach(function(tag){
                            tags.push({title: tag.title,total: 1});
                        });
                    }
                });
                crosstags = crossfilter(tags);
                tagList = crosstags.dimension(function(p){return p.title;});
            }
            //When clicking the Reset all filters, we show all datapoints on every visualization
            window.reset = function() {
                byTags.filterAll(null);
                byFullLocation.filterAll(null);
                $('#checkboxgeneral').prop('checked', true);
                $('#checkboxlabel').show();
                byStage.filterAll(null);
                charts[0].filter(null);
                $("#stagedropdown").val('');
                redoTagList();
                renderAll();
                updateDatapoints();
                d3.select("#activefilter").text('');
                tagsFiltered = false;
                //recenter the map and put back at the normal zoom level
                map.setView([coordinate_x, coordinate_y],customZoom);
            };
            
            reset(0);
            //triggered when cursor goes over the datapoint link in datapoint list
            window.overMarker = function (datapointLocation){
                //we first test to see if the marker is present in the cluster, if yes, that's the one we fire the mouseover event to
                //if not, that means the marker is directly on the map (not being clustered) so that's the one we fire the event to
                if (markers.getVisibleParent(markers_list[datapointLocation])){
                    markers.getVisibleParent(markers_list[datapointLocation]).fire('mouseover');
                } else {
                    markers_list[datapointLocation].fire('mouseover');
                }
            };

            //triggered when cursor leaves the datapoint link in datapoint list
            window.outMarker = function (datapointLocation){
                if (markers.getVisibleParent(markers_list[datapointLocation])){
                    markers.getVisibleParent(markers_list[datapointLocation]).fire('mouseout');
                } else {
                    markers_list[datapointLocation].fire('mouseout');
                }
            };

            //window to be displayed when clicking on a datapoint in the list
            window.showModal = function (datapointId){
                console.debug(datapoints);
                bySerialNumber.filter(datapointId);
                //bySerialNumber.top(Infinity).forEach(function(p, i) {

                d3.select("#datapointevent").text(datapoints[datapointId].title);
                d3.select("#datapointdescription").text(datapoints[datapointId].description);
                //d3.select("#datapointstage").text(p.stage);
                d3.select("#datapointlocation").text(datapoints[datapointId].Location.title);
                d3.select("#datapointdate").text(dateformat(datapoints[datapointId].dateOfBirth));
                d3.select("#datapointlink").attr("href",function(d) { return "/datapoint/edit?id="+datapointId; });
                d3.selectAll(".datapointsource").remove();
                if (datapoints[datapointId].sources!==null && typeof(datapoints[datapointId].sources)!='undefined'){
                    for (var j=0;j<datapoints[datapointId].sources.length;j++){
                        //Create link if it's a URL in the source field
                        if (/^(f|ht)tps?:\/\//i.test(datapoints[datapointId].sources[j].url)){
                            datapointsource = d3.select("#datapointsources").
                                append("span").attr("class","datapointsource").append("a").attr("href",datapoints[datapointId].sources[j].url).text(datapoints[datapointId].sources[j].url).attr("target","_blank").attr("class","datapointsource").style("color","#333");
                        } else {
                            datapointsource = d3.select("#datapointsources").
                                append("span").attr("class","datapointsource").text(datapoints[datapointId].sources[j].sourcetype+" : "+datapoints[datapointId].sources[j].url);
                        }
                    }
                }
                //});
                bySerialNumber.filterAll(null);
                $('#myModal').modal('toggle');
                window.history.replaceState("", "title", "?datapoint="+datapointId);
            };
            //Replace to normal empty url when we hide the modal
            $('#myModal').on('hidden', function () {
                window.history.replaceState("", "title", "?");
            })

            //Look for datapoint GET argument in the URL, if present, toggle showModal to show datapoint directly
            var prmstr = window.location.search.substr(1);
            var prmarr = prmstr.split ("&");
            var params = {};

            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            if (params.datapoint!==undefined){
                console.debug(datapoint)
                window.showModal(params.datapoint);
            }

            // Creation of table with all datapoints
            function datapointlist(div) {

                if (!init){
                    $.fn.dataTableExt.sErrMode = 'throw';
                    mySmartTable = $('#smartTable').DataTable();
                    init = true;
                }
                var firstInRound = true;
                var first = true;
                // mySmartTable.clear();
                // console.debug(div);
                div.each(function() {
                    
                    if (firstInRound) {console.debug("clearing!!"); mySmartTable.clear();  firstInRound = false;}
                    
                    var datapoints = d3.select(this).selectAll(".datapoint").data(byEventDate.top(Infinity),function(d) { if (first) {first = false;} else {
                        try {
                        mySmartTable.row.add( [
                            d.title,
                            d.stage,
                            dateformat(d.dateOfBirth),
                            d.soc
                        ] ); }
                        catch (err) {console.info(err)}
                    }
                     });
                    
                    
                    console.debug("dazwoscjem ---")
                    
                    
                    var datapointsEnter = datapoints.enter().append("div").attr("class","datapoint");



/*
                    datapointsEnter.append("div")
                        .attr("class", "title")
                        .append("a")
                        .attr("href",function(d) { return ("http://en.wikipedia.org/w/index.php?title=Special%3ASearch&profile=default&search="+d.title+"&full"+d.title+"=Search"); })
                        .attr("target","_blank")
                        //	.attr("onclick",function(d) { return ("javascript:showModal('"+d.serialNumber+"'	);return false;"); })
                        .attr("onmouseover",function(d) { return ("javascript:overMarker('"+[d.Location.latitude,d.Location.longitude]+"'	);"); })
                        .attr("onmouseout",function(d) { return ("javascript:outMarker('"+[d.Location.latitude,d.Location.longitude]+"'	);"); })
                        .text(function(d) {

                            //console.debug(mySmartTable);
                            

                            //document.getElementById("datapoint-list2").innerHTML = document.getElementById("datapoint-list2").innerHTML + "<tr><td><a href='http://en.wikipedia.org/w/index.php?title=Special%3ASearch&amp;profile=default&amp;search"+d.title+"&amp;full"+d.title+"=Search' target='_blank'>"+d.title+"</a></td><td>"+d.stage+"</td><td>"+dateformat(d.dateOfBirth)+"</td><td>"+d.soc+"</td></tr>"; return d.title; 
                        });

                    datapointsEnter.append("div")
                        .attr("class", "stage")
                        .text(function(d) { return d.stage; });

                    datapointsEnter.append("div")
                        .attr("class", "date")
                        .text(function(d) { return dateformat(d.dateOfBirth); });

                    datapointsEnter.append("div")
                        .attr("class", "date")
                        .text(function(d) { return d.soc; });
 */
                    datapoints.exit().remove();

                    datapoints.order();
                });

                try {
                mySmartTable.draw();
                }
                catch (err) {console.info(err)}
                
                console.debug("DRAWING")


            }
            //create list of tags (being displayed on the left side of the screen)
            function taglist(div) {
                div.each(function() {
                    //d3.selectAll(this.childNodes).remove();
                    var tags = d3.select(this).selectAll(".tag").data(tagList.group().top(Infinity),function(d) { return d.key+d.value; });
                    var tagsEnter = tags.enter().append("div").attr("class","tag");
                    tagsEnter.append("a")
                        .attr("class", "title")
                        //TODO not have javascript directly in the link
                        .attr("href","#")
                        .attr("onclick",function(d) { return ("javascript:filter('"+d.key+"');return false;"); })
                        .text(function(d) { return d.key+" ("+d.value+")"; });
                    tags.exit().remove();
                    tags.order();
                });
            }
            //function given in example on https://github.com/square/crossfilter
            function barChart() {
                if (!barChart.id) barChart.id = 0;

                var margin = {top: 20, right: 10, bottom: 20, left: 10},
                    x,
                    y = d3.scale.linear().range([100, 0]),
                    id = barChart.id++,
                    axis = d3.svg.axis().orient("bottom"),
                    brush = d3.svg.brush(),
                    brushDirty,
                    dimension,
                    group,
                    round;

                function chart(div) {
                    var width = x.range()[1],
                        height = y.range()[0];

                    y.domain([0, group.top(1)[0].value]);

                    div.each(function() {
                        var div = d3.select(this),
                            g = div.select("g");

                        // Create the skeletal chart.
                        if (g.empty()) {
                            /*div.select(".daterange")
                             .style("display", "none");*/

                            g = div.append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom )
                                .append("g")
                                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                            g.append("clipPath")
                                .attr("id", "clip-" + id)
                                .append("rect")
                                .attr("width", width)
                                .attr("height", height);

                            g.selectAll(".bar")
                                .data(["background", "foreground"])
                                .enter().append("path")
                                .attr("class", function(d) { return d + " bar"; })
                                .datum(group.all());

                            g.selectAll(".foreground.bar")
                                .attr("clip-path", "url(#clip-" + id + ")");

                            g.append("g")
                                .attr("class", "axis")
                                .attr("transform", "translate(0," + height + ")")
                                .call(axis);
                            /*
                             g.append("text")
                             .attr("class", "chart-label")
                             .attr("transform", "translate(-10,0"  + ")")
                             .text("Click and drag on timeline to filter by date of birth");
                             */
                            // Initialize the brush component with pretty resize handles.
                            var gBrush = g.append("g").attr("class", "brush").call(brush);
                            gBrush.selectAll("rect").attr("height", height);
                            gBrush.selectAll(".resize").append("path").attr("d", resizePath);
                        }

                        // Only redraw the brush if set externally.
                        if (brushDirty) {
                            brushDirty = false;
                            g.selectAll(".brush").call(brush);
                            //div.select(".daterange").style("display", brush.empty() ? "none" : null);
                            div.select(".chart-label").text("Click and drag on chart to filter a date range");

                            if (brush.empty()) {
                                g.selectAll("#clip-" + id + " rect")
                                    .attr("x", 0)
                                    .attr("width", width);
                            } else {
                                var extent = brush.extent();
                                g.selectAll("#clip-" + id + " rect")
                                    .attr("x", x(extent[0]))
                                    .attr("width", x(extent[1]) - x(extent[0]));
                            }
                        }

                        g.selectAll(".bar").attr("d", barPath);
                    });

                    function barPath(groups) {
                        var path = [],
                            i = -1,
                            n = groups.length,
                            d;
                        while (++i < n) {
                            d = groups[i];
                            path.push("M", x(d.key), ",", height, "V", y(d.value), "h9V", height);
                        }
                        return path.join("");
                    }

                    function resizePath(d) {
                        var e = +(d == "e"),
                            x = e ? 1 : -1,
                            y = height / 3;
                        return "M" + (.5 * x) + "," + y
                            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
                            + "V" + (2 * y - 6)
                            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
                            + "Z"
                            + "M" + (2.5 * x) + "," + (y + 8)
                            + "V" + (2 * y - 8)
                            + "M" + (4.5 * x) + "," + (y + 8)
                            + "V" + (2 * y - 8);
                    }
                }

                brush.on("brushstart.chart", function() {
                    var div = d3.select(this.parentNode.parentNode.parentNode);
                    //div.select(".daterange").style("display", null);
                });

                brush.on("brush.chart", function() {
                    var g = d3.select(this.parentNode),
                        extent = brush.extent();
                    if (round) g.select(".brush")
                        .call(brush.extent(extent = extent.map(round)))
                        .selectAll(".resize")
                        .style("display", null);
                    g.select("#clip-" + id + " rect")
                        .attr("x", x(extent[0]))
                        .attr("width", x(extent[1]) - x(extent[0]));
                    dimension.filterRange(extent);
                    //Update the date range selected on the UI as we select a range on the chart
                    var div = d3.select(this.parentNode.parentNode.parentNode);
                    div.select(".chart-label").style("display", null)
                        .text(
                        function(){
                            var datetext;
                            if (typeof(dimension.bottom(1)[0])!='undefined' && typeof(dimension.top(1)[0])!='undefined'){
                                datetext=dateformat(dimension.bottom(1)[0].dateOfBirth) + ' to ' + dateformat(dimension.top(1)[0].dateOfBirth);
                            } else {
                                datetext='Click and drag on chart to filter a date range';
                            }
                            return (datetext);
                        }
                    );

                });

                brush.on("brushend.chart", function() {
                    if (brush.empty()) {
                        var div = d3.select(this.parentNode.parentNode.parentNode);
                        //div.select(".daterange").style("display", "none");
                        div.select(".chart-label").text("Click and drag on chart to filter a date range");
                        div.select("#clip-" + id + " rect").attr("x", null).attr("width", "100%");
                        dimension.filterAll();
                    }
                });

                chart.margin = function(_) {
                    if (!arguments.length) return margin;
                    margin = _;
                    return chart;
                };

                chart.x = function(_) {
                    if (!arguments.length) return x;
                    x = _;
                    axis.scale(x);
                    brush.x(x);
                    return chart;
                };

                chart.y = function(_) {
                    if (!arguments.length) return y;
                    y = _;
                    return chart;
                };

                chart.dimension = function(_) {
                    if (!arguments.length) return dimension;
                    dimension = _;
                    return chart;
                };

                chart.filter = function(_) {
                    if (_) {
                        brush.extent(_);
                        dimension.filterRange(_);
                    } else {
                        brush.clear();
                        dimension.filterAll();
                    }
                    brushDirty = true;
                    return chart;
                };

                chart.group = function(_) {
                    if (!arguments.length) return group;
                    group = _;
                    return chart;
                };

                chart.round = function(_) {
                    if (!arguments.length) return round;
                    round = _;
                    return chart;
                };

                return d3.rebind(chart, brush, "on");
            }
        }
}

$( document ).ready(function() {

    var x = location.hash.replace("#","");
    if (x != "" && !isNaN(x)){
        numberOfEntries = x;
        document.getElementById('dataCount').value = x;
    }
    
    generateVisualization("data/datapoints.json", 32, 53, new Date(-1000, 10, 06), "Hover/ click items to query information", 2);

});