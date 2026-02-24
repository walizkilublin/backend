import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({});

export default ({ env }) => ({
  // 1. SEO Plugin
  seo: {
    enabled: true,
  },


  // 3. Upload (Cloudinary vs Local)
  upload: {
    config: {
      provider: env('NODE_ENV') === 'production' ? 'cloudinary' : 'local',
      providerOptions: env('NODE_ENV') === 'production' ? {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      } : {}, // Dla local providera opcje są puste/domyślne
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});