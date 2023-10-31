import { CapacitorConfig } from '@capacitor/cli';
import { exhaustAll } from 'rxjs';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'codeology',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;



   
