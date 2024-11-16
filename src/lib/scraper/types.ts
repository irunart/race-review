export interface RaceListResponse {
  success: boolean;
  code: number;
  msg: string;
  data: {
    results: Array<{
      raceId: number;
      raceName: string;
      raceGrade: string;
      raceTime: string;
      raceAddress: string;
      raceItem: string;
      raceScale: string;
    }>;
    pageNo: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
  };
}

export interface RaceData {
  raceId: string;
  name: string;
  location: string;
  date: Date;
  raceGrade: string;
  raceItems: string[];
  raceScale: string;
  source: string;
  sourceUrl: string;
  lastUpdated: Date;
}
