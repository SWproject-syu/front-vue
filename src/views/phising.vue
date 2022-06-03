<template>
  <v-app>
    <!--앱 바-->
    <v-app-bar elevation="0" height="55px" absolute dense color="#5882FA" dark>
      <v-app-bar-title>보이스 피싱 방지 어시스턴트</v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn icon color="white">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn></router-link
      >
    </v-app-bar>

    <div class="bg">
      <div style="fontSize:25px; line-height:1.6em;">
      <div style="margin-bottom:16px;">
* 자동 음성 녹음 기능은 제공되지 않습니다. <br/>
* 음성 녹음 후 네이버 클로바AI앱에서 음성 파일을 텍스트로 변환 후 이용해주세요. <br/>
</div>
        <input type="file" id="soundFileInput" class="soundFileInput" accept=".txt" @change="onChangeTextFile" />

        <span class="file"><v-btn v-on:click="check" style="fontSize:25px;">검사</v-btn></span>
      </div>
      <div class="result" style="fontSize:25px;">
      {{text}}
      </div>
      
      
    </div>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  data: () => ({
    file: null,
    text: "",
  }),

  computed: {},
  methods: {
    check: function (event) {
       const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    this.text = event.target.result
  });
  reader.readAsText(this.file,"utf-8");
    },
    onChangeTextFile(e) {
      const txtFile = event.target.files[0];
      const txtSrc = window.URL.createObjectURL(txtFile);

      // let formData = new FormData();
      // formData.append("uploadFile", event.target.files[0]);
      // var nodeURL = "http://localhost:3000/upload";
      // axios.post(nodeURL, formData)
      //   .then((d) => d.data.data.body)
      //   .then((d) => {
      //     const {return_object} =JSON.parse(d);
      //     const result =return_object.recognized 
      //     console.log(result);
      //   })
      //   .catch((error) => console.log("error:", error));

      //this.$refs.source.src = txtSrc;
      this.file = txtFile;
      this.$refs.player.load(); //업로드완료 후 파일로딩
      event.target.value = ""; //다른거 업로드할때를 위해 초기화
    },
  },
};
</script>
<style>
.blank {
  border-radius: 5px;
  width: 80%;
  background: white;
  height: 40px;
  padding: 10px;
  float: left;
}
.file {
  border-radius: 10px;
  width: 15%;
  height: 40px;
  float: right;
}

.texts {
  border-radius: 5px;
  width: 100%;
  background: white;
  height: 77%;
  padding: 10px;
}

.result {
  border-radius: 5px;
  width: 100%;
  background: white;
  padding: 10px;
  height: 60vh;
  margin-top: 24px;
  white-space: pre-line;
  overflow: scroll
}
</style>
