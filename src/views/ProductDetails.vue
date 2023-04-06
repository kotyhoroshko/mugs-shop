<template>
  <div class="product-wrapper">
    <div class="back-btn">
      <router-link to="/plp">
        <img src="../assets/back.png" alt="back" title="Back to product list" />
      </router-link>
    </div>
    <div class="product">
      <img
        class="product__img"
        :src="'../product_images/' + product.img + '.png'"
        :alt="product.title"
      />
      <div class="product__detail">
        <h1 class="product__title">{{ product.title }}</h1>
        <p class="product__art">Art: {{ product.id }}</p>
        <p class="product__price">Price: {{ product.price }}$</p>
        <ul class="product__characteristics">
          <li>
            Volume: <span class="value">{{ product.vol }}ml</span>
          </li>
          <li>
            Color: <span class="value">{{ product.color }}</span>
          </li>
          <li>
            Material: <span class="value">{{ product.material }}</span>
          </li>
        </ul>
      </div>
      <p class="product__desc">{{ product.desc }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProductDetails",
  data() {
    return {
      product: {},
    };
  },
  props: ["productId"],
  methods: {
    ...mapActions(["getProducts"]),
  },
  computed: {
    ...mapGetters(["getProductById", "products"]),
  },
  created() {
    if (this.products.products) {
      this.product = this.getProductById(this.productId);
    } else {
      this.getProducts().then(
        () => (this.product = this.getProductById(this.productId))
      );
    }
  },
};
</script>

<style scoped lang="scss">
.back-btn {
  position: absolute;
  top: rem;
  left: 2rem;
}

.product {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 1024px;

  &__img {
    width: 100%;
    max-width: 500px;
    object-fit: contain;
  }
  &__detail {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: left;
    padding: 1rem;
  }
  &__title {
    width: 100%;
    border-left: 8px solid #c00;
    padding-left: 0.5rem;
    display: flex;
    align-items: center;
    height: fit-content;
  }
  &__art {
    width: 100%;
    padding-left: 1rem;
    font-style: italic;
    font-size: 14px;
    color: #333;
  }
  &__price {
    width: 100%;
    font-weight: 500;
    font-size: 28px;
    padding-left: 1rem;
  }
  &__characteristics {
    list-style-type: none;
    padding: 0;
    padding-left: 1rem;

    > li {
      padding: 0.5rem 0;
    }
    .value {
      font-weight: bold;
      text-transform: capitalize;
    }
  }
  &__desc {
    border-top: 1px solid #000;
    padding: 1rem;
  }

  @media screen and (min-width: 640px) {
    &__img {
      width: 40%;
    }
    &__detail {
      width: 55%;
    }
  }
}
</style>