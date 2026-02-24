import type { Schema, Struct } from '@strapi/strapi';

export interface InventoryColor extends Struct.ComponentSchema {
  collectionName: 'components_inventory_colors';
  info: {
    description: 'Pojedynczy wariant kolorystyczny';
    displayName: 'Kolor';
    icon: 'paint-brush';
  };
  attributes: {
    hex_code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#000000'>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Czarny'>;
  };
}

export interface InventorySpecs extends Struct.ComponentSchema {
  collectionName: 'components_inventory_specs';
  info: {
    description: 'Parametry techniczne walizki';
    displayName: 'Specs';
    icon: 'cog';
  };
  attributes: {
    available_colors: Schema.Attribute.JSON & Schema.Attribute.Required;
    depth_cm: Schema.Attribute.Integer;
    description_marketing: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    height_cm: Schema.Attribute.Integer;
    material: Schema.Attribute.String & Schema.Attribute.DefaultTo<'ABS'>;
    weight_kg: Schema.Attribute.Decimal;
    wheels_type: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Single 360'>;
    width_cm: Schema.Attribute.Integer;
  };
}

export interface InventoryVariant extends Struct.ComponentSchema {
  collectionName: 'components_inventory_variants';
  info: {
    description: 'Konkretny rozmiar z danej kolekcji';
    displayName: 'Wariant (Rozmiar)';
    icon: 'expand';
  };
  attributes: {
    additional_info: Schema.Attribute.String;
    capacity_liters: Schema.Attribute.Integer;
    depth_cm: Schema.Attribute.Integer;
    height_cm: Schema.Attribute.Integer;
    internal_dimensions: Schema.Attribute.String;
    price_pln: Schema.Attribute.Integer & Schema.Attribute.Required;
    size_name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Du\u017Ca XXL'>;
    stock_status: Schema.Attribute.Enumeration<['in_stock', 'out_of_stock']> &
      Schema.Attribute.DefaultTo<'in_stock'>;
    weight_kg: Schema.Attribute.Decimal;
    width_cm: Schema.Attribute.Integer;
  };
}

export interface SharedOpenGraph extends Struct.ComponentSchema {
  collectionName: 'components_shared_open_graphs';
  info: {
    displayName: 'openGraph';
    icon: 'project-diagram';
  };
  attributes: {
    ogDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    ogType: Schema.Attribute.String;
    ogUrl: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    openGraph: Schema.Attribute.Component<'shared.open-graph', false>;
    structuredData: Schema.Attribute.JSON;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'inventory.color': InventoryColor;
      'inventory.specs': InventorySpecs;
      'inventory.variant': InventoryVariant;
      'shared.open-graph': SharedOpenGraph;
      'shared.seo': SharedSeo;
    }
  }
}
