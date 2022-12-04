<script setup lang="ts">
</script>

<template>
  <div class="item">
    <div>
      <button @click="getAzure('Azure')">Azure</button>
    </div>

    <div>
      <button  @click="getAzure('Function')">Azure Function</button>
    </div>

    <div><br /></div>
    <span v-for="(word, index) in terraform" :key="index" v-html="terraform[index]"></span>

</div>

</template>
<style>
code {
  padding: 10px;
  display: block;
  color: black;
  width:500px;
  background-color: lightgrey;
}

.code{
  overflow-wrap: break-word;
  display: block;
  white-space: p;
}
.data{
  color: blueviolet;
}
</style>
<script lang="ts">
import { defineComponent, VueElement } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../main";

export default defineComponent({
  props: {
    name: String,
    msg: { type: String, required: true }
  },

  data() {
    return {
      terraform: [] as String[],
    };
  },
  mounted() {
    this.msg
    this.terraform // type: number
  } ,methods:{
  async getAzure(value: string) {
    const q = query(collection(db, "terraform-data"));
    var result : string[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      var dataJson = JSON.parse(JSON.stringify(doc.data())) ;
      this.terraform.push(dataJson[value]);

      console.log(`${doc.id} => ${doc.data()}`);
    }
    );

  }
}
})
</script>
