// Obtener la API KEY desde un fichero externo
import {appid} from "./apikey.js"

// Obtener los datos del formulario
const formMeteo = document.forms["formMeteo"]

formMeteo.addEventListener("submit", (evento) => {
    evento.preventDefault()

    let cityName = formMeteo['inputCiudad'].value.trim() 
    let countryCode = formMeteo['inputPais'].value.trim()
    let langCode = formMeteo['inputIdioma'].value

    let URL = "https://api.openweathermap.org/data/2.5/weather?"
    URL += "q=" + cityName
    if (countryCode.length > 0) {
        URL += "," + countryCode
    }
    URL += "&units=metric&lang=" + langCode 
    URL += "&appid=" + appid

    fetch(URL)
    .then(data => data.json())
    .then(data => {
        const description = data['weather'][0]['description'];
        const icon = data['weather'][0]['icon'];
        const temp = data['main']['temp'].toFixed(0)
        const feels_like = data['main']['feels_like'].toFixed(0)
        const temp_min = data['main']['temp_min'].toFixed(0)
        const temp_max = data['main']['temp_max'].toFixed(0)
        const humidity = data['main']['humidity']

        document.getElementById("temp").textContent = temp
        document.getElementById("icon").innerHTML = `<img src="https://www.imelcf.gob.pa/wp-content/plugins/location-weather/assets/images/icons/weather-icons/${icon}.svg" alt="${description}">`

    }).catch(
        error => console.error(error)
    )


})