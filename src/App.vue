<template>

<body>
  <img alt="Vue logo" class="logo" src="./assets/terraform-builder-logo.png" width="500" height="125" />

<div class="item">
  <div class="controller">
  <div>
    <button  class="btn btn-primary"  @click="getAzure('Azure')">Azure</button >
  </div>
  <div>
    <button  class="btn btn-primary"  @click="getAzure('Function')">Azure Function</button  >
  </div>
  <div>
    <button  class="btn btn-primary"  @click="getAzure('cdn')">Azure CDN</button  >
  </div>
  <div>
    <button  class="btn btn-primary"  @click="getAzure('Iot')">Azure IoT</button  >
  </div>
  <div>
    <button  class="btn btn-primary"  @click="getAzure('analysis')">Azure analysis</button  >
  </div>
  <div>
    <button  class="btn btn-primary"  @click="getAzure('app')">Azure App service</button  >
  </div>

  <div>
    <button  class="btn btn-primary"  @click="getAzure('keyvault')">Azure keyvault</button  >
  </div>

  <div>
    <button  class="btn btn-primary"  @click="getAzure('linuxvm')">Azure linux VM</button  >
  </div>

  <div>
    <button  class="btn btn-primary"  @click="getAzure('cosmosdb')">Azure cosmosdb</button  >
  </div>

  <div>
    <button  class="btn btn-primary"  @click="getAzure('mssql')">Azure Ms Sql</button  >
  </div>

  <div>
    <button  class="btn btn-primary"  @click="getAzure('storage')">Azure Storage Account</button  >
  </div>

  <div>
    <button  class="btn btn-primary"  @click="getAzure('bi')">Azure BI</button  >
  </div>


</div>
  <div class="showing">
    <div><br /></div>
    <span v-for="(word, index) in terraform" :key="index" v-html="terraform[index]"></span>
  </div>
</div>
</body>

</template>
<style>
div{
padding-top: 3px;
}
.codeDEv {
border: 3px solid rgb(0, 0, 0);
padding: 20px;

}
.controller {
width: 20%;
  float: left;
  padding: 20px;
}
.showing{
width: 80%;
float: right;
  padding: 20px;

}
code {
padding: 10px;
display: block;
color: black;
background-color: lightgrey;
}

.code {
overflow-wrap: break-word;
display: block;
white-space: p;
}

.data {
color: blueviolet;
}

</style>
<script lang="ts">
import { defineComponent, VueElement } from 'vue'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./main";

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
}, methods: {
  async getAzure(value: string) {
    const q = query(collection(db, "terraform-data"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      var dataJson = JSON.parse(JSON.stringify(doc.data()));
      this.terraform.push(dataJson[value]);

      console.log(`${doc.id} => ${doc.data()}`);
    }
    );

  }
}
})
</script>
