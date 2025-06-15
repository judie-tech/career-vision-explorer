
export interface MobileConfig {
  appVersion: string;
  apiVersion: string;
  features: string[];
  maintenanceMode: boolean;
}

export interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  scheduledAt?: string;
}

export interface OfflineData {
  jobs: any[];
  profile: any;
  applications: any[];
  lastSync: string;
}

export class MobileApi {
  private static baseUrl = '/api/mobile';

  static async getAppConfig(): Promise<MobileConfig> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      appVersion: "1.0.0",
      apiVersion: "v1",
      features: ["offline_mode", "push_notifications", "biometric_auth"],
      maintenanceMode: false,
    };
  }

  static async registerForPushNotifications(deviceToken: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log("Registering device token:", deviceToken);
    return true;
  }

  static async sendPushNotification(notification: Omit<PushNotification, 'id'>): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log("Sending notification:", notification);
    return true;
  }

  static async syncOfflineData(): Promise<OfflineData> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      jobs: [],
      profile: {},
      applications: [],
      lastSync: new Date().toISOString(),
    };
  }

  static async uploadOfflineData(data: Partial<OfflineData>): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log("Uploading offline data:", data);
    return true;
  }

  static async checkForUpdates(): Promise<{ hasUpdate: boolean; version?: string; downloadUrl?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      hasUpdate: false,
    };
  }
}
