import { Component, DoCheck, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../src/config';
@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.css']
})
export class WeatherDashboardComponent implements OnInit ,DoCheck{
  weatherData: any;
  apiUrl!: string;
  previousWeatherData: any;

  //locations
  locations: string[] = ['Kolkata'];
  currentLocationIndex: number = 0;
  defaultLocation: string = 'Kolkata';
 newLocation: string = '';


  temperatureUnit:string="metric"
  dateTime!: string;

  constructor(private http:HttpClient){}
  ngOnInit(): void {
      this.FetchWeatherData()
    this.updateDateTime();
  }


  addLocation() {
    if (this.newLocation.trim() !== '') {
      this.locations.push(this.newLocation.trim());
      this.currentLocationIndex = this.locations.length - 1;
      this.newLocation = ''; // Clear the input field after adding the location
      this.updateWeather();
    }
  }

  ngDoCheck(){
    console.log("do check");
    
  }

  ngAfterViewInit() {
    console.log('View initialized!');
  }

  ngOnDestroy() {
    console.log('Component destroyed!');
  }


  updateWeather(){
    this.FetchWeatherData()

  }

  updatetemperatureUnit(){
    console.log(this.temperatureUnit);
    this.updateWeather()
    
  }

  private updateDateTime() {
    
    setInterval(() => {
      const currentDate = new Date();
      this.dateTime = currentDate.toLocaleString();
    }, 1000);
  }

  switchLocation(index: number) {
    this.currentLocationIndex = index;
    this.updateWeather();
  }

  private FetchWeatherData(){
    const apiKey = environment.apiKey;
    const selectedLocation = this.locations[this.currentLocationIndex]; //new

    // this.apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${this.defaultLocation}&APPID=${apiKey}&units=${this.temperatureUnit}`
     this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedLocation}&APPID=${apiKey}&units=${this.temperatureUnit}`; //new
    this.http.get(this.apiUrl)
    .subscribe((data:any)=>{
        this.weatherData=data
        console.log(this.weatherData);
        this.previousWeatherData=this.weatherData
    })
  }

}
