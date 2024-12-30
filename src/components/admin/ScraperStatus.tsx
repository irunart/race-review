"use client";

import { useState } from "react";

export default function ScraperStatus() {
  const [isRunning, setIsRunning] = useState(false);

  const handleStartScraper = async () => {
    setIsRunning(true);
    try {
      const res = await fetch("/api/admin/scraper/start", { method: "POST" });
      if (!res.ok) throw new Error("Failed to start scraper");
    } catch (error) {
      console.error("Scraper error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">赛事数据更新</h2>

      <div className="space-y-4">
        <button
          onClick={handleStartScraper}
          disabled={isRunning}
          className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary-dark disabled:opacity-50"
        >
          {isRunning ? "更新中..." : "开始更新"}
        </button>

        <div className="text-sm text-gray-500">
          上次更新时间：{new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
}
