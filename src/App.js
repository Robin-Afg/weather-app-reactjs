import {react, useState} from 'react';


const api = {
    key: 'd622fb1ecf5feb17b12622de44e5fbfc',
    base: 'https://api.openweathermap.org/data/2.5/'
}


function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = evt => {
        if(evt.key ===  "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result=> {
                    setWeather(result);
                    setQuery('');
                    console.log(weather);
                });
        }
    }

    
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", 
                        "April", "May", "June", "July", "August", "September",
                        "October", "November", "December"];

        let days = ["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${day} ${date} ${month} ${year}`;
    }


 return (
    <div className={(typeof weather.main != "undefined")
     ? ((weather.main.temp > 16) 
        ? 'app warm' 
        : 'app') 
     : 'app'}>
        <main>
            <div className="search-box">
                <input 
                    type="text"
                    className="search-bar"
                    placeholder="Search for a country..."
                    onChange={e=>setQuery(e.target.value)}
                    value={query}
                    onKeyPress={search}
                />
            </div>
            {(typeof weather.main != "undefined") ? ( 
            <div>
                <div className="location-box">
                    <div className="location">{weather.name}, {weather.sys.country}</div>
                    <div className="date"> {dateBuilder(new Date())} </div>
                </div>

                <div className="weather-box">
                    <div className="temp">
                        {Math.round(weather.main.temp)} ˚c

                    </div>
                    <div className="weather">{weather.weather[0].main}</div>
                </div>
            </div>
            ) : ('Try again ! Please check your country name !')}

        </main>
    </div>
  
 );
}

export default App;
