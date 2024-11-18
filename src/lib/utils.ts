import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS classes
 * @param inputs - Class names to merge
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a localized string
 * @param date - Date to format
 * @param locale - Locale to use (default: zhCN)
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = 'zhCN') {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a number to a localized string with units
 * @param value - Number to format
 * @param unit - Unit to append (optional)
 * @param locale - Locale to use (default: zhCN)
 * @returns Formatted number string
 */
export function formatNumber(value: number, unit?: string, locale = 'zhCN') {
  const formatted = new Intl.NumberFormat(locale).format(value);
  return unit ? `${formatted} ${unit}` : formatted;
}

/**
 * Format currency amount
 * @param amount - Amount to format
 * @param currency - Currency code (default: CNY)
 * @param locale - Locale to use (default: zhCN)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = 'CNY', locale = 'zhCN') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format distance in kilometers or meters
 * @param distance - Distance in kilometers
 * @returns Formatted distance string
 */
export function formatDistance(distance: number) {
  if (distance < 1) {
    return `${formatNumber(distance * 1000)}米`;
  }
  return `${formatNumber(distance)}公里`;
}

/**
 * Format elevation in meters
 * @param elevation - Elevation in meters
 * @returns Formatted elevation string
 */
export function formatElevation(elevation: number) {
  return `${formatNumber(elevation)}米`;
}

/**
 * Calculate race difficulty based on distance and elevation
 * @param distance - Distance in kilometers
 * @param elevation - Elevation gain in meters
 * @returns Difficulty grade (E to A+)
 */
export function calculateRaceDifficulty(distance: number, elevation: number): string {
  // Base difficulty from distance
  let score = 0;
  
  // Distance scoring
  if (distance <= 5) score += 1;
  else if (distance <= 10) score += 2;
  else if (distance <= 21.1) score += 3;
  else if (distance <= 42.2) score += 4;
  else score += 5;

  // Elevation scoring (per km)
  const elevationPerKm = elevation / distance;
  if (elevationPerKm <= 10) score += 1;
  else if (elevationPerKm <= 20) score += 2;
  else if (elevationPerKm <= 30) score += 3;
  else if (elevationPerKm <= 40) score += 4;
  else score += 5;

  // Convert score to grade
  const grades = ['E', 'D', 'C', 'B', 'A', 'A+'];
  return grades[Math.min(Math.floor(score / 2), grades.length - 1)];
}

/**
 * Get difficulty color based on grade
 * @param grade - Difficulty grade
 * @returns Tailwind CSS color class
 */
export function getDifficultyColor(grade: string): string {
  const colors: Record<string, string> = {
    'E': 'text-green-500',
    'D': 'text-blue-500',
    'C': 'text-yellow-500',
    'B': 'text-orange-500',
    'A': 'text-red-500',
    'A+': 'text-purple-500',
  };
  return colors[grade] || 'text-gray-500';
}

/**
 * Get difficulty description based on grade
 * @param grade - Difficulty grade
 * @returns Description in Chinese
 */
export function getDifficultyDescription(grade: string): string {
  const descriptions: Record<string, string> = {
    'E': '入门级 - 适合初次参赛',
    'D': '基础级 - 需要基本训练',
    'C': '中级 - 建议有跑步经验',
    'B': '进阶级 - 需要系统训练',
    'A': '专业级 - 富有挑战性',
    'A+': '精英级 - 专业选手水平',
  };
  return descriptions[grade] || '未知难度';
}

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Generate page title
 * @param title - Page specific title
 * @returns Full page title
 */
export function generatePageTitle(title?: string): string {
  const baseTitle = '赛事评价平台';
  return title ? `${title} - ${baseTitle}` : baseTitle;
}

/**
 * Check if a date is in the future
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  return new Date(date) > new Date();
}

/**
 * Check if a date is within a given range
 * @param date - Date to check
 * @param days - Number of days before/after today
 * @returns True if date is within range
 */
export function isDateWithinRange(date: Date | string, days: number): boolean {
  const checkDate = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(checkDate.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= days;
}
