<template>
  <div class="mainbg">
    <div>
      <router-link to="/comparsion"
        ><v-btn style="height: 320px; font-size: 32px; font-weight: bold;" class="mainbtn"
          >금융 상품 비교</v-btn>
          </router-link
      >
      <router-link to="/phising"
        ><v-btn style="height: 320px; font-size: 32px; font-weight: bold;" class="mainbtn"
          >보이스 피싱 방지<br />어시스턴트<br />(전화 통화<br/>녹음 파일 필요)</v-btn
        ></router-link
      >
      <router-link to="/connect"
        ><v-btn style="height: 320px; font-size: 32px; font-weight: bold;" class="mainbtn"
          >뱅킹 앱<br/> 자원봉사자<br />대면 도우미<br />(자원봉사자 연결)</v-btn
        ></router-link
      >

      <router-link to="/apply"
        ><v-btn style="height: 320px; font-size: 32px; font-weight: bold;" class="mainbtn"
          >자원봉사자<br/>신청</v-btn
        ></router-link
      >
      <br /><br />
    </div>
    <router-view />
  </div>
</template>

<style>
a {
  text-decoration: none !important;
}
.mainbg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  background: rgb(231, 231, 231);
  height: 95%;
  border-radius: 15px;
  margin-top: 5%;
  padding: 20px;
}
.mainbtn {
  margin-top:10px;
  margin-left: 10px;
  width: 48%;
  height: 40%;
}
</style>
