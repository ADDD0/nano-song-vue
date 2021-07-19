module.exports = {
  devServer: {
    host: "localhost",
    port: 8081,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:78/",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
