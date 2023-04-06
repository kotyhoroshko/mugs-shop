import { createStore } from "vuex";

export default createStore({
  state: {
    products: [],
    filterDetails: {},
  },

  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setfilterDetails(state) {
      state.filterDetails.color = [
        ...new Set(state.products.products.map((item) => item.color)),
      ];
      state.filterDetails.material = [
        ...new Set(state.products.products.map((item) => item.material)),
      ];
      state.filterDetails.maxPrice = Math.max(
        ...state.products.products.map((item) => item.price)
      );
      state.filterDetails.maxVolume = Math.max(
        ...state.products.products.map((item) => item.vol)
      );
    },
  },

  actions: {
    getProducts(context) {
      return fetch("https://kotyhoroshko.github.io/db.json")
        .then( (response) => response.json())
        .then((data) => {
          context.commit("setProducts", data);
          context.commit("setfilterDetails");
          console.log("db was successfully loaded");
        })
        .catch((err) => console.error(err));
    },
  },

  getters: {
    products(state) {
      return state.products;
    },
    filterDetails(state) {
      return state.filterDetails;
    },
    getProductById: (state) => (id) => {
      return state.products.products.find((item) => item.id === id);
    },
  },
});
