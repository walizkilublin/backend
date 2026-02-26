import type { Core } from '@strapi/strapi';

export default {
  /**
   * Faza Register: Wykonuje się przed inicjalizacją aplikacji.
   * Używana zazwyczaj do rozszerzania wtyczek lub modyfikacji schematów w locie.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {
    // Zostawiamy czyste dla maksymalnej wydajności
  },

  /**
   * Faza Bootstrap: Wykonuje się tuż po starcie aplikacji, ale przed otwarciem portów dla świata.
   * Idealne miejsce na ewentualne logowanie lub ustawianie nasłuchiwaczy (webhooks/crons).
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.log.info('🚀 Architektura Strapi uruchomiona pomyślnie.');
    strapi.log.info('🛡️ Baza danych (PostgreSQL) podłączona. Tryb produkcyjny aktywny.');
    
    // Żadnych skryptów ingerujących w bazę danych! 
    // Transfer danych i struktury odbywa się wyłącznie poprzez bezpieczne API (Strapi Transfer).
  },
};