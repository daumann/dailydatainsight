var insightID = 1;

var logoArray_de=["img/sports/logos/Logo_FC_Bayern_M%C3%BCnchen.svg",
    "img/sports/logos/FC_N%C3%BCrnberg.svg",
    "img/sports/logos/Borussia_Dortmund_logo.svg",
    "img/sports/logos/FC_Schalke_04_Logo.svg",
    "img/sports/logos/HSV-Logo.svg",
    "img/sports/logos/VfB_Stuttgart_Logo.svg",
    "img/sports/logos/Borussia_Moenchengladbach_Logo.svg",
    "img/sports/logos/SV-Werder-Bremen-Logo.svg",
    "img/sports/logos/Logo_1_FC_Kaiserslautern.svg",
    "img/sports/logos/1._FC_K%C3%B6ln.svg",
    "img/sports/logos/VfB_Leipzig_-_1902-1922.svg",
    "img/sports/logos/SpVgg_Greuther_F%C3%BCrth_logo.svg",
    "img/sports/logos/Hertha_BSC_Logo.svg",
    "img/sports/logos/Viktoria_89_Berlin_Logo.svg",
    "img/sports/logos/DSCFahneHistorisch.svg",
    "img/sports/logos/Hannover_96_Logo.svg",
    "img/sports/logos/Karlsruher_FV_Logo.svg",
    "img/sports/logos/Holstein_Kiel_Logo.svg",
    "img/sports/logos/TSV_1860_M%C3%BCnchen.svg",
    "img/sports/logos/Fortuna_D%C3%BCsseldorf.svg",
    "img/sports/logos/Eintracht_Frankfurt_Logo.svg",
    "img/sports/logos/SpVgg._Blau-weis.svg",
    "img/sports/logos/Eintracht_Braunschweig_logo.svg",
    "img/sports/logos/Logo_Rot-Weiss_Essen.svg",
    "img/sports/logos/Freiburger_FC.svg",
    "img/sports/logos/Phoenix_Karlsruhe_Wappen.svg",
    "img/sports/logos/VfR_Mannheim.svg",
    "img/sports/logos/Logo_SK_Rapid_Wien.svg",
    "img/sports/logos/VfL_Wolfsburg_Logo.svg"];

var labelArray_de=["FC Bayern Muenchen",
    "FC Nuernberg",
    "Borussia Dortmund",
    "FC Schalke 04",
    "Hamburger SV",
    "VfB Stuttgart",
    "Borussia Moenchengladbach",
    "SV Werder Bremen",
    "1 FC Kaiserslautern",
    "1. FC Koeln",
    "VfB Leipzig (1902-1922)",
    "SpVgg Greuther Fuerth",
    "Hertha BSC",
    "Viktoria 89 Berlin",
    "Dresdner SC",
    "Hannover 96",
    "Karlsruher FV",
    "Holstein Kiel",
    "TSV 1860 Muenchen",
    "Fortuna Duesseldorf",
    "Eintracht Frankfurt",
    "SpVgg Blau-Weiß 1890 Berlin",
    "Eintracht Braunschweig",
    "Rot-Weiss Essen",
    "Freiburger FC",
    "Phoenix Karlsruhe",
    "VfR Mannheim",
    "SK Rapid Wien",
    "VfL Wolfsburg"];

var logoArray_en=["img/sports/logos/Manchester_United_FC_crest.svg",
    "img/sports/logos/Liverpool_FC.svg",
    "img/sports/logos/Arsenal_FC.svg",
    "img/sports/logos/Everton_F.C._%282013%29.svg",
    "img/sports/logos/Aston_Villa.svg",
    "img/sports/logos/300px-Logo_Sunderland.svg.png",
    "img/sports/logos/Manchester_City.svg",
    "img/sports/logos/Chelsea_FC.svg",
    "img/sports/logos/Newcastle_United_Logo.svg",
    "img/sports/logos/Sheffield_Wednesday.svg",
    "img/sports/logos/Leeds_United.svg",
    "img/sports/logos/Wolverhampton_Wanderers.svg",
    "img/sports/logos/Huddersfield_town_fc.svg",
    "img/sports/logos/Blackburn_Rovers.svg",
    "img/sports/logos/Preston_North_End.svg",
    "img/sports/logos/Tottenham_Hotspur.svg",
    "img/sports/logos/Derby_county_fc%28neu%29.svg",
    "img/sports/logos/FC_Burnley.svg",
    "img/sports/logos/Portsmouth_FC_2008.svg",
    "img/sports/logos/Ipswich_Town.svg",
    "img/sports/logos/Nottingham_Forest_logo.svg",
    "img/sports/logos/Sheffield_United_FC_logo.svg",
    "img/sports/logos/West_Bromwich_Albion.svg"];

var labelArray_en=["Manchester United",
    "Liverpool FC",
    "Arsenal FC",
    "Everton F.C.",
    "Aston Villa",
    "Sunderland",
    "Manchester City",
    "Chelsea FC",
    "Newcastle United",
    "Sheffield Wednesday",
    "Leeds United",
    "Wolverhampton Wanderers",
    "Huddersfield Town Fc",
    "Blackburn Rovers",
    "Preston North End",
    "Tottenham Hotspur",
    "Derby CountyFC",
    "FC Burnley",
    "Portsmouth FC",
    "Ipswich Town",
    "Nottingham Forest",
    "Sheffield United FC",
    "West Bromwich Albion"];

var logoArray_sp=["img/sports/logos/Real_Madrid_CF.svg",
    "img/sports/logos/FCB.svg",
    "img/sports/logos/Atletico_Madrid_logo.svg",
    "img/sports/logos/Club_Athletic_Bilbao_logo.svg",
    "img/sports/logos/FC_Valencia.svg",
    "img/sports/logos/Real_Sociedad_logo.svg",
    "img/sports/logos/RC_Deportivo_La_Coru%C3%B1a_logo.svg",
    "img/sports/logos/FC_Sevilla.svg",
    "img/sports/logos/Real_betis_logo.svg"];

var labelArray_sp=["Real Madrid",
    "FC Barcelona",
    "Atletico Madrid",
    "Athletic Bilbao",
    "FC Valencia",
    "Real Sociedad.svg",
    "RC Deportivo La Coruna",
    "FC Sevilla",
    "Real Betis"];


var logoArray_it=["img/sports/logos/Juventus_Turin.svg",
    "img/sports/logos/AC_Milan.svg",
    "img/sports/logos/Internazionale.svg",
    "img/sports/logos/Genoa_CFC.svg",
    "img/sports/logos/Torino_FC_Logo.svg",
    "img/sports/logos/Bolognafc.svg",
    "img/sports/logos/Stemmaprovercelli.png",
    "img/sports/logos/AS_Roma_logo_(2013).svg",
    "img/sports/logos/SS_Lazio.svg",
    "img/sports/logos/S.S.C._Napoli_logo.svg",
    "img/sports/logos/ACF_Fiorentina_2.svg",
    "img/sports/logos/Sampdoria_badge.png",
    "img/sports/logos/AS_Casale_Calcio_Logo.svg",
    "img/sports/logos/US_Novese_Logo.svg",
    "img/sports/logos/Hellas_Verona_FC_logo.svg"];

var labelArray_it=["Juventus",
    "Milan",
    "Internazionale",
    "Genoa",
    "Torino",
    "Bologna",
    "Pro Vercelli",
    "Roma",
    "Lazio",
    "Napoli",
    "Fiorentina",
    "Cagliari",
    "Sampdoria",
    "Casale",
    "Novese",
    "Verona"];

var logoArray_fr=["img/sports/logos/Logo_AS_Saint-Étienne.svg",
    "img/sports/logos/Olympique_de_Marseille_logo.svg",
    "img/sports/logos/FC_Nantes_(seit_2008).svg",
    "img/sports/logos/Logo_AS_Monaco.svg",
    "img/sports/logos/Olympique_Lyonnais.svg",
    "img/sports/logos/Stade_Reims_1999.svg",
    "img/sports/logos/Girondins_Bordeaux_Logo.svg",
    "img/sports/logos/Logo_LOSC_Lille.svg",
    "img/sports/logos/OGC_Nice_Logo.svg",
    "img/sports/logos/Paris_Saint-Germain_FC_logo.svg",
    "img/sports/logos/FC_Sète.svg",
    "img/sports/logos/Logo_FC_Sochaux-Montbéliard.svg",
    "img/sports/logos/Racing_Club_de_France_Football_92_(2005).svg",
    "img/sports/logos/Rcstrasbourg.png",
    "img/sports/logos/AJ_Auxerre.svg",
    "img/sports/logos/RC_Lens_Logo.svg",
    "img/sports/logos/HSC_Montpellier_Logo.svg",
    "img/sports/logos/RC_Roubaix.png"];

var labelArray_fr=["Saint-Etienne",
    "Marseille",
    "Nantes",
    "As Monaco",
    "Lyon",
    "Stade de Reims",
    "Bordeaux",
    "Lille",
    "Nice",
    "Paris Saint-Germain",
    "Sete",
    "Sochaux",
    "RC Paris",
    "Strasbourg",
    "Auxerre",
    "Lens",
    "Montpellier",
    "Roubaix"];

var championshipCountArray_fr=[10,10,8,7,7,6,6,4,4,4,2,2,1,1,1,1,1,1];
var championshipCountArray_de=[24,9,8,7,6,5,4,4,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1];
var championshipCountArray_en=[20,18,13,9,7,6,4,4,4,4,3,3,3,3,2,2,2,2,2,1,1,1,1];
var championshipCountArray_sp=[32,22,10,8,6,2,1,1,1];
var championshipCountArray_it=[30,18,18,9,7,7,7,3,2,2,2,1,1,1,1,1];



var width = 900,//document.body.clientWidth (initialLogoSize*championshipCountArray.length),
    height = 490;
var initialLogoSize = width/40;


drawLogoCloud(championshipCountArray_sp,logoArray_sp,labelArray_sp, "Total La Liga championships won (1929-2014)");
drawLogoCloud(championshipCountArray_en,logoArray_en,labelArray_en, "Total Premiere League championships won (1888-2014)");
drawLogoCloud(championshipCountArray_de,logoArray_de,labelArray_de, "Total Bundesliga championships won (1903-2014)");
drawLogoCloud(championshipCountArray_it,logoArray_it,labelArray_it, "Total Serie A championships won (1929-2014)");
drawLogoCloud(championshipCountArray_fr,logoArray_fr,labelArray_fr, "Total Ligue 1 championships won (1932-2014)");

function drawLogoCloud(championshipCountArray, logoArray, labelArray, capture){
var svg = d3.select("#contentSVG").append("svg")
    .attr("width", width)
    .attr("height", height);

	
//START xAxis

//Scales
var xScale  = d3.scale.linear().domain([0, championshipCountArray[0]+5]).range([0, width]);

//GridLines
var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient("top")
                        .ticks(championshipCountArray[0]+10)
                        .tickSize(-height, 0, 0)
                        ;
				console.debug("xScale(5): "+championshipCountArray[0]);		
	svg.append("g")         
			.attr("class", "grid")
			.attr("transform", "translate(5," + 20 + ")")
			.call(xAxis);
			
			d3.selectAll("line").attr("stroke","lightgray");

//Labels


	
var isFullHeight = false;
var lastHeight = 0;

var logoG = svg.append("g").attr("id","logoG");
var currentValue = -1;
var sameCount = -1;
var lastItem = -1;

for (var i=0;i<championshipCountArray.length;i++)
{ 

console.debug(xScale(championshipCountArray[i]) + " " +xScale(32));

var img = logoG.append("svg:image")
    .attr("xlink:href", logoArray[i])
	.attr("id", i)
	.attr("class", championshipCountArray[i])
    .attr("width", (initialLogoSize+(3*championshipCountArray[i])))
    .attr("height", (initialLogoSize+(3*championshipCountArray[i])))
    .attr("x",xScale(championshipCountArray[i]))
    .attr("y", function()
	
	    {
			if (currentValue == championshipCountArray[i])
			{
				sameCount++;
				
			}
			else
			{
				currentValue = championshipCountArray[i];
				sameCount= 0;
			}
			
			if (sameCount == 0)
			{
				return (height/2-(initialLogoSize+(1.7*championshipCountArray[i])));
			}
			else if (sameCount%2 == 0)
			{
				return (height/2-(sameCount/2+1)*(initialLogoSize+(3*championshipCountArray[i])));
			}
			else
			{
				if (lastHeight < (height/2+(((sameCount+1)/2)-1)*(initialLogoSize+(3*championshipCountArray[i]))))
				{
					lastHeight = (height/2+(((sameCount+1)/2)-1)*(initialLogoSize+(3*championshipCountArray[i])));
				}
				
				return (height/2+(((sameCount+1)/2)-1)*(initialLogoSize+(3*championshipCountArray[i])));
			
			}
		/*	
			console.debug(sameCount +" other in this column, drawing i "+championshipCountArray[i]+" at y "+ initialLogoSize*i);
			lastHeight = (initialLogoSize*i);
			if (((initialLogoSize*i)+initialLogoSize) < height) 
				{ return (initialLogoSize*i); }
			else 
				{ isFullHeight = true; return (height+300-(initialLogoSize*i));}
				

				
				*/ 
		});
		
}
	//	console.debug("height of last element"+ lastHeight +" and isFullHeight "+isFullHeight )
		
		
		if (!isFullHeight)
		{
			svg.attr("height", lastHeight);
		console.debug("height "+height +"     -lastHeight " +lastHeight);
			logoG.attr("transform", "translate(5,-"+(Math.abs((height-lastHeight)/2-20)+")"));
			
			

		}
			svg.append("text")
    .attr("id", "xlabel")
    .attr("class", "xlabel")
    .attr("text-anchor", "end")
	.style("stroke","none")
	.style("font-family","sans-serif")
    .attr("x", width )
    .attr("y", svg.attr("height") - 6)
    .text(capture);
			
	

$('svg image').tipsy({ 
	gravity: 'w', 
	html: true, 
	title: function() {
	console.debug(this.getAttribute("class"));
	  return labelArray[this.getAttribute("id")] +  ' won '+this.getAttribute("class") +' championships.'; 
	}
});

}
