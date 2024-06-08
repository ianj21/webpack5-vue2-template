import Vue from "vue";
import Vuex from "vuex";

const files = require.context("./modules", true, /\.js$/);

const modules = {};

files.keys().forEach((key) => {
  const moduleName = key.replace(/(\.\/|\.js)/g, "");
  modules[moduleName] = files(key).default || files(key);
});

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
});
