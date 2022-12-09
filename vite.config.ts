import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});

/*
  localhost
  import basicSsl from '@vitejs/plugin-basic-ssl';
  export default defineConfig({
    plugins: [react(), svgr(), basicSsl()],
    server: {
      host: "www.baidu--123.cn",
      port: 443,
      https: true,
    },	
  });
*/
