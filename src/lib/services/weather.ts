import { Race, WeatherHistory } from '@prisma/client';
import { prisma } from '../db/prisma';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_API_URL = 'https://api.openweathermap.org/data/3.0';

interface WeatherResponse {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  visibility: number;
  rain?: {
    '1h': number;
  };
}

export class WeatherService {
  static async fetchHistoricalWeather(lat: number, lon: number, date: Date): Promise<WeatherResponse> {
    const timestamp = Math.floor(date.getTime() / 1000);
    
    const response = await fetch(
      `${OPENWEATHER_API_URL}/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${timestamp}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data[0];
  }

  static async fetchForecast(lat: number, lon: number): Promise<WeatherResponse[]> {
    const response = await fetch(
      `${OPENWEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.daily.map((day: any) => ({
      main: {
        temp: day.temp.day,
        humidity: day.humidity,
        pressure: day.pressure,
      },
      wind: {
        speed: day.wind_speed,
      },
      weather: [
        {
          main: day.weather[0].main,
          description: day.weather[0].description,
        },
      ],
      visibility: day.visibility || 10000,
      rain: day.rain ? { '1h': day.rain } : undefined,
    }));
  }

  static async updateRaceWeather(race: Race): Promise<void> {
    try {
      // Extract coordinates from location (assuming format: "latitude,longitude")
      const [lat, lon] = race.location.split(',').map(Number);
      
      // Get race date
      const raceDate = new Date(race.date);
      const now = new Date();
      
      let weatherData: WeatherResponse;
      
      if (raceDate < now) {
        // For past races, fetch historical data
        weatherData = await this.fetchHistoricalWeather(lat, lon, raceDate);
      } else {
        // For future races, fetch forecast
        const forecast = await this.fetchForecast(lat, lon);
        const daysDiff = Math.floor((raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        weatherData = forecast[Math.min(daysDiff, 7)]; // API provides up to 7 days forecast
      }

      // Convert weather data to our format
      const weatherHistory: Omit<WeatherHistory, 'id' | 'createdAt' | 'updatedAt'> = {
        raceId: race.raceId,
        date: raceDate,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        conditions: weatherData.weather[0].main,
        rainfall: weatherData.rain?.['1h'] || 0,
        visibility: weatherData.visibility / 1000, // Convert to kilometers
        pressure: weatherData.main.pressure,
      };

      // Update or create weather history
      await prisma.weatherHistory.upsert({
        where: {
          raceId_date: {
            raceId: race.raceId,
            date: raceDate,
          },
        },
        update: weatherHistory,
        create: weatherHistory,
      });
    } catch (error) {
      console.error(`Failed to update weather for race ${race.raceId}:`, error);
      throw error;
    }
  }

  static getWeatherSeverity(weather: WeatherHistory): 'low' | 'medium' | 'high' {
    let severityScore = 0;

    // Temperature impact (0-3 points)
    if (weather.temperature < 5 || weather.temperature > 30) severityScore += 3;
    else if (weather.temperature < 10 || weather.temperature > 25) severityScore += 2;
    else if (weather.temperature < 15 || weather.temperature > 20) severityScore += 1;

    // Humidity impact (0-2 points)
    if (weather.humidity > 85) severityScore += 2;
    else if (weather.humidity > 70) severityScore += 1;

    // Wind impact (0-2 points)
    if (weather.windSpeed > 30) severityScore += 2;
    else if (weather.windSpeed > 20) severityScore += 1;

    // Rain impact (0-2 points)
    if (weather.rainfall && weather.rainfall > 10) severityScore += 2;
    else if (weather.rainfall && weather.rainfall > 5) severityScore += 1;

    // Visibility impact (0-1 point)
    if (weather.visibility && weather.visibility < 5) severityScore += 1;

    // Calculate final severity
    if (severityScore >= 6) return 'high';
    if (severityScore >= 3) return 'medium';
    return 'low';
  }

  static getWeatherAdvice(weather: WeatherHistory): string[] {
    const advice: string[] = [];

    // Temperature advice
    if (weather.temperature > 25) {
      advice.push('高温天气，建议携带防晒装备和充足的水分');
      advice.push('建议在较凉爽的时段参赛');
    } else if (weather.temperature < 10) {
      advice.push('低温天气，建议穿着保暖层次着装');
      advice.push('赛前充分热身，避免肌肉拉伤');
    }

    // Humidity advice
    if (weather.humidity > 80) {
      advice.push('湿度较大，建议使用防磨贴，穿着速干衣物');
      advice.push('注意补充电解质，预防中暑');
    }

    // Wind advice
    if (weather.windSpeed > 25) {
      advice.push('风力较大，建议穿着贴身衣物');
      advice.push('注意调整配速，逆风时保存体力');
    }

    // Rain advice
    if (weather.rainfall && weather.rainfall > 0) {
      advice.push('可能有雨，建议携带防水装备');
      advice.push('注意路面湿滑，适当放慢配速');
    }

    // Visibility advice
    if (weather.visibility && weather.visibility < 5) {
      advice.push('能见度较低，建议穿着醒目的衣物');
      advice.push('注意路况，保持安全距离');
    }

    return advice;
  }
}
