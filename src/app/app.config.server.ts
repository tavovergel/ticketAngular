// app.config.server.ts

import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const config: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    // ...otros providers si los tienes
  ]
};
