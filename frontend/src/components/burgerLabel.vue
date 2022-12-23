<script setup>
/* eslint-disable */
import prettyLabel from "../components/prettyLabel.vue"

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
  prettyLabel: {
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
        <prettyLabel v-if="prettyLabel" class="tag" v-for="item in list" :key="item.id" :text="item.name"/>
        <p v-else="prettyLabel" class="tag" v-for="item in list" >{{ item.name }}</p>
    </div>
  </div>
  <div v-else class="horizontalDiv burgerLabelDiv">
    <h2>{{ title }} :</h2>
    <p>{{ text }}</p>
  </div>
</template>

<style scoped>

.tagDiv{
    display:flex;
    flex-wrap: wrap;
    width: 100%;
}
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
