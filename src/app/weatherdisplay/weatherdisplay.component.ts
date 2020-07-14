import { Component, OnInit } from '@angular/core';
// key: 4d7ae3fa13615ebb6343600dbc80e952
// call: api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
@Component({
  selector: 'app-weatherdisplay',
  templateUrl: './weatherdisplay.component.html',
  styleUrls: ['./weatherdisplay.component.css']
})
export class WeatherdisplayComponent implements OnInit {
  searchedCity = '';
  weatherData: object;

  constructor() { }

  ngOnInit(): void {
  }

  async getCityWeather(): Promise<any>{
    console.log(this.searchedCity);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.searchedCity}&units=imperial&appid=4d7ae3fa13615ebb6343600dbc80e952`;
    try{
      const response = await fetch(url, {mode: 'cors'});
      const weatherData = await response.json();
      const date = new Date();
      console.log(typeof(weatherData));
      const cityWeather = {
        cityName: weatherData.name,
        temp: {
          currTemp: weatherData.main.temp,
          feelsLike: weatherData.main.feels_like
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
        }
      };
      console.log(cityWeather);
      this.weatherData = cityWeather;
    }
    catch (err){
      console.log(err);
    }

  }

  dayOfWeekAsString(dayIndex: number): string {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDays[dayIndex];
  }
}
