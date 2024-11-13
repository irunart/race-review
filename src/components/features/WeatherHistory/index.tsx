export function WeatherHistory({ raceId }: { raceId: string }) {
  const [weatherData, setWeatherData] = useState([]);

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">历年天气</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {weatherData.map((data) => (
          <WeatherCard
            key={data.year}
            year={data.year}
            temperature={data.temperature}
            weather={data.weather}
            humidity={data.humidity}
            windSpeed={data.windSpeed}
          />
        ))}
      </div>
    </div>
  );
}
