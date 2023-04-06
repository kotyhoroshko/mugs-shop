<template>
  <div class="filters-wrapper">
    <form action="#" class="filters">
      <fieldset class="filters__item filters__item--range">
        <legend>Price</legend>
        <div>
          <input
            type="range"
            id="price"
            name="price"
            step="1"
            min="0"
            :max="filterDetails.maxPrice"
            v-model="filters.priceValue"
            @change="applyFilters"
          />
          <p>0$ - {{ filters.priceValue }}$</p>
        </div>
        <button class="sort-btn" 
          :class="{
            'sort-btn--active': sorted.by=='price',
            'sort-btn--active-za': sorted.by=='price' && !sorted.directionAZ
          }"
          type="button" @click.prevent="sortBy" data-sort-by="price" title="Sort by price"></button>
      </fieldset>

      <fieldset class="filters__item filters__item--range">
        <legend>Volume</legend>
        <div>
          <input
            type="range"
            id="volume"
            name="volume"
            step="20"
            min="0"
            :max="filterDetails.maxVolume"
            v-model="filters.volumeValue"
            @change="applyFilters"
          />
          <p>0ml - {{ filters.volumeValue }}ml</p>
        </div>
        <button class="sort-btn"
        :class="{
            'sort-btn--active': sorted.by=='vol',
            'sort-btn--active-za': sorted.by=='vol' && !sorted.directionAZ
          }"
        type="button" @click.prevent="sortBy" data-sort-by="vol" title="Sort by volume"></button>
      </fieldset>

      <fieldset class="filters__item filters__item--checkbox">
        <legend>Colors</legend>
        <div v-for="color in filterDetails.color" :key="color">
          <input
            type="checkbox"
            name="color"
            checked
            :id="color"
            :value="color"
            v-model="filters.checkedColors"
            @change="applyFilters"
          />
          <label :for="color">{{ color }}</label>
        </div>
      </fieldset>

      <fieldset class="filters__item filters__item--checkbox">
        <legend>Materials</legend>
        <div v-for="material in filterDetails.material" :key="material">
          <input
            type="checkbox"
            name="material"
            checked
            :id="material"
            :value="material"
            v-model="filters.checkedMaterials"
            @change="applyFilters"
          />
          <label :for="material">{{ material }}</label>
        </div>
      </fieldset>
      <button class="filters__reset" type="reset" @click.prevent="resetFilters" title="Reset filters">
        <img src="../assets/reset.svg" alt="reset">
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TheFilters",
  emits: ['filter-products', 'sort-by'],
  data() {
    return {
      filters :{
        priceValue: "",
        volumeValue: "",
        checkedColors: [],
        checkedMaterials: [],
      },
      sorted: {
        by: 'price',
        directionAZ: true
      }
    };
  },
  beforeMount() {
    const { query } = this.$route;
    this.filters.checkedColors = query.color ? this.checkQueryItem(query.color) : [];
    this.filters.checkedMaterials = query.material ? this.checkQueryItem(query.material) : [];
    this.filters.priceValue = query.price ? query.price : this.filterDetails.maxPrice;
    this.filters.volumeValue = query.volume
      ? query.volume
      : this.filterDetails.maxVolume;
    this.$emit('filter-products', this.filters)

    this.sorted.by = query.sortBy ? query.sortBy : 'price';
    this.sorted.directionAZ = query.sortDirectionAZ ==='false' ? false : true
    this.$emit('sort-by', this.sorted)
  },
  methods: {
    addQueryToUrl() {
      this.$router.push(this.prepareQuerryParams)
    },
    applyFilters() {
      this.addQueryToUrl()
      this.$emit('filter-products', this.filters);
    },
    resetFilters() {
      this.filters.priceValue = this.filterDetails.maxPrice;
      this.filters.volumeValue = this.filterDetails.maxVolume;
      this.filters.checkedColors = [];
      this.filters.checkedMaterials = [];
      this.sorted.by = 'price'
      this.sorted.directionAZ = true
      this.applyFilters()
    },
    checkQueryItem(item){
      if (item.constructor === Array) {
        return item 
      }
      else {return [item]}       
    },
    sortBy(e) {
      if (this.sorted.by == e.target.dataset.sortBy) {
        this.sorted.directionAZ = !this.sorted.directionAZ
      }
      else {
        this.sorted.by = e.target.dataset.sortBy
      }
      this.$emit('sort-by', this.sorted)
      this.addQueryToUrl()
    }
  },
  computed: {
    ...mapGetters(["filterDetails"]),
    prepareQuerryParams() {
      return {
        query: {
          color: this.filters.checkedColors,
          material: this.filters.checkedMaterials,
          price:
            this.filters.priceValue == this.filterDetails.maxPrice
              ? []
              : this.filters.priceValue,
          volume:
            this.filters.volumeValue == this.filterDetails.maxVolume
              ? []
              : this.filters.volumeValue,
          sortBy: this.sorted.by == 'price' ? [] : this.sorted.by,
          sortDirectionAZ: this.sorted.directionAZ ? [] : false,
        },
      };
    }
  },
};
</script>

<style scoped lang="scss">
.filters-wrapper {
  position: fixed;
  top: 0;
  box-shadow: 0.2rem 0.2rem 1rem rgba(0, 0, 0, 0.33);
  width: 100%;
  z-index: 10;
  background-color: rgba(0,0,0,.66);
  width: 100vw;
  height: 100vh;
  z-index: 10;

  @media screen and (min-width: 767px) {
    position: sticky;
    height: inherit;
    background: snow;
  }
}

.filters {
  max-width: 1200px;
  background: snow;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3rem 1.5rem .5rem;


  &__item {
    flex-grow: 1;

    &--checkbox {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      width: 100%;

      & > div {
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
      }
    }

    &--range {
      display: flex;
      align-items: center;
      justify-content: space-evenly;

      p {
        margin-block: 0;
      }
    }
  }

  &__reset {
    height: 2.5rem;
    width: 2.5rem;
    min-width: 2rem;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    cursor: pointer;
    transition: .6s ease;

    &:hover {
      transform: rotateZ(360deg);
    }

    > img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  @media screen and (min-width: 767px) {
    flex-wrap: nowrap;
    padding: .5rem 2rem;

    &__item {    
      &--checkbox {
        justify-content: flex-start;
      }
    }
  }
}

.sort-btn {
    height: 2.5rem;
    width: 2.5rem;
    min-width: 2rem;
    background-color: transparent;
    background: url('../assets/sort.svg') no-repeat center;
    background-size: contain;
    border: none;
    cursor: pointer;
    margin-left: .25rem ;

    &--active {
      background: url('../assets/sort-az.svg') no-repeat center;
      background-size: contain;

    }

    &--active-za {
      background: url('../assets/sort-za.svg') no-repeat center;
      background-size: contain;

    }
}
</style>
