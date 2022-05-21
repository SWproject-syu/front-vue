<template>
  <v-app>
      <!--앱 바-->
    <v-app-bar elevation = "0" height = "55px" absolute dense color="#5882FA" dark>
      <v-app-bar-title>자원 봉사자 신청</v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to ="/"> <v-btn icon color="white">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn></router-link>
    </v-app-bar>

    <!-- 달력 -->
    <div v-if="cal==1" class = "calen">
    <v-date-picker
        v-model="dates"
        range
    ></v-date-picker>
    <v-btn class = "button1" @click = "cal=0">닫기</v-btn>
    </div>

    <div class= "bg">
      <div>
        <span class = comps>이름</span>
        <input class = user type="text" v-model="name">
      </div>
      <br><br>
      <div>
        <span class = comps>전화번호</span>
        <input class = user type="text" v-model="phonenumber">
      </div>
      <br><br>
      <div>
        <span class = comps>지역</span>
        <input class = user type="text" v-model="area">
      </div>
      <div class = selectdatebg>
         <div v-if = "dates[0] != ''" > {{dates[0]}}~{{dates[1]}}</div>
      </div>
      <v-btn  @click = "cal++" class = "selectdate">
          날짜 선택
      </v-btn>
      <br><br><br><br>
      <v-btn style = "width : 100%">인증번호 전송</v-btn>
      <br><br>
      <span class = comps>인증 번호</span>
      <input class = user type="text" v-model="code">
      <br><br><br>
      <v-btn style = "width : 100%">인증하기</v-btn>
      <br><br>
      <v-btn style = "width : 100%">등록하기</v-btn>
    </div>
    
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      dates: ['', ''],
      cal : 0
    }),
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
    },
  }
</script>

<style>
 a { text-decoration: none; }

 .bg{
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   width : 95%; background: rgb(231, 231, 231);
   height: 88%;
   border-radius: 15px;
   margin-top: 70px;
   padding-left : 20px;
   padding-right : 20px;
 }
 .user{
   margin-left:10px;
   border-radius: 5px;
   width : 70%; background: white;
   height: 40px;
   padding : 10px;
   float:right;
 }
.comps{
  height: 40px;
  min-width: 100px;
  padding :10px;
  width: 10%;
  float :left;
}

</style>