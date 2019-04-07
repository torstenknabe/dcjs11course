/*
- Review the API documentation at https://openweathermap.org/current
- User either $.ajax or $.get to pull weather current data .
  for Washington DC (hint: http://api.openweathermap.org/data/2.5/weather?q=...).
- Print the temperature in console.
- Update the UI so that the temperature gets rendered
- Use the form elements to let the user select their own city and country

*/
(function () {
  let weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&q='
  let apiKey = '62d89c97aada83d1378c49b38d1d07e4'

  let $location = $("#location")
  let $temp = $("#temp")
  let $getTempButton = $("#getTemp")
  let $cityField = $("#city")
  let $countryField = $("#country")


  function getWeather (city, country){
    // AJAX Logic Here. This should call updateUiSuccess on a succesfull call,
    // and updateUIError on an error.
  }

  function updateUiSuccess (temp, city, country){
    // update UI Logic Here
  }

  function updateUIError () {
    alert('There was an error getting weather data :(')
  }
})()
