<template>
  <v-app>
    <!-- 앱 바 -->
    <v-app-bar elevation = "0" height = "55px" absolute dense color="#5882FA" dark>
      <v-app-bar-title>자원 봉사자 연결</v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to ="/"> <v-btn icon color="white">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn></router-link>
    </v-app-bar>

    <!-- 연결 화면 -->
    <div v-for="(a,i) in lists" :key = i>
      <div class="black-bg" v-if="lists[i].popup == 1">
        <div class="white-bg">
          <h4>자원 봉사자와 연결 하시겠습니까?</h4><br>
          <p>{{lists[i].name}}</p>
          <p>{{lists[i].phone}}</p>
          <p>{{lists[i].area}}</p>
          <p>{{lists[i].startdate}} ~ {{lists[i].enddate}}</p><br>
          <div><v-btn class = "button">결정</v-btn>&emsp;<v-btn class = "button" @click = "lists[i].popup = 0">닫기</v-btn></div>
        </div>
      </div>
    </div>

     <!-- 달력 -->
    <div v-if="cal==1" class = "calen">
     <v-date-picker
      ref="picker"
      v-model="date"
      full-width
      :min="today"
      ></v-date-picker>
      <v-btn class = "button1" @click = "cal=0">닫기</v-btn>
    </div>

    <!-- 메인 -->
    <div class= "bg">
      <span class = areas>지역 선택</span>
        <div>
        <span class = comps>지역</span>
        <input class = user type="text" v-model="area">
      </div>
      <!-- <select class = selectarea v-model="searcharea">
        <option disabled value="">지역을 선택해주세요</option>
        <option v-for="(a,i) in seoul" :key = i :value = seoul[i].name>{{seoul[i].name}}</option>
      </select> -->
        <br>
        <div class = selectdatebg>
          {{date}}
        </div>
        <v-btn  @click = "cal++" class = "selectdate">
          날짜 선택
        </v-btn>
        <br>
        
        <div class="list">
          <div v-if = "searcharea === '' && date === ''">
            <div @click = "lists[i].popup++" v-for="(a,i) in lists" :key = i>
              <br>
              <p>{{lists[i].name}}</p>
              <p>{{lists[i].phone}}</p>
              <p>{{lists[i].area}}</p>
              <p>{{lists[i].startdate}} ~ {{lists[i].enddate}}</p>
              <br>
              <hr>
            </div>
          </div>
          <div v-else-if = "searcharea !== '' && date === ''">
            <div @click = "lists[i].popup++" v-for ="(a,i) in lists" :key = i>
              <div v-if = "searcharea == lists[i].area">
                <br>
                <p>{{lists[i].name}}</p>
                <p>{{lists[i].phone}}</p>
                <p>{{lists[i].area}}</p>
                <p>{{lists[i].startdate}} ~ {{lists[i].enddate}}</p>
                <br>
                <hr>
             </div>
            </div>
          </div>
          <div v-else-if = "searcharea === '' && date !== ''">
            <div @click = "lists[i].popup++" v-for ="(a,i) in lists" :key = i>
              <div v-if = "betdays[i].includes(date)">
                <br>
                <p>{{lists[i].name}}</p>
                <p>{{lists[i].phone}}</p>
                <p>{{lists[i].area}}</p>
                <p>{{lists[i].startdate}} ~ {{lists[i].enddate}}</p>
                <br>
                <hr>
             </div>
            </div>
          </div>
          <div v-else-if = "searcharea !== '' && date !== ''">
            <div @click = "lists[i].popup++" v-for ="(a,i) in lists" :key = i>
              <div v-if = "searcharea == lists[i].area && betdays[i].includes(date)">
                <br>
                <p>{{lists[i].name}}</p>
                <p>{{lists[i].phone}}</p>
                <p>{{lists[i].area}}</p>
                <p>{{lists[i].startdate}} ~ {{lists[i].enddate}}</p>
                <br>
                <hr>
             </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        <v-btn class = "button1" @click = "searcharea = '', date = ''">
          초기화
        </v-btn>
      </div>
    </v-app>
</template>

<script>
// import datas from '../assets/list.js';
import seoularea from '../assets/seoul.js';

function getDatesStartToLast(startDate, lastDate) {
	var regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
	if(!(regex.test(startDate) && regex.test(lastDate))) return "Not Date Format";
	var result = [];
	var curDate = new Date(startDate);
	while(curDate <= new Date(lastDate)) {
		result.push(curDate.toISOString().split("T")[0]);
		curDate.setDate(curDate.getDate() + 1);
	}
	return result;
}


// let betweendays = [];
// for(var num in datas){
//   betweendays[num] = getDatesStartToLast(datas[num].startdate, datas[num].enddate);
// }



export default {
  name: "volunt",
  data: () => ({
    search : 0,
    date : '',
    searcharea : '',
    betdays : [],//betweendays,
    today: new Date().toISOString().substr(0, 10),
    lists : [],//datas,
    area:"",
    seoul : seoularea,
    cal : 0,
  }),
  
  methods : {
  }
};
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
   padding : 20px;
 }
 .selectarea{
   margin-left:10px;
   border-radius: 5px;
   width : 60%; background: white;
   height: 40px;
   padding : 10px;
   float:right;
 }
 .selectdatebg{
   margin-top:10px;
   border-radius: 5px;
   width : 60%; background: white;
   height: 40px;
   padding : 10px;
  float:left;
 }
 .selectdate{
   margin-top : 10px;
   border-radius: 10px;
   width : 30%; background: white;
   height: 40px;
   float:right;
 }
 .list{
  margin-top : 40px;
  width : 100%; background:white;
  height: 75%;
  padding-left : 20px;
  padding-right : 20px;
  overflow-y: scroll;
 }
 .black-bg {
  width:100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position : fixed; padding: 20px;
  z-index: 1;
} 
.white-bg {
  
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  top: 40px;
}
.button{
  width: 45%;
}
.button1{
  margin-top : 10px;
  width: 100%;
}
.calen{
  width:100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position : fixed; padding: 20px;
  z-index: 1;
}
.areas{
  height: 40px;
  padding :10px;
  width: 30%;
  float :left;
}

</style>