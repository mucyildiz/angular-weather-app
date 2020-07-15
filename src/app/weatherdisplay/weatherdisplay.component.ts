import { Component, OnInit } from '@angular/core';
// key: 4d7ae3fa13615ebb6343600dbc80e952
// call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
@Component({
  selector: 'app-weatherdisplay',
  templateUrl: './weatherdisplay.component.html',
  styleUrls: ['./weatherdisplay.component.css']
})
export class WeatherdisplayComponent implements OnInit {
  tempInFarenheit = true;
  searchedCity = '';
  weatherData: object;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDegrees(): void{
    if (this.tempInFarenheit === true) {
      this.tempInFarenheit = false;
    }
    else {
      this.tempInFarenheit = true;
    }
    console.log(this.tempInFarenheit);
  }

  async getCityWeather(): Promise<any>{
    console.log(this.searchedCity);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchedCity}&units=imperial&appid=4d7ae3fa13615ebb6343600dbc80e952`;
    try{
      const response = await fetch(url, {mode: 'cors'});
      const weatherData = await response.json();
      console.log(weatherData);
      const weatherDescription = weatherData.weather[0].main;

      const gifUrl = `https://api.giphy.com/v1/gifs/translate?api_key=1rWPIu8eWuuDUxz5BIeJh0BnEGjCTHsy&s=${weatherDescription}`;
      const gifResponse = await fetch(gifUrl, {mode: 'cors'});
      const gifData = await gifResponse.json();
      const gif = gifData.data.images.original.url;

      const date = new Date();
      console.log(typeof(weatherData));
      const cityWeather = {
        cityName: weatherData.name,
        temp: {
          currTemp: weatherData.main.temp,
          celsiusTemp: Number(this.farenheitToCelsius(weatherData.main.temp).toFixed(2)),
          feelsLike: weatherData.main.feels_like,
          celsiusFeelsLike: Number(this.farenheitToCelsius(weatherData.main.feels_like).toFixed(2))
        },
        dayAndTime: {
          day: this.dayOfWeekAsString(date.getDay()),
          time: date.getHours() + ':' + date.getMinutes()
        },
        weather: {
          desc: weatherData.weather[0].description,
          mainDesc: weatherData.weather[0].main
        },
        wind: {
          windSpeed: weatherData.wind.speed,
        },
        weatherGif: gif,
      };
      console.log(cityWeather);
      this.weatherData = cityWeather;
    }
    catch (err){
      alert('City not found.');
    }

  }

  dayOfWeekAsString(dayIndex: number): string {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDays[dayIndex];
  }

  farenheitToCelsius(farenheit: number): number {
    return ((farenheit - 32) * 5 / 9);
  }
}
