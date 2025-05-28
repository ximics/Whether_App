import axios from 'axios';

export const getWeatherByCity = async (req, res) => {
  const city = req.params.city;
  const units = req.query.units || 'metric'; // default °C

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&lang=es&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    const data = response.data;

    res.json({
      name: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: 'Ciudad no encontrada' });
  }
};
