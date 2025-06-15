
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.63ad1d20ba414b00a18c8676eea9b627',
  appName: 'career-vision-explorer',
  webDir: 'dist',
  server: {
    url: 'https://63ad1d20-ba41-4b00-a18c-8676eea9b627.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ffffff',
      showSpinner: false
    }
  }
};

export default config;
