import crypto from "crypto";

export function generateMachineCode(): string {
  // 生成一个固定的 machineCode，模拟浏览器指纹
  const browserInfo = {
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    language: "zh-CN",
    platform: "MacIntel",
    screenResolution: "1920x1080",
  };

  const str = JSON.stringify(browserInfo);
  return crypto.createHash("md5").update(str).digest("hex");
}
