/// <reference types="vite/client" />

declare global {
  interface Window {
    supabase: any;
    uploadFile?: (file: File) => Promise<unknown>;
  }
}
