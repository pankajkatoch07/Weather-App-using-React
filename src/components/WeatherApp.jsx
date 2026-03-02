import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

function WeatherApp() {
    const [weather,setWeather] = useState({
        city :"Delhi",
        feelsLike: 24.25,
        humidity: 17,
        temp: 25.23,
        tempMax: 25.23,
        tempMin: 25.23,
        weather: "clear sky"
    });

    let updateInfo = (newInfo) => {
        setWeather(newInfo);
    }

    return (
        <div className="">
            <h1>Weather App by Pankaj Katoch</h1>
            <SearchBox updateInfo = {updateInfo}/>
            <InfoBox info={weather}/>
        </div>
    );
}

export default WeatherApp;