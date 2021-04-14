module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://course-vue.javascript.ru",
        changeOrigin: true,
      },
    },
  },
};
