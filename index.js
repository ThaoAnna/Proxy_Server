const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PROXY_PORT = 3002;
const DESTINATION_URL = 'https://first-project-3jy6.onrender.com';

const app = express();

// Middleware to add CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Create proxy middleware
const apiProxy = createProxyMiddleware({
    target: DESTINATION_URL,
    changeOrigin: true,
});

// Apply proxy middleware to the '/api' path
app.use('/api', apiProxy);

// Start the proxy server
app.listen(PROXY_PORT, () => {
    console.log(`[*] Proxy server listening on port ${PROXY_PORT}`);
});