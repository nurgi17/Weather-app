import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const WEATHER_API_KEY = "53fe700b839c7cee947f39c887c4babc";
class App extends React.Component {

  //State for getting info from json
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }


  //Async method
  gettingWeather = async (e) => {
    e.preventDefault();// For preventing update the page
    let city = e.target.elements.city.value;// get value from text form
    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`);//to get json format from Weather API
      const data = await api_url.json();// converting to json

      //Converting time in numbers to clock format
      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      ////Converting time in numbers to clock format END

      // Add zero 
      let seconds;
      if (date.getSeconds() <= 9) {
        seconds = "0" + date.getSeconds();
      }
      // Add zero END 

      let sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + seconds;// Variable for get clock format

      let temp = Math.round(data.main.temp - 273.15);// Converting from Kelvins to Celsius


      this.setState({//Set to the state values from data.json
        temp: temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } else {// For preventing error with no text in form
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Please enter the city!!!"
      });
    }

  }

  //Render method return html with components&parameters to index.html
  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
                <Form weatherMethod={this.gettingWeather} />
                <Weather
                  temp={this.state.temp}
                  city={this.state.city}
                  country={this.state.country}
                  pressure={this.state.pressure}
                  sunset={this.state.sunset}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;