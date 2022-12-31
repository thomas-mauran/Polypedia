<script setup>
import { onBeforeMount, ref, defineProps, defineEmits } from "vue";
import { fetchOne, fetchAttributes } from "@/utils/fetchers";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
import loadingGif from "@/components/loadingGif.vue";

const emit = defineEmits(["showMessageEvent"]);

const props = defineProps({
  category: String,
});

const attributes = ref([]);
const data = ref({});
const loading = ref(false);

const router = useRouter();
const route = useRoute();

let id;
onBeforeMount(async () => {
  id = route.params.id;
  data.value = await fetchOne(props.category, id);

  attributes.value = await fetchAttributes(props.category);

  if (attributes.value.length === 0 || data.value.length === 0) {
    router.replace("/notFound");
  }
  // We need to make every attribute.value the value of the data attribute fetched
  if (props.category === "users") {
    const passwordIndex = attributes.value.findIndex((item) => item.name === "password");
    attributes.value.splice(passwordIndex, 1);
  }
  attributes.value.forEach((element) => {
    element.value = data.value[0][element.name];
  });
});

async function sendData() {
  loading.value = true;
  const url = `${process.env.VUE_APP_API_URL}/${props.category}/${id}`;

  const refactoredData = attributes.value.reduce((accumulator, attribute) => {
    accumulator[attribute.name] = attribute.value;
    return accumulator;
  }, {});

  try {
    let res = await axios.post(url, refactoredData, {
      headers: {
        "x-access-token": `${localStorage.getItem("AUTH_TOKEN_KEY")}`,
      },
    });

    if (res.status === 204) {
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
</script>
<template>
  <article class="verticalDivCentered">
    <loadingGif v-if="loading" />
    <form class="form">
      <div class="verticalDiv" v-for="(attribute, index) in attributes" :key="index">
        <label :for="'attribute-' + index">{{ attribute.name }}</label>
        <input
          v-if="attribute.value.length < 20 || attribute.type === 'checkbox'"
          :id="'attribute-' + index"
          v-model="attribute.value"
          :type="attribute.type"
          :placeholder="attribute.name" />
        <textarea v-else :name="'attribute-' + index" :id="'attribute-' + index" v-model="attribute.value"></textarea>
      </div>
      <button class="purpleBackground btn" type="button" @click="sendData">Update</button>
    </form>
  </article>
</template>
<style scoped>
.form div {
  text-align: center;
}
button {
  display: flex;

  margin: 2vh auto;
}

input {
  width: fit-content;
}

textarea {
  width: 50vw;
}
</style>
