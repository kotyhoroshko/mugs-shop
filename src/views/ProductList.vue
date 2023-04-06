<template>
  <div class="product-list__wrapper">
    <Teleport to="#app">
      <Transition name="panel-slide">
        <TheFilters
          v-if="filtersPanelOpen"
          @filter-products="filterProducts"
          @sort-by="sortBy"
        ></TheFilters>
      </Transition>
    </Teleport>
    <transition-group
      name="product-list"
      tag="ul"
      class="product-list"
      @click="showProductDetail"
    >
      <div
        class="product-list__item"
        v-for="product in actualProductList"
        :key="product.id"
      >
        <li class="product-card" :data-id="product.id">
          <img
            class="product-card__img"
            :src="'./product_images/' + product.img + '.png'"
            :alt="product.title"
          />
          <ul class="product-card__characteristics">
            <li>Volume: {{ product.vol }}ml</li>
            <li>Color: {{ product.color }}</li>
            <li>Material: {{ product.material }}</li>
          </ul>
          <p class="product-card__title">{{ product.title }}</p>
          <p class="product-card__price">{{ product.price }}$</p>
          <a class="product-card__link" href="#" @click.prevent></a>
        </li>
      </div>
    </transition-group>
    <div v-if="!actualProductList.length" class="product-list__empty-msg">
      <p>Unfortunately, there is no mugs with that parameters.</p>
      <p>Please check the filters or reset them</p>
    </div>
    <label
      for="filtersPanelOpen"
      class="show-filters"
      :class="{ 'show-filters--closed': !filtersPanelOpen }"
    >
      <input type="checkbox" v-model="filtersPanelOpen" id="filtersPanelOpen" />
    </label>
  </div>
</template>

<script>
import TheFilters from "@/components/TheFilters.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { TheFilters },
  data() {
    return {
      filtersPanelOpen: false,
      actualProductList: [],
      filters: {},
      sorted: {}
    };
  },
  methods: {
    ...mapActions(["getProducts"]),
    showProductDetail(e) {
      if (!e.target.classList.contains("product-list")) {
        let id = e.target.closest(".product-card").dataset.id;
        this.$router.push("/pdp/" + id);
      }
    },
    filterProducts(filters) {
      this.filters = filters;
      this.actualProductList = this.filteredProductList;
      this.sortProducts(this.actualProductList);
    },
    sortProducts(products) {
      products.sort((a, b) => a[this.sorted.by] - b[this.sorted.by]);
      if (!this.sorted.directionAZ) {
        this.actualProductList.reverse();
      }
    },
    sortBy(sortValues) {
      this.sorted = sortValues;
      this.sortProducts(this.actualProductList);
    },
  },
  computed: {
    ...mapGetters(["products"]),
    filteredProductList() {
      return this.products.products.filter((item) => {
        let priceMatch = true,
          volumeMatch = true,
          colorMatch = true,
          materialMatch = true;
        priceMatch =
          parseFloat(item.price) <= parseFloat(this.filters.priceValue);
        volumeMatch =
          parseFloat(item.vol) <= parseFloat(this.filters.volumeValue);
        if (this.filters.checkedColors.length) {
          colorMatch = this.filters.checkedColors.includes(item.color);
        }
        if (this.filters.checkedMaterials.length) {
          materialMatch = this.filters.checkedMaterials.includes(item.material);
        }
        return [priceMatch, volumeMatch, colorMatch, materialMatch].every(
          Boolean
        );
      });
    },
  },
  created() {
    if (!this.products.products) {
      this.getProducts().then(() => {
        this.filtersPanelOpen = true;
      });
    } else {
      this.filtersPanelOpen = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.product-list {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  list-style-type: none;
  padding: 0 1rem 1rem;

  &__wrapper {
    margin: 2rem auto 1rem;
    max-width: 1200px;
  }
  &__item {
    display: flex;
    width: 23%;
    margin: 0 1% 3rem;
    min-width: 250px;
    position: relative;
    z-index: 9;
  }
  &__empty-msg {
    margin: 5rem auto 2rem;
    width: 50%;
    min-width: 280px;
    pointer-events: none;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.33);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  background-image: linear-gradient(#ffffff 66%, #333333);
  transition: box-shadow 0.6s ease;

  &__img {
    width: 100%;
    height: auto;
    padding: 1rem;
    margin: auto 0;
    transition: 4s ease;
  }

  &__title {
    border-top: 1px solid #333;
    font-weight: 500;
    font-size: 21px;
    width: 100%;
    margin: 0;
    margin: 0;
    padding-top: 1rem;
    color: #333;
    background: white;
    z-index: 2;
  }

  &__price {
    background: white;
    font-weight: 500;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    padding: 0.5rem 0 1rem;
    margin: 0;
    width: 100%;
    z-index: 2;
  }

  &__link {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11;
  }

  &__characteristics {
    list-style-type: none;
    text-align: left;
    background: rgba(0, 0, 0, 0.66);
    color: white;
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 1;
    transition: 0.3s ease;
    padding: 0.5rem 0.25rem 1rem 2rem;

    & li {
      margin-top: 0.2rem;
    }
  }

  &:hover {
    box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.66);
  }

  &:hover &__characteristics {
    bottom: 85px;
  }

  &:hover &__img {
    transform: scale(1.1);
  }
}
.show-filters {
  position: fixed;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  padding: 1rem;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.33);
  background: white url("../assets/close.svg") no-repeat center;
  background-size: 66%;
  border-radius: 50%;
  z-index: 12;
  top: 0.75rem;
  right: 1.25rem;
  transition: 0.3s ease;

  > input {
    visibility: hidden;
  }

  &--closed {
    width: 2.5rem;
    height: 2.5rem;
    background: white url("../assets/filter.svg") no-repeat center;
    background-size: 66%;
  }

  @media screen and (min-width: 767px) {
    display: none;
  }
}

.product-list-move,
.product-list-enter-active {
  transition: all 0.33s ease;
}

.product-list-enter-to,
.product-list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.product-list-leave-to,
.product-list-enter-from {
  opacity: 0;
  transform: scale(0.33);
  z-index: 0;
}
.product-list-leave-active {
  transition: all 0.33s ease;
  position: absolute;
}

.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: top 0.5s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  top: -100vh;
}
</style>