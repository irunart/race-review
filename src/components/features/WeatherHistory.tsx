interface WeatherData {
  year: number;
  temperature: number;
  humidity: number;
  weather: string;
}

interface Props {
  data: WeatherData[];
}

export default function WeatherHistory({ data }: Props) {
  if (!data.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">历年天气</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <div key={item.year} className="p-4 bg-gray-50 rounded-lg">
            <div className="text-lg font-medium mb-2">{item.year}年</div>
            <div className="space-y-1 text-gray-600">
              <p>气温: {item.temperature}°C</p>
              <p>湿度: {item.humidity}%</p>
              <p>天气: {item.weather}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
