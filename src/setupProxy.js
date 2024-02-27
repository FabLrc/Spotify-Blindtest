const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/auth/**",
    createProxyMiddleware({
      target: `process.env.PUBLIC_URL:${process.env.PORT}`,
    })
  );
};
