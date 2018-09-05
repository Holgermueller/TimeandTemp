$(document).ready(() => {

	const APIKey = '94d5b3ebbc302231ae85460cfe0af984';

	navigator.geolocation ?
		navigator.geolocation.getCurrentPosition(showPosition) :
		console.log('not supported');

	function showPosition(position) {
		const Lat = position.coords.latitude;
		const Long = position.coords.longitude;


		let url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + Lat + '&lon=' + Long + '&APPID=' + APIKey;

		$.ajax({
			url: url,
			method: 'GET',
			success: data => {
				console.log(data);
				$('#currentLocation').append(`<h3>${data.name}</h3>`);
				// convert temps from kelvin:
				let K = parseFloat(data.main.temp);
				let kToF = (((K - 273.15) * 1.8) + 32);
				let F = Math.round(kToF);
				let kToC = K - 273.15;
				let C = Math.round(kToC)
				$('#currentWeather').append(`<div>Temp: ${F}  F / ${C}  C</div>`)
					.append(`<div>${data.weather[0].main}</div>`)
					.append(`<h5>${data.weather[0].description}</h5>`)
					.append(`<div>Humidity: ${data.main.humidity} %</div>`);

			}
		});
	}
});

// get weather for that specific time an place

// display weather