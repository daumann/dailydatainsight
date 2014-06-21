d3.tsv('../articleArchiv/quotes.csv', function (error, allQuotes) {

    document.getElementById("quotes").innerHTML = allQuotes[Math.round((Math.random() * (allQuotes.length-1)))].Quote.replace(/&x22;/g, '"');

});