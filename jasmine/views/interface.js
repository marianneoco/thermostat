$(document).ready(function(){
  var thermostat = new Thermostat();
  $('#power-saving').text("on");
  updateTempAndDisplay();
  getWeatherStatus(
    $('#city').val()
  );

  function getWeatherStatus(city){
    $.get("https://api.weatherbit.io/v2.0/current?key=396a74755ade41ecb83d23bb3011222e&city=" + city, function(response){
      $('#city-temp').text(response.data[0].temp);
    }
  )}

  function updateTempAndDisplay(){
    $('#temperature').text(thermostat.temperature);
    updateDisplay();
  }

  function updateDisplay(){
    usage = thermostat.energyUsageCheck();
    $('#temperature').attr('class', usage)
  }

  $('#temperature-up').click(function(){
    thermostat.up();
    updateTempAndDisplay();
  })

  $('#temperature-down').click(function(){
    thermostat.down();
    updateTempAndDisplay();
  })

  $('#reset').click(function(){
    thermostat.reset();
    updateTempAndDisplay();
  })

  $('#power-saving-off').click(function(){
    thermostat.powerSavingOff();
    $('#power-saving').text("off");
  })

  $('#power-saving-on').click(function(){
    thermostat.powerSavingOn();
    $('#power-saving').text("on");
  })

  $('#city').change(function(){
    $('#city-temp').text(getWeatherStatus($('#city').val()));
  })

})
