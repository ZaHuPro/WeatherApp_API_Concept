$(document).ready(function(){

    var preload = new createjs.LoadQueue();
    var iPhoto  = 0;
    var PhotoArray = new Array;
    var inputCondition = true;

    var API_Photo_Search = "Earth";
    const API_KEY_Weather = "7055fb803fe7eb7c53fc379c91c64dba";
    const API_KEY_Photo = "0f388edfe071bf3cfc4a630b874423d26ce35ca3c41da8975098ce049bf2961b";
   
    var CheckMe = false;
    $('#pincodeCheck').prop('checked', false);
    LoadPhotoData(API_Photo_Search);

    $('#pincodeCheck').on('change', function() { 
        // From the other examples
        if(this.checked) // if changed state is "CHECKED"
        {
            CheckMe = true;
            $("#inputTitle").html("pin | country");
            $("#inputForm").html("<div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>Pincode</label><div class='col-sm'><input type='text' class='form-control' id='inputPincode' placeholder='PinCode...'></div></div><div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>Country</label><div class='col-sm'><input type='text' class='form-control' id='inputCountry' placeholder='Country Code(in, uk..)'></div></div>");
            inputCondition = false;

        }else{
            CheckMe = false;
            $("#inputTitle").html("city | country")
            $("#inputForm").html("<div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>City</label><div class='col-sm'><input type='text' class='form-control' id='inputCity' placeholder='City Name...'></div></div><div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>Country</label><div class='col-sm'><input type='text' class='form-control' id='inputCountry' placeholder='Country Name...'></div></div>");
            inputCondition = true;
        }
    });

    var WeatherLink ;
    $("#formbtn").on("click", function(){

        var Loading  = "<div class='row align-items-center justify-content-center'><div class=' loader loader-white'></div>";
        $("#result").html(Loading);

        if (CheckMe == true) {
            WeatherLink = "https://api.openweathermap.org/data/2.5/weather?zip=" + $("#inputPincode").val()+ "," +$("#inputCountry").val() + "&appid=" + API_KEY_Weather
            
        }else{
        
            WeatherLink = "https://api.openweathermap.org/data/2.5/weather?q=" + $("#inputCity").val() + "," +$("#inputCountry").val() + "&appid=" + API_KEY_Weather
        }
        LoadWeatherData(WeatherLink);
              
    });


    function LoadWeatherData(WeatherGetLink){

        $.ajax({
            type: 'GET',
            dataType: "json",
            url: WeatherGetLink,
            success: function (responseData, textStatus, jqXHR) {
            var Temperature = responseData.main.temp - 273.15;
            var TemperatureMin = responseData.main.temp_min - 273.15;
            var TemperatureMax = responseData.main.temp_max - 273.15;
            var HTMLData = "<h2>" + responseData.name + "</h2><p>"+ responseData.weather[0].description +"</p><div class='table-responsive text-nowrap'><table class='table'><tr><th>Temperature</th><td>" + Temperature.toFixed(2) +" C</td><th>Short Note</th><td>"+responseData.weather[0].main +"</td></tr><tr><th>Min Temp</th><td>"+ TemperatureMin.toFixed(2) +"</td><th>Max Temp</th><td>"+ TemperatureMax.toFixed(2) +"</td></tr><tr><th>Pressure</th><td>" + responseData.main.pressure + "</td><th>Humidity</th><td>"+ responseData.main.humidity +"</td></tr><tr><th>Wind Speed</th><td>"+ responseData.wind.speed +" m/s</td><th>Wind Degree</th><td>" + responseData.wind.deg.toFixed(2) +"</td> </tr> </table> </div> ";
            console.log(HTMLData);
            $("#result").html(HTMLData);
            API_Photo_Search = responseData.weather[0].main;
            LoadPhotoData(API_Photo_Search);

        },
            error: function (responseData, textStatus, errorThrown) {
               var ErrorText = "<h3>Error on Input</h3><p>Unknown input from you, filled corret requirements</p><p>For City :: (Chennai, India)</p><p>For Pin :: (Chennai, In)</p><p>Note: For Pincode mode Full Country Name will not be Accepted, Insert Country Code</p>";
               $("#result").html(ErrorText);
            }
        });
    };



    function LoadPhotoData(SearchKey){
        var Link = "https://api.unsplash.com/search/photos?page=1&query=" + SearchKey + "&&client_id=" + API_KEY_Photo

        $.getJSON( Link, function( data ) {
            PhotoArray = [];
            for(var i=0;i<=9;i++){
                PhotoArray.push(data.results[i].urls.regular)
            }
            ChangeBackGround(PhotoArray[0]);
            iPhoto = 1;

        });
    };

    setInterval(function(){ 
        ChangeBackGround(PhotoArray[iPhoto]);
        iPhoto++;        
        if (iPhoto >= 10){
            iPhoto = 0
        }
        loadImage(PhotoArray[iPhoto]);
     }, 6000);     

    function loadImage(SRC) {
        preload.loadFile(SRC);
    }
  
  
    function ChangeBackGround(URL){
        $("#mainBox").css('background-image', 'url(' + URL + ')');
    }
    
});
















