/**
 * Created by Julie Alary on 29/03/2017.
 */


/**
 * Created by juliealary on 22/03/2017.
 */

document.addEventListener("DOMContentLoaded", function(event) {
    if (location.protocol != 'https:')				{
        location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
});



jQuery(document).ready(function($) {
    var maLatitude;
    var maLongitude;

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(showPosition);
    else
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
});

function showPosition(position){
    maLatitude= position.coords.latitude;
    maLongitude= position.coords.longitude;
    getMeteo();
}
function getMeteo(){
    $.ajax({
        url : "https://api.wunderground.com/api/36c9580e6bfe9c49/geolookup/conditions/lang:FC/q/"+maLatitude+","+maLongitude+".json",
        dataType : "jsonp",
        success : function(parsed_json) {
            var location = parsed_json['location']['city'];
            var temp_c = parsed_json['current_observation']['temp_c'] + "°C";
            var temp_f = parsed_json['current_observation']['temp_f'] + "°F";
            var uneimage = parsed_json['current_observation']['icon_url'];
            var untitle = parsed_json['current_observation']['icon'];
            var directionVent = parsed_json['current_observation']['wind_dir'];
            var vitesseVent= parsed_json['current_observation']['wind_kph']+ " km/h";
            var weather = parsed_json['current_observation']['weather'];
            var tempRessentie = parsed_json['current_observation']['feelslike_c'] + "°C";
            var visibilityKM = parsed_json['current_observation']['visibility_km'] + " km";


            $("body").append("" +
                "<div class='row'>" +
                "<div class='currentPosition col-md-6 col-md-offset-3 col-xs-8 col-xs-offset-2 col-lg-6 col-lg-offset-3 text-center'>" +
                "<h2>" + location + "</h2><hr> " +
                "<div style='margin-top:13px;'> " +
                "<h3><i class='fa fa-thermometer-three-quarters' aria-hidden='true'></i>&nbsp;&nbsp;" + temp_c + "</h3>" +
                "<img height='80px' width='80px' src='"+uneimage+"' alt='"+untitle+"' title='"+weather+"'/>" +
                "<h4>"+weather+"</h4>" +
                "<br />" +
                "<div class='col-md-6'><h5>Température ressentie</h5" +
                "><p>"+tempRessentie+"</p>" +
                "<h5>Visibilité</h5>" +
                "<p>"+visibilityKM+"</p></div>" +
                "<div class='col-md-6'><h5>Direction du vent</h5>" +
                "<p>"+directionVent+"</p>" +
                "<h5>Vitesse du vent</h5>" +
                "<p>"+vitesseVent+"</p></div>" +
                "</div>" +
                "</div>" +
                "<h3>Application météo développée avec l'API 'Weather Underground' et JQuery</h3>");

        }
    });
}




