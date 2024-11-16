interface NotificationPayload {
  title: string;
  message: any;
}

export async function sendNotification({
  title,
  message,
}: NotificationPayload) {
  // Basic console implementation - replace with your actual notification logic
  console.log(`[Notification] ${title}:`, message);
}
