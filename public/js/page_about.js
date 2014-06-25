d3.tsv('../articleArchiv/quotes.csv', function (error, allQuotes) {

    document.getElementById("quotes").innerHTML = allQuotes[Math.round((Math.random() * (allQuotes.length-1)))].Quote.replace(/&x22;/g, '"');

});

function sendEmail(){

    console.log("trying to send an email")
    $.post('/sendEmail/' + document.getElementById('emailSender').value + '/'+document.getElementById('emailContent').value, function (res) {
console.debug(res);        
    });   
}
