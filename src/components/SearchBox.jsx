import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../static/SearchBox.css';
import { useState, useEffect } from 'react';

function SearchBox({ updateInfo }) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "bd0b3486e2ca859ea362f1e43ca4009e";
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    async function fetchData() {
        try {
            const res = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`); //try catch finally try is fetching catch is error and finally is loading
            if (!res.ok) {
                throw new Error("Network response failed");
            }
            const data = await res.json();
            if (Number(data.cod) !== 200) {
                throw new Error("City not found");
            }
            console.log(data);
            let result = {
                city: city,
                temp: data.main.temp,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                humidity: data.main.humidity,
                feelsLike: data.main.feels_like,
                weather: data.weather[0].description,
            }
            console.log(result);
            return result;
        }
        catch (err) {
            throw err;
        }
    }


    let handleChange = (e) => {
        setCity(e.target.value);
        setError(false);
    }

    let handleSubmit = async (e) => {
        e.preventDefault();
        if (city.trim() === "") {
            setError(true);
            return;
        }
        try {
            setError(false);
            console.log(city);
            setCity("");
            let newInfo = await fetchData();
            updateInfo(newInfo);
        }
        catch (err) {
            setError(true);
        }
    }

    return (
        <div className="container">
            <form action="">
                <TextField
                    id="city"
                    label="City name"
                    variant="outlined"
                    fullWidth
                    value={city}
                    onChange={handleChange}
                    sx={{
                        mb: 2,
                        input: { color: "white" },
                        label: { color: "white" },
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "30px",
                            "& fieldset": {
                                borderColor: "white",
                            },
                            "&:hover fieldset": {
                                borderColor: "#fff",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#00e5ff",
                            },
                        },
                    }}
                />
                <br />
                <Button
                    variant="contained"
                    id='search' 
                    onClick={handleSubmit}
                    type="submit"
                    sx={{
                        borderRadius: "30px",
                        padding: "8px 30px",
                        background: "white",
                        color: "#333",
                        fontWeight: 600,
                        "&:hover": {
                            background: "#f1f1f1",
                        },
                    }}
                >
                    Search
                </Button>
                {error && (
                    <p style={{ color: "red" }}>
                        No such place exists in our database
                    </p>)}
            </form>
        </div>
    )
}

export default SearchBox;