import { CronJob } from "cron";
import { updateRaces } from "./scheduler";

export function setupTasks() {
  // 每周一凌晨 3 点执行
  new CronJob("0 3 * * 1", updateRaces, null, true, "Asia/Shanghai");
}
