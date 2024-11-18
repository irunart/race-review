import { WeatherHistory } from '@prisma/client';
import { Cloud, Droplets, Sun, ThermometerSun, Wind } from 'lucide-react';
import { WeatherService } from '@/lib/services/weather';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface WeatherDisplayProps {
  weather: WeatherHistory;
  showAdvice?: boolean;
}

const weatherIcons: Record<string, any> = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: Droplets,
  Snow: Cloud,
  Mist: Cloud,
  Fog: Cloud,
};

const severityColors = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-yellow-600 bg-yellow-50',
  high: 'text-red-600 bg-red-50',
};

export function WeatherDisplay({ weather, showAdvice = true }: WeatherDisplayProps) {
  const WeatherIcon = weatherIcons[weather.conditions] || Cloud;
  const severity = WeatherService.getWeatherSeverity(weather);
  const advice = showAdvice ? WeatherService.getWeatherAdvice(weather) : [];

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-50">
            <WeatherIcon className="w-6 h-6 text-blue-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">天气状况</h3>
              <time className="text-sm text-gray-500">
                {format(weather.date, 'yyyy年M月d日', { locale: zhCN })}
              </time>
            </div>

            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <ThermometerSun className="w-4 h-4" />
                  <span className="text-sm">温度</span>
                </div>
                <p className="font-medium">{weather.temperature}°C</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm">湿度</span>
                </div>
                <p className="font-medium">{weather.humidity}%</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Wind className="w-4 h-4" />
                  <span className="text-sm">风速</span>
                </div>
                <p className="font-medium">{weather.windSpeed} m/s</p>
              </div>

              {weather.visibility && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Cloud className="w-4 h-4" />
                    <span className="text-sm">能见度</span>
                  </div>
                  <p className="font-medium">{weather.visibility} km</p>
                </div>
              )}

              {weather.rainfall && weather.rainfall > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm">降水量</span>
                  </div>
                  <p className="font-medium">{weather.rainfall} mm</p>
                </div>
              )}
            </div>

            <div className="mt-4">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  severityColors[severity]
                }`}
              >
                {
                  {
                    low: '适宜跑步',
                    medium: '需要注意',
                    high: '建议谨慎',
                  }[severity]
                }
              </span>
            </div>
          </div>
        </div>
      </Card>

      {showAdvice && advice.length > 0 && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">天气建议</h4>
          <ul className="space-y-2">
            {advice.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="w-1 h-1 rounded-full bg-blue-400 mt-2" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
