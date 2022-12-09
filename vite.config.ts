import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), svgr(), basicSsl()],
	server: {
		host: "www.baidu--123.cn",
		port: 443,
		https: true,
	},	
});