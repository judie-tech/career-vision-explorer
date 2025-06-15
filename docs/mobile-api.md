
# Mobile App API Documentation

## Overview
This document describes the mobile-specific API endpoints for the Career Vision Explorer mobile application built with Capacitor.

## Mobile-Specific Features
- **Offline Support**: Data synchronization and offline storage
- **Push Notifications**: Real-time notifications for job updates
- **Biometric Authentication**: Fingerprint/Face ID login
- **Background Sync**: Automatic data synchronization
- **App Updates**: Over-the-air update checking

## Mobile API Endpoints

### App Configuration
**Endpoint**: `GET /api/mobile/config`

Get mobile app configuration and feature flags.

```typescript
interface MobileConfig {
  appVersion: string;
  apiVersion: string;
  features: string[];
  maintenanceMode: boolean;
}
```

**Example Response**:
```json
{
  "appVersion": "1.0.0",
  "apiVersion": "v1",
  "features": ["offline_mode", "push_notifications", "biometric_auth"],
  "maintenanceMode": false
}
```

**Usage**:
```typescript
import { MobileApi } from '@/api/mobile-api';

const config = await MobileApi.getAppConfig();
if (config.maintenanceMode) {
  // Show maintenance screen
}
```

### Push Notifications

#### Register Device
**Endpoint**: `POST /api/mobile/notifications/register`

Register device for push notifications.

```typescript
await MobileApi.registerForPushNotifications(deviceToken);
```

**Request Body**:
```json
{
  "deviceToken": "device_token_here",
  "platform": "ios" | "android",
  "userId": "user_id"
}
```

#### Send Notification
**Endpoint**: `POST /api/mobile/notifications/send`

Send push notification to user.

```typescript
interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  scheduledAt?: string;
}

await MobileApi.sendPushNotification({
  title: "New Job Match",
  body: "We found 3 new jobs that match your profile",
  data: { jobIds: ["1", "2", "3"] }
});
```

### Offline Data Management

#### Sync Data
**Endpoint**: `GET /api/mobile/sync`

Download latest data for offline use.

```typescript
interface OfflineData {
  jobs: any[];
  profile: any;
  applications: any[];
  lastSync: string;
}

const offlineData = await MobileApi.syncOfflineData();
```

#### Upload Offline Changes
**Endpoint**: `POST /api/mobile/sync`

Upload data created while offline.

```typescript
await MobileApi.uploadOfflineData({
  applications: [/* new applications */],
  profileUpdates: {/* profile changes */}
});
```

### App Updates

#### Check for Updates
**Endpoint**: `GET /api/mobile/updates`

Check if app update is available.

```typescript
const updateInfo = await MobileApi.checkForUpdates();

if (updateInfo.hasUpdate) {
  // Show update dialog
  console.log(`Update available: ${updateInfo.version}`);
  console.log(`Download URL: ${updateInfo.downloadUrl}`);
}
```

**Response**:
```typescript
interface UpdateInfo {
  hasUpdate: boolean;
  version?: string;
  downloadUrl?: string;
  mandatory?: boolean;
  releaseNotes?: string;
}
```

## Mobile-Specific Headers

All mobile API requests should include these headers:

```typescript
headers: {
  'X-App-Platform': 'ios' | 'android',
  'X-App-Version': '1.0.0',
  'X-Device-Id': 'unique_device_id',
  'Authorization': 'Bearer <token>'
}
```

## Capacitor Integration

### Push Notifications Setup

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

// Request permission
await PushNotifications.requestPermissions();

// Register for notifications
await PushNotifications.register();

// Listen for registration
PushNotifications.addListener('registration', (token) => {
  MobileApi.registerForPushNotifications(token.value);
});

// Handle received notifications
PushNotifications.addListener('pushNotificationReceived', (notification) => {
  console.log('Notification received:', notification);
});
```

### Background Sync

```typescript
import { BackgroundMode } from '@capacitor-community/background-mode';

// Enable background mode
await BackgroundMode.enable();

// Sync data in background
setInterval(async () => {
  if (await BackgroundMode.isEnabled()) {
    await MobileApi.syncOfflineData();
  }
}, 300000); // Every 5 minutes
```

### Biometric Authentication

```typescript
import { BiometricAuth } from '@capacitor-community/biometric-auth';

// Check if biometric auth is available
const available = await BiometricAuth.isAvailable();

if (available.isAvailable) {
  try {
    const result = await BiometricAuth.verify({
      reason: "Please verify your identity",
      title: "Biometric Authentication",
      subtitle: "Use your fingerprint or face to authenticate"
    });
    
    if (result.isVerified) {
      // Authentication successful
    }
  } catch (error) {
    // Authentication failed
  }
}
```

### Network Status

```typescript
import { Network } from '@capacitor/network';

// Check network status
const status = await Network.getStatus();

if (!status.connected) {
  // Switch to offline mode
  enableOfflineMode();
}

// Listen for network changes
Network.addListener('networkStatusChange', (status) => {
  if (status.connected) {
    // Back online - sync data
    MobileApi.syncOfflineData();
  } else {
    // Gone offline - enable offline mode
    enableOfflineMode();
  }
});
```

## Offline Storage

### Local Storage Structure

```typescript
interface OfflineStorage {
  jobs: {
    data: Job[];
    lastSync: string;
    dirty: boolean;
  };
  profile: {
    data: UserProfile;
    lastSync: string;
    dirty: boolean;
  };
  applications: {
    data: JobApplication[];
    lastSync: string;
    pending: JobApplication[]; // Offline-created applications
  };
  settings: {
    offlineMode: boolean;
    syncFrequency: number;
    biometricEnabled: boolean;
  };
}
```

### Storage Operations

```typescript
import { Storage } from '@capacitor/storage';

// Save data
await Storage.set({
  key: 'offline_jobs',
  value: JSON.stringify(jobs)
});

// Retrieve data
const { value } = await Storage.get({ key: 'offline_jobs' });
const jobs = JSON.parse(value || '[]');

// Clear storage
await Storage.clear();
```

## Error Handling for Mobile

### Network Errors

```typescript
try {
  const data = await MobileApi.syncOfflineData();
} catch (error) {
  if (error.code === 'NETWORK_ERROR') {
    // Switch to offline mode
    showOfflineMessage();
  } else if (error.code === 'SYNC_CONFLICT') {
    // Handle data conflicts
    resolveConflicts(error.conflicts);
  }
}
```

### Common Mobile Error Codes

- `NETWORK_ERROR`: No internet connection
- `SYNC_CONFLICT`: Data conflicts during sync
- `STORAGE_FULL`: Device storage is full
- `PERMISSION_DENIED`: Required permissions not granted
- `BIOMETRIC_UNAVAILABLE`: Biometric authentication not available
- `UPDATE_REQUIRED`: App update is mandatory

## Performance Considerations

### Data Pagination for Mobile

```typescript
// Use smaller page sizes for mobile
const mobileParams = {
  ...searchParams,
  limit: 10 // Smaller limit for mobile
};
```

### Image Optimization

```typescript
// Request optimized images for mobile
const imageParams = {
  width: 300,
  height: 200,
  quality: 80,
  format: 'webp'
};
```

### Caching Strategy

```typescript
// Cache frequently accessed data
const cacheConfig = {
  jobs: { ttl: 300000 }, // 5 minutes
  profile: { ttl: 900000 }, // 15 minutes
  images: { ttl: 3600000 } // 1 hour
};
```

## Security Considerations

### Token Storage

```typescript
import { SecureStorage } from '@capacitor-community/secure-storage';

// Store sensitive data securely
await SecureStorage.set({
  key: 'auth_token',
  value: token
});

// Retrieve secure data
const token = await SecureStorage.get({ key: 'auth_token' });
```

### Certificate Pinning

```typescript
// Configure SSL pinning in capacitor.config.ts
{
  plugins: {
    HttpClient: {
      pinnedCertificates: [
        {
          hostname: "api.careervision.com",
          fingerprints: ["SHA256_FINGERPRINT"]
        }
      ]
    }
  }
}
```
