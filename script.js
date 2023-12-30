var res = fetch("https://restcountries.com/v2/all");

res.then((data) => data.json()).then((data1) => {
    var container = document.createElement('div');
    container.className = 'container';

    var row; 

    for (var i = 0; i < data1.length; i++) {
        if (i % 3 === 0) {

            row = document.createElement('div');
            row.className = 'row';
            container.appendChild(row);
        }

        var col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `<div class="card custom-card" style="width: 18rem;">
            <h5 class="card-title" style="background-color:slategrey">${data1[i].name}</h5>
            <img src="${data1[i].flag}" class="card-img-top" alt="flags" style="height: 150px;"> <!-- Set a fixed height -->
            <div class="card-body">
                <h5 class="card-title">Capital: ${data1[i].capital}</h5>
                <h5 class="card-title">Region: ${data1[i].region}</h5>
                <h5 class="card-title">Country Code: ${data1[i].alpha2Code}</h5>
                <button type="button" class="btn btn-secondary" onclick="getWeather('${data1[i].capital}')">Get Weather</button>
            </div>
        </div>`;


        row.appendChild(col);
    }

    document.body.append(container);
});

function getWeather(city) {

    var apiKey = '7ad2f3b50e4340c6fd10e2312f8fd250';
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then((response) => response.json())
        .then((weatherData) => {

            showWeatherPopup(city, weatherData);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
        });
}

function showWeatherPopup(city, weatherData) {

    var popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';


    var popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.innerHTML = `
        <h2>${city} Weather</h2>
        <p>Temperature: ${weatherData.main.temp} K</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
        <p>Humidity: ${weatherData.main.humidity}%</p>
        <p>latitude: ${weatherData.coord.lon}</p>
        <p>longitude: ${weatherData.coord.lat}</p>
    `;


    popupContainer.appendChild(popupContent);


    document.body.appendChild(popupContainer);

    popupContainer.addEventListener('click', function (event) {
        if (event.target === popupContainer) {
            document.body.removeChild(popupContainer);
        }
    });
}
