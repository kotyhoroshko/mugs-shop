import  { createRouter,
          createWebHistory,
          // createWebHashHistory
  } from 'vue-router';
import ProductList from "../views/ProductList.vue";
import ProductDetails from "../views/ProductDetails.vue";


const routes = [
  {
    path: "/plp",
    name: "PLP",
    component: ProductList,
    alias: "/",
  },
  {
    path: "/pdp/:productId",
    name: "PDP",
    props: true,
    component: ProductDetails,
  },
  { path: "/:notFound(.*)", redirect: "/plp" },
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
