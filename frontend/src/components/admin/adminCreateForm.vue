<script setup>
import { onBeforeMount, ref, defineProps, defineEmits } from "vue";
import { fetchAttributes } from "@/utils/fetchers";
import { useRouter } from "vue-router";
import axios from "axios";
import loadingGif from "@/components/loadingGif.vue";

const emit = defineEmits(["showMessageEvent"]);

const props = defineProps({
  category: String,
});

const attributes = ref([]);
const loading = ref(false);

const router = useRouter();

onBeforeMount(async () => {
  attributes.value = await fetchAttributes(props.category);
  if (attributes.value.length === 0) {
    router.replace("/notFound");
  }
});

async function sendData() {
  loading.value = true;
  const url = `${process.env.VUE_APP_API_URL}/${props.category}`;

  const refactoredData = attributes.value.reduce((accumulator, attribute) => {
    accumulator[attribute.name] = attribute.value;
    return accumulator;
  }, {});

  console.log(refactoredData);

  try {
    let res = await axios.post(url, refactoredData, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    });

    if (res.status === 201) {
      router.replace(`/admin/${props.category}`);
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    let responseText = error.response.data;
    let responseMsg = responseText.error ? responseText.error : responseText;
    emit("showMessageEvent", responseMsg);
  }
}

console.log(props);
</script>
<template>
  <article class="verticalDivCentered">
    <loadingGif v-if="loading" />

    <form>
      <div class="verticalDiv" v-for="(attribute, index) in attributes" :key="index">
        <label :for="'attribute-' + index">{{ attribute.name }}</label>
        <input :id="'attribute-' + index" v-model="attribute.value"  :type="attribute.type" :placeholder="attribute.name" />
      </div>
      <button class="purpleBackground btn" type="button" @click="sendData">Create</button>
    </form>
  </article>
</template>
<style scoped>
button {
  display: flex;

  margin: 2vh auto;
}
</style>
