import axios from "axios";
import { RaceData, RaceListResponse } from "./types";
import { generateMachineCode } from "./utils";

export class RunChinaScraper {
  private baseUrl = "https://api-changzheng.chinaath.com";
  private apiPath =
    "/changzheng-content-center-api/api/homePage/official/searchCompetitionMls";
  private machineCode: string;

  constructor() {
    // 生成一个固定的 machineCode
    this.machineCode = generateMachineCode();
  }

  private getHeaders() {
    return {
      Accept: "application/json, text/plain, */*",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
      "Content-Type": "application/json",
      DNT: "1",
      Origin: "https://www.runchina.org.cn",
      Referer: "https://www.runchina.org.cn/",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      machineCode: this.machineCode,
      osId: "1006",
      "sec-ch-ua":
        '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      terminalType: "3",
    };
  }

  async fetchRaceList(
    pageNo: number = 1,
    pageSize: number = 30
  ): Promise<RaceListResponse> {
    try {
      // 添加随机延迟，模拟真实用户行为
      await this.randomDelay();

      const response = await axios.post(
        `${this.baseUrl}${this.apiPath}`,
        {
          provinceId: "",
          cityId: "",
          districtId: "",
          raceName: "",
          raceGrade: "",
          raceStartTime: "",
          pageNo,
          pageSize,
        },
        {
          headers: this.getHeaders(),
        }
      );

      if (!response.data.success) {
        throw new Error(`API error: ${response.data.msg}`);
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching race list:", error);
      throw error;
    }
  }

  async getAllRaces(): Promise<RaceData[]> {
    try {
      // 先获取第一页来得到总页数
      const firstPage = await this.fetchRaceList(1);
      const totalPages = firstPage.data.pageCount;
      const races: RaceData[] = this.transformRaceData(firstPage.data.results);

      // 获取剩余页面的数据
      //   for (let page = 2; page <= totalPages; page++) {
      //     // 添加进度日志
      //     console.log(`Fetching page ${page} of ${totalPages}`);

      //     try {
      //       const response = await this.fetchRaceList(page);
      //       races.push(...this.transformRaceData(response.data.results));
      //     } catch (error) {
      //       console.error(`Error fetching page ${page} of ${totalPages}:`, error);
      //     }
      //   }

      return races;
    } catch (error) {
      console.error("Error fetching all races:", error);
      throw error;
    }
  }

  private transformRaceData(data: any[]): RaceData[] {
    // 在这里添加数据转换逻辑
    return data.map((item): RaceData => {
      return {
        raceId: item.raceId.toString(),
        name: item.raceName,
        raceGrade: item.raceGrade,
        location: item.raceAddress,
        raceItems: JSON.parse(item.raceItem),
        raceScale: item.raceScale,
        lastUpdated: new Date(item.raceTime),
        date: new Date(item.raceTime),
        source: "中国马拉松",
        sourceUrl: "https://www.runchina.org.cn/", //TODO
      };
    });
  }

  private async randomDelay() {
    // 生成1-3秒之间的随机延迟
    // const delay = Math.floor(Math.random() * 2000) + 1000;
    // await new Promise((resolve) => setTimeout(resolve, delay));
    return;
  }
}
