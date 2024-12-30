/**
 * Format a date value (string or Date) to a localized string
 * @param date The date to format
 * @param fallback Fallback string if date is invalid
 * @returns Formatted date string
 */
export function formatDate(date: string | Date, fallback: string = ''): string {
  try {
    const dateValue = typeof date === 'string' ? new Date(date) : date;
    return dateValue.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return fallback;
  }
}

/**
 * Check if a date string is valid
 * @param date The date string to check
 * @returns boolean indicating if the date is valid
 */
export function isValidDate(date: string): boolean {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
}

/**
 * Format a date to YYYY-MM-DD format
 * @param date The date to format
 * @returns Formatted date string in YYYY-MM-DD format
 */
export function toISODateString(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param date The date to compare
 * @returns Relative time string
 */
export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return '刚刚';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}小时前`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}天前`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}个月前`;
  }
  
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}年前`;
}
