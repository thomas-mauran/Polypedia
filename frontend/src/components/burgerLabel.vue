<script setup>
/* eslint-disable */

const props = defineProps({
  title: String,
  text: {
    type: String,
    default: "",
  },
  isBig: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Uint8Array,
    default: [],
  },
});
</script>

<template>
  <div v-if="isBig" class="verticalDiv burgerLabelDiv left">
    <h2>{{ title }} :</h2>
    <p v-if="text !== ''">{{ text }}</p>
    <div v-else class="tagDiv">
      <p class="tag" v-for="item in list" :key="item.id">{{ item.name }}</p>
    </div>
  </div>
  <div v-else class="horizontalDiv burgerLabelDiv">
    <h2>{{ title }} :</h2>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>


.left {
  text-align: left;
}

.tag {
  font-size: 0.8em;
}

.burgerLabelDiv {
  margin: 20px 0px;
}

.burgerLabelDiv p {
  margin: auto 0px auto 20px;
  font-weight: lighter;
}

.left p {
  margin: 10px 0px 0px 0px;
}

</style>
