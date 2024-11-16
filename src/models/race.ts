export interface Race {
  id: string;
  name: string;
  location: string;
  date: Date;
  distance: number;
  description: string;
  difficulty: number;
  // 评价维度
  suppliesRating: number;
  organizationRating: number;
  transportationRating: number;
  valueForMoneyRating: number;
  sceneryRating: number;
  volunteerServiceRating: number;
  // 特色信息
  suitableFor: string[]; // ['新手友好', '精英挑战' etc.]
  weatherHistory: WeatherHistory[];
  equipmentSuggestions: string[];
  trainingTips: string[];
  accommodationInfo: string;
  transportInfo: string;
}

interface WeatherHistory {
  year: number;
  temperature: number;
  humidity: number;
  weather: string;
}
