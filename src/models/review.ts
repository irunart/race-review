export interface Review {
  id: string;
  raceId: string;
  userId: string;
  rating: {
    difficulty: number;
    supplies: number;
    organization: number;
    transportation: number;
    valueForMoney: number;
    scenery: number;
    volunteerService: number;
  };
  content: string;
  images?: string[];
  createdAt: Date;
  isVerified: boolean;
  userBadges: string[]; // ['认证跑者', '多次参赛者' etc.]
}
