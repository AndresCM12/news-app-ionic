import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.andresnews',
  appName: 'Noticias',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    splashScreen:{
      showSpinner: true,
      backgroundColor: '#597',
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;
