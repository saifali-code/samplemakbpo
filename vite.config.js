import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins:[react()],
  server:{host:process.env.SITES_MANAGED_LINUX_CONTAINER==='1'?'0.0.0.0':'localhost',port:5173,allowedHosts:['terminal.local']},
  preview:{host:'localhost',port:4173},
  build:{outDir:'dist',sourcemap:false,manifest:true,chunkSizeWarningLimit:750}
});
