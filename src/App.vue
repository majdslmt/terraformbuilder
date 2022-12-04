<template>

  <body>
    <img alt="Vue logo" class="logo" src="./assets/terraform-builder-logo.png" width="500" height="125" />

    <div class="item">
      <div class="provider">
        <div>
          <button class="btn btn-primary" @click="getProvider('Azure', 'terraform-data')">Azure</button>
        </div>
        <div>
          <button class="btn btn-warning" @click="getProvider('AWS', 'AWS')">AWS</button>
        </div>
        <div>
          <button class="btn btn-info" @click="getProvider('GCP', 'GCP')">GCP</button>
        </div>

        <div>
          <button class="btn btn-danger" @click="getProvider('OpenStack', 'OpenStack')">open stack</button>
        </div>
      </div>
      
      <div class="controller">
        <div class="AzureController" v-show="isAzure">
          <div>
          <button class="btn btn-primary"  @click="buildTerraform('Function', 'terraform-data')">Azure
            Function</button>
        </div>
        <div>
          <button class="btn btn-primary"  @click="buildTerraform('cdn', 'terraform-data')">Azure
            CDN</button>
        </div>
        <div>
          <button class="btn btn-primary"  @click="buildTerraform('Iot', 'terraform-data')">Azure
            IoT</button>
        </div>
        <div>
          <button class="btn btn-primary"  @click="buildTerraform('analysis', 'terraform-data')">Azure
            analysis</button>
        </div>
        <div>
          <button class="btn btn-primary"  @click="buildTerraform('app', 'terraform-data')">Azure App
            service</button>
        </div>

        <div>
          <button class="btn btn-primary" @click="buildTerraform('keyvault', 'terraform-data')">Azure
            keyvault</button>
        </div>

        <div>
          <button class="btn btn-primary"  @click="buildTerraform('linuxvm', 'terraform-data')">Azure
            linux
            VM</button>
        </div>

        <div>
          <button class="btn btn-primary"  @click="buildTerraform('cosmosdb', 'terraform-data')">Azure
            cosmosdb</button>
        </div>

        <div>
          <button class="btn btn-primary"  @click="buildTerraform('mssql', 'terraform-data')">Azure Ms
            Sql</button>
        </div>

        <div>
          <button class="btn btn-primary"  @click="buildTerraform('storage', 'terraform-data')">Azure
            Storage
            Account</button>
        </div>

        <div>
          <button class="btn btn-primary"  @click="buildTerraform('bi', 'terraform-data')">Azure
            BI</button>
        </div>

        </div>

        <div class="AWSController" v-show="isAWS">
        
          <div>
          <button class="btn btn-warning"  @click="buildTerraform('api', 'AWS')">AWS
            Api</button>
        </div>
        <div>
          <button class="btn btn-warning" @click="buildTerraform('appflow', 'AWS')">AWS App Flow
            Api</button>
        </div>
        </div>

      </div>
      <div class="showing" v-show="isShowing">
        <span class="maincode" v-for="(word, index) in terraform" :key="index" v-html="terraform[index]"></span>
      </div>
      <div class="ads"></div>
    </div>
  </body>

</template>
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
      isAzure: false,
      isAWS: false,
      isGCP: false,
      isOpenStack: false,
      isShowing: false,
    };
  },
  mounted() {
    this.msg
    this.terraform
    this.isAzure
    this.isShowing
  }, methods: {
    async getProvider(value: string, provider: string) {
      switch (provider) {
        case "terraform-data":
          this.isAzure = true;
          this.isAWS = false;
          this.isGCP = false;
          this.isOpenStack = false;
          break;
        case "AWS":
          this.isAzure = false;
          this.isAWS = true;
          this.isGCP = false;
          this.isOpenStack = false;
          break;
        case "GCP":
          this.isAzure = false;
          this.isAWS = false;
          this.isGCP = true;
          this.isOpenStack = false;
          break;
        case "OpenStack":
          this.isAzure = false;
          this.isAWS = false;
          this.isGCP = false;
          this.isOpenStack = true;
          break;
      }

      this.isShowing = true
      const q = query(collection(db, provider));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        var dataJson = JSON.parse(JSON.stringify(doc.data()));
        this.terraform.push(dataJson[value]);

        console.log(`${doc.id} => ${doc.data()}`);
      }
      );

    },
    async buildTerraform(value: string, provider: string) {
      const q = query(collection(db, provider));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        var dataJson = JSON.parse(JSON.stringify(doc.data()));
        this.terraform.push(dataJson[value]);

        console.log(`${doc.id} => ${doc.data()}`);
      }
      );

    },
  }
})
</script>
