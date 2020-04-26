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
let userInput = document.getElementById('zinput').value;
let currentLocation = [];

let lastInput = JSON.parse(localStorage.getItem('cityName'));
let userLon = [];
let userLat = [];
let searchLon = [];
let searchLat = [];


if(`geolocation` in navigator){
  navigator.geolocation.getCurrentPosition( setPosition, showError, work);
  
}else{
alert("Browser Doesn't support Geolocation");
}


                
  

function setPosition(position){
  let latitude = position.coords.latitude.toFixed(2);
  let longitude = position.coords.longitude.toFixed(2);

  userLon.push(longitude);
  userLat.push(latitude);
 console.log("lon", userLon);
 console.log("lat", userLat);
 
 work();
 renderButtons();

}

function showError(error){
  alert("Browser Doesn't support Geolocation");
}

$('.searchBtn').on('click', function(){
  let userInput = document.getElementById('zinput').value; 
  currentLocation.push(userInput);
  localStorage.setItem('user', JSON.stringify(currentLocation));
  
  console.log(currentLocation);
  
  console.log(userInput);
  weatherCards();
  jumbotron();
  uvIndex();
  show();
  
  
})


function weatherCards(){
  let userInput = document.getElementById('zinput').value;
 
  
 
let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + ",us&units=imperial&appid=" + APIKey;
   
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response) {

  
        
          console.log(response);
          console.log(response.city.coord);
          console.log(response.list[0].main.temp);
          
          $(".date1").text(day1);
          $(".temp1").text("Temp: " +  Math.floor(response.list[8].main.temp) + " °F");
          $(".humidity1").text("Hum: " + response.list[8].main.humidity + "%");

          $(".date2").text(day2);
          $(".temp2").text("Temp: " +  Math.floor(response.list[16].main.temp) + " °F");
          $(".humidity2").text("Hum: " + response.list[16].main.humidity + "%");
          
          $(".date3").text(day3);
          $(".temp3").text("Temp: " +  Math.floor(response.list[24].main.temp) + " °F");
          $(".humidity3").text("Hum: " + response.list[24].main.humidity + "%");
          
          $(".date4").text(day4);
          $(".temp4").text("Temp: " +  Math.floor(response.list[32].main.temp) + " °F");
          $(".humidity4").text("Hum: " + response.list[32].main.humidity + "%");
          
          $(".date5").text(day5);
          $(".temp5").text("Temp: " +  Math.floor(response.list[39].main.temp) + " °F");
          $(".humidity5").text("Hum: " + response.list[39].main.humidity + "%");
          
          let latitude = response.city.coord.lat.toFixed(2);
          let longitude = response.city.coord.lon.toFixed(2);
    
        
          searchLon.push(longitude);
          searchLat.push(latitude);
         console.log("lon", searchLon);
         console.log("lat", searchLat);
        uvIndex();
      });
    }

    function jumbotron(){
      let userInput = document.getElementById('zinput').value;
      let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + ",us&units=imperial&appid=" + APIKey;
      
      
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      
      .then(function(response) {
        let obj = response
        
                console.log(obj);
                console.log(response.weather[0].description);
                console.log(response.weather[0].icon);
                
              
                $(".city").text(response.name + " (" + currentDate + ")");
                $(".wind").text("Wind Speed: " +  response.wind.speed + " MPH");
                $(".humidity").text("Humidity: " + response.main.humidity);
                $(".temp").text("Temperature: " + Math.floor(response.main.temp) + " °F");
                
                
          
                
                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                
              });

            }

                function uvIndex(){ 
                  
                  let queryURL3 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + searchLat + "&lon=" + searchLon+ "&appid=" + APIKey;
             
                $.ajax({
                  url: queryURL3,
                  method: "GET"
                }).then(function(response) {
                    console.log(response);
          
                    let a = $("<button>");
          
                    a.addClass("uvIndexBtn");
                    
                    a.text("UV Index: " + response.value); 
                    $(".uvIndex").append(a);
          
                    $(".uvIndex").text("UV Index: " + response.value);  
          
                    console.log(latitude);
                  
                });

              }

            

              function work(){
                
                let queryURL9 = "https://api.openweathermap.org/data/2.5/weather?lat=" + userLat + "&lon=" + userLon + "&appid=" + APIKey;
                
                
                $.ajax({
                  url: queryURL9,
                  method: "GET"
                })
                
                .then(function(response) {
                  let obj = response
                  
                  let userLongitude = response.coord.lon;
                  let userLattitude = response.coord.lat;
                  console.log(userLattitude); 
                  console.log(userLongitude);
                  console.log()
                          console.log(obj);
                          console.log(response.weather[0].description);
                          console.log(response.weather[0].icon);
                          
                        
                          $(".city").text(response.name + " (" + currentDate + ")");
                          $(".wind").text("Wind Speed: " +  response.wind.speed + " MPH");
                          $(".humidity").text("Humidity: " + response.main.humidity);
                          $(".temp").text("Temperature: " + Math.floor(response.main.temp) + " °F");

                          
                          
                          
                    
                          
                          console.log("Wind Speed: " + response.wind.speed);
                          console.log("Humidity: " + response.main.humidity);
                          
                        });
                      }

      let neededInfo = [];

      function show(){
        let plzWork = currentLocation.toString();
        let locationToShow = localStorage.getItem('user');
        $(neededInfo).append(locationToShow);

        for (var i = 0; i < currentLocation.length; i++) {
         
         
          let a = $("<button>").css({ width: '100%', 'padding-top': '10px', 'padding-bottom': '10px', 'margin': '4px'  });
          
          a.text(currentLocation[i]);
          
          a.attr("data-name", currentLocation);
          $("#btnGroupVertical").append(a);
        }


        $('.locationStored').append(locationToShow);
        console.log(locationToShow);
        console.log(currentLocation);
        console.log(plzWork);

    }

       
    function renderButtons() {
      let lastInput = JSON.parse(localStorage.getItem('user'));
      let lastEntered = localStorage.getItem('user');
        
        
      for (var i = 0; i < lastInput.length; i++) {

       
        let a = $("<button>").css({ width: '100%', 'padding-top': '10px', 'padding-bottom': '10px', 'margin': '4px' });
       
        
        a.text(lastInput[i]);
        $("#btnGroupVertical").append(a);


      }
      console.log(lastInput);
      console.log(lastEntered);
    }

    $('.btngroup-vertical').on('click', function(){
      if(userInput===""){
        
        document.getElementById("zinput").value = document.getElementById("btnGroupVertical").innerText;
      }else{
        alert('theres a value');
      }
  weatherCards();
  jumbotron();
  uvIndex();
      
    })

                      

              