//javascript.js
//configura as opções do mapa
var myLatLng = { lat: -16.33449314667986, lng: -48.95285475100337 };
var mapOptions = {
    center: myLatLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

//cria mapa
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//cria um objeto DirectionsService para usar o método de rota e obter um resultado para nossa solicitação
var directionsService = new google.maps.DirectionsService();

//cria um objeto DirectionsRenderer que usaremos para exibir a rota
var directionsDisplay = new google.maps.DirectionsRenderer();

//vincula o DirectionsRenderer ao mapa
directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById('panel'));


// define a função calcRoute
function calcRoute() {
    //cria pedido
    var request = {
        origin: document.getElementById("De").value,
        destination: document.getElementById("Para").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

//passa a requisição para o método de rota
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Pega distância e tempo
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>De: " + document.getElementById("De").value + ".<br />Para: " + document.getElementById("Para").value + ".<br /> Distância <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duração <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //exibe rota
            directionsDisplay.setDirections(result);
        } else {
            //deleta rota do mapa
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //Mostra a mensagem de erro
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}



//cria objetos autocomplete para todas as entradas
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("De");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("Para");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
