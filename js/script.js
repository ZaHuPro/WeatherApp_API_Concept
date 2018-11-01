$(document).ready(function(){

    var iPhoto  = 0;
    var inputCondition = true;
    var PhotoData = "";
    var API_Photo_Search = "world";
    const API_KEY_Weather = "7055fb803fe7eb7c53fc379c91c64dba";
    const API_KEY_Photo = "0f388edfe071bf3cfc4a630b874423d26ce35ca3c41da8975098ce049bf2961b";
   

    LoadPhotoData("Chennai");

    $('#pincodeCheck').on('change', function() { 
        // From the other examples
        if(this.checked) // if changed state is "CHECKED"
        {
            $("#inputTitle").html("pincode");
            $("#inputForm").html("<div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>Pincode</label><div class='col-sm'><input type='text' class='form-control' id='inputPincode' placeholder='PinCode...'></div></div><div class='form-group row'></div>");
            inputCondition = false;

        }else{
            $("#inputTitle").html("city | country")
            $("#inputForm").html("<div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>City</label><div class='col-sm'><input type='text' class='form-control' id='inputCity' placeholder='City Name...'></div></div><div class='form-group row'><label for='inputLable' class='col-sm-3 col-form-label'>Country</label><div class='col-sm'><input type='text' class='form-control' id='inputCountry' placeholder='Country Name...'></div></div>");
            inputCondition = true;
        }
    });


    $("#formbtn").on("click", function(){
        var SearchFor = $("#inputCity").val();
        LoadPhotoData(SearchFor);

    });



    function LoadPhotoData(SearchKey){
        var Link = "https://api.unsplash.com/search/photos?page=1&query=" + SearchKey + "&&client_id=" + API_KEY_Photo

        
        $.getJSON( Link, function( data ) {
            setBackgroundImage(data.results[5].urls.regular);
            console.log(data.results[0].urls.regular)
        });
    };

     function setBackgroundImage (URL){
        $("#mainBox").css('background-image',"url("+URL+")");
     }

});
















    // setInterval(function(){ 
    //     var currentPicLink = PhotoData.results[iPhoto].urls.regular;
       
    //     iPhoto++;
    //     if (iPhoto >= 10){
    //         iPhoto = 0
    //     }
    //  }, 3000);