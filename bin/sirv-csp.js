#!/usr/bin/env node

const sirv = require('sirv');
const polka = require('polka');

const securityHeaders = {
    "Content-Security-Policy": "default-src 'none'; \
        script-src 'self' 'sha256-7NljoL7iSxcSCo3jFmCbJKwrNQzmhhX7EC5O60LKI0g=' 'unsafe-inline'; \
        connect-src 'self'; \
        media-src 'self'; \
        manifest-src 'self'; \
        img-src 'self'; \
        style-src 'self'; \
        frame-ancestors 'none';",
    "Feature-Policy": "notifications 'self'; speaker 'self'",
    "Strict-Transport-Security": "max-age=2592000",
    "X-Xss-Protection": "1; mode=block",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin"
};


const assets = sirv('public', {
    setHeaders: res => {
        for (const key in securityHeaders) {
            res.setHeader(key, securityHeaders[key]);
        }
    }
});

polka()
    .use(assets)
    .listen(5000);
