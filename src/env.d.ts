/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly PUBLIC_EMAIL_SERVICE: string;
  readonly PUBLIC_EMAIL_TEMPLATE: string;
  readonly PUBLIC_EMAIL_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
