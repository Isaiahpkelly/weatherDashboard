let APIKey = "77417aa24fadab3e60f395a7c325d366";
let currentDate = moment().format('l');
let day1 = moment().add(1, 'days').format('l');
let day2 = moment().add(2, 'days').format('l');
let day3 = moment().add(3, 'days').format('l');
let day4 = moment().add(4, 'days').format('l');
let day5 = moment().add(5, 'days').format('l');
let clearSky = "clear sky";
let cityElement = document.querySelector(".city");
let tempElement = document.querySelector(".temp");
let humidityElement = document.querySelector(".humidity");
let windElement = document.querySelector(".wind");
let uvIndexElement = document.querySelector(".uvIndex");
let srchBtn = $(".searchBtn");
let userInput = $(".z-input").text;
let currentLocation = [];

if(`geolocation` in navigator){
  navigator.geolocation.getCurrentPosition( setPosition, showError);
}else{
alert("Browser Doesn't support Geolocation");
}

function setPosition(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  
}
$(document).ready(function(){
  displayBlocks()
  let savelocation = localStorage.getItem("zinput")
  $("#btn-1").val(savelocation)
})


  let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,us&units=imperial&appid=" + APIKey;
  
  
  $.ajax({
    url: queryURL,
    method: "GET"
  })
  
  .then(function(response) {
    let obj = response
    
    let userLongitude = response.coord.lon;
    let userLattitude = response.coord.lat;
    console.log(userLattitude); 
    console.log(userLongitude);
            console.log(obj);
            console.log(response.weather[0].description);
            console.log(response.weather[0].icon);
            
            $(".weather-icon2").html= `<img src="icons/${response.weather[0].icon}.png"/>`
            $(".city").text(response.name + " (" + currentDate + ")");
            $(".wind").text("Wind Speed: " +  response.wind.speed);
            $(".humidity").text("Humidity: " + response.main.humidity);
            $(".temp").text("Temperature: " + Math.floor(response.main.temp) + " °F");
            
            
      
            
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            
          });
function showError(error){
  alert("Browser Doesn't support Geolocation");
}

let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta&units=imperial&appid=" + APIKey;
   
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          console.log(response.list[0].main.temp);
          
          $(".date1").text(day1);
          $(".temp1").text("Temp: " +  Math.floor(response.list[2].main.temp) + " °F");
          $(".humidity1").text("Hum: " + response.list[2].main.humidity + "%");

          $(".date2").text(day2);
          $(".temp2").text("Temp: " +  Math.floor(response.list[10].main.temp) + " °F");
          $(".humidity2").text("Hum: " + response.list[10].main.humidity + "%");
          
          $(".date3").text(day3);
          $(".temp3").text("Temp: " +  Math.floor(response.list[18].main.temp) + " °F");
          $(".humidity3").text("Hum: " + response.list[18].main.humidity + "%");
          
          $(".date4").text(day4);
          $(".temp4").text("Temp: " +  Math.floor(response.list[26].main.temp) + " °F");
          $(".humidity4").text("Hum: " + response.list[26].main.humidity + "%");
          
          $(".date5").text(day5);
          $(".temp5").text("Temp: " +  Math.floor(response.list[34].main.temp) + " °F");
          $(".humidity5").text("Hum: " + response.list[34].main.humidity + "%");
          
        
      });

      let queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=" + APIKey;
   
      $.ajax({
        url: queryURL3,
        method: "GET"
      }).then(function(response) {
          console.log(response);
          
          $(".uvIndex").text("UV Index: " + response.value);  

          
        
      });

      $("#search-Btn").on("click", function(event) {
        
        event.preventDefault();
          
        let storeLocation = $(".z-input").val().trim();
        currentLocation.push(storeLocation);
        var value = $(this).siblings('.z-input').val();
        var id = $(this).siblings('.z-input').attr('id');
        localStorage.setItem(id, value)
        renderButtons();
            console.log(storeLocation);
      });

      function alertMovieName() {
        var locationName = $(this).attr("data-name");

        alert(locationName);
      }
      
      function renderButtons() {

        
        $("#buttons-view").empty();
        

        
      }
      function show(){
        let locationToShow = localStorage.getItem('data');
        $('.locationStored').append(locationToShow);
        
        console.log(locationToShow);
    }

    function displayBlocks() {

      for (var i = 0; i < currentLocation.length; i++) {

         
        let a = $("<button>").css({ width: '100%', 'padding-top': '10px', 'padding-bottom': '10px' });
        a.addClass("locationStored");
        a.attr("data-name", currentLocation[i]);
        a.text(currentLocation[i]);
        $("#btnGroupVertical").append(a);
      }
    }


