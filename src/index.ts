import type { Core } from '@strapi/strapi';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1. Sprawdzamy, czy w bazie istnieją już administratorzy
    const adminsCount = await strapi.db.query('admin::user').count();
    
    // 2. Jeśli baza jest pusta (0 adminów), uruchamiamy proces seedowania
    if (adminsCount === 0) {
      strapi.log.info('🚀 Baza danych jest pusta. Rozpoczynam architektoniczny seeding...');
      
      try {
        // Używamy process.cwd(), by precyzyjnie namierzyć plik w głównym folderze (root)
        const seedPath = path.join(process.cwd(), 'my-seed.tar.gz');
        
        if (fs.existsSync(seedPath)) {
           strapi.log.info(`📦 Znaleziono plik seed: ${seedPath}`);
           
           // Uruchamiamy import synchronicznie, z flagą --force, aby pominąć pytania w konsoli
           execSync(`npm run strapi import -- -f ${seedPath} --force`, { stdio: 'inherit' });
           
           strapi.log.info('✅ Architektura danych została pomyślnie zaimplementowana!');
        } else {
           strapi.log.warn(`⚠️ OSTRZEŻENIE: Plik seed nie istnieje w lokalizacji: ${seedPath}`);
        }
      } catch (error) {
        strapi.log.error('❌ BŁĄD KRYTYCZNY podczas seedowania bazy:', error);
      }
    } else {
      // 3. Jeśli są dane, blokujemy nadpisywanie dla bezpieczeństwa
      strapi.log.info('🛡️ Baza danych zawiera już dane. Pomijam seeding, chronię zawartość.');
    }
  },
};