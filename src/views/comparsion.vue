<template>
  <v-app>
    <!--앱 바-->
    <v-app-bar elevation="0" height="55px" absolute dense color="#5882FA" dark>
      <v-app-bar-title>금융 상품 비교</v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn icon color="white">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn></router-link
      >
    </v-app-bar>

    <!-- 팝업 -->
    <div v-if="banks_popup == 1" class="calen">
      <div class="white-bg">
        <h4>은행을 선택해주세요</h4>
        <li v-for="item in banks" v-bind:key="item">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-bind:id="item" v-bind:value="item" v-model="checked_names">
            <label> {{ item }} </label>
          </div>
        </li>
      <v-btn class="button1" @click="banks_filter">적용</v-btn>
      <v-btn class="button1" @click="banks_popup = 0">닫기</v-btn>
      </div>
    </div>

    <!-- 메인 -->
    <!-- <div class="bg">
      <div class="row wrapper">
        <div class="col-9">
          <input class="full search_form" v-model="input_text" placeholder="검색어를 입력해주세요.">
        </div>
        <div class="col-3">
          <button @click="search" class="btn btn-outline-dark full" >검색</button>
        </div>
      </div>
      <div class="row wrapper">
          <div class="col-6">
            <button @click="sort_interest" class="btn btn-outline-dark btn-block full">금리순</button>
          </div>
          <div class="col-6">
            <button @click="banks_popup++" class="btn btn-outline-dark btn-block full">은행 선택</button>
          </div>
      </div> -->
    <!-- 소트 성공시 위와 바꿈 -->
    <div class="bg">
      <div class="row wrapper">
          <div class="col-3">
            <button @click="banks_popup++" class="btn btn-outline-dark btn-block full">은행 선택</button>
          </div>
        <div class="col-6">
          <input class="full search_form" v-model="input_text" placeholder="검색어를 입력해주세요.">
        </div>
        <div class="col-3">
          <button @click="search" class="btn btn-outline-dark full" >검색</button>
        </div>
      </div>
      <div class="row wrapper">
        <div class="col-4">
          <button @click="type_set_deposit" class="btn btn-outline-dark btn-block full">예금</button>
        </div>
        <div class="col-4">
          <button @click="type_set_savings" class="btn btn-outline-dark full">적금</button>
        </div>
        <div class="col-4">
          <button @click="type_set_CMA" class="btn btn-outline-dark full">CMA</button>
        </div>
      </div>

      <!-- 은행 카드 -->
      <div v-for="item in info" v-bind:key="item">
        <div v-show="item.show==1">
          <div>
            <div v-if="view_type==item.type" class="card card_wrapper">
              <div class="card-header">
                [{{item.bank_name}}][{{ item.type}}] {{ item.name}}
              </div>
              <div class="card-body">
                <div class="text_color_red">이율 최고 {{item.interest_rate}}%</div>
                {{ item.contents }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 기존내용 -->
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    show_state : 1,
    input_text : '',
    update_input : '',
    checked_names: ["NH농협", "신한", "하나", "부산", "대구", "SC제일", "수협", "제주", "카카오뱅크",
     "KDB산업", "국민", "우리", "IBK기업", "경남", "우체국", "광주", "전북", "케이뱅크", "씨티", "우리종금"],
    banks_popup: 0,
    keyword: " ",
    view_type:"예금",
    info:[
      {
        show:1,
        name:"정기예금1",
        bank_name:"우리",
        type : "예금",
        interest_rate : 3.1,
        contents:"본문내용",
      },
      {
        show:1,
        name:"정기예금2",
        bank_name:"카카오뱅크",
        type : "예금",
        interest_rate : 2.1,
        contents:"본문내용2",
      },
      {
        show:1,
        name:"우리은행3",
        bank_name:"우체국",
        type : "적금",
        interest_rate : 1.1,
        contents:"본문내용3",
      },
      {
        show:1,
        name:"우리은행4",
        bank_name:"부산",
        type : "CMA",
        interest_rate : 5.1,
        contents:"본문내용4",
      },
      {
        show:1,
        name:"우리은행",
        bank_name:"우리",
        type : "예금",
        interest_rate : 2.1,
        contents:"본문내용2",
      },
      {
        show:1,
        name:"우리은행",
        bank_name:"국민",
        type : "예금",
        interest_rate : 2.1,
        contents:"본문내용2",
      },
      {
        show:1,
        name:"우리은행",
        bank_name:"신한",
        type : "예금",
        interest_rate : 2.1,
        contents:"본문내용2",
      },
    ],
    banks : ["NH농협", "신한", "하나", "부산", "대구", "SC제일", "수협", "제주", "카카오뱅크",
     "KDB산업", "국민", "우리", "IBK기업", "경남", "우체국", "광주", "전북", "케이뱅크", "씨티", "우리종금"],
  }),
  computed: {
  },
  methods: {
    search: function (info) {
      let str = '';
      for (let i=0; i<this.info.length; i++) {
        if (this.info[i]["name"].indexOf(this.input_text)==-1 &&
         this.info[i]["bank_name"].indexOf(this.input_text)==-1 &&
         this.info[i]["type"].indexOf(this.input_text)==-1 &&
         this.info[i]["contents"].indexOf(this.input_text)==-1) {
          this.info[i]["show"] = 0;
        } else {
          this.info[i]["show"] = 1;
        }
      }
    },
    banks_filter : function(event) {
      let str = '';
      for (let i=0; i<this.info.length; i++) {
        if (this.checked_names.indexOf(this.info[i]["bank_name"])==-1) {
          this.info[i]["show"] = 0;
        } else {
          this.info[i]["show"] = 1;
        }
      }
    },
    comparator : function (a,b) {
      var sumA = this.info.name(a)
      var sumB = this.info.name(b)
      if(sumA==sumB) {
        return a.interest_rate - b.interest_rate
      } else {
        return sumA-sumB
      }
    },
    sort_interest: function(info){
      this.info.sort(function(a,b){
        return b.interest_rate - a.interest_rate
      });
      alert("테스트")
    },
    type_set_deposit: function (event) {
      this.view_type = "예금";
    },
    type_set_savings: function (event) {
      this.view_type = "적금";
    },
    type_set_CMA: function (event) {
      this.view_type = "CMA";
    },
  },
};
</script>

<style>
/* 추가내용 */

li {
  display: inline-block;
  margin: 0 10px;
}
.wrapper {
  margin: 0px 0px 0px 0px;
}
.card_wrapper{
  margin: 10px 0px 5px 0px;
}
.full {
  width: 100%;
}

.text_color_red {
  color: red;
  font-weight : bold;
}

.search_form{
  font-size: 24px;
  border:1px solid black;
}

/* 기존내용 */

a {
  text-decoration: none;
}

.bg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  background: rgb(231, 231, 231);
  height: auto;
  border-radius: 15px;
  margin-top: 70px;
  padding-left: 20px;
  padding-right: 20px;
}
.user {
  margin-left: 10px;
  border-radius: 5px;
  width: 70%;
  background: white;
  height: 40px;
  padding: 10px;
  float: right;
}
.comps {
  height: 40px;
  min-width: 100px;
  padding: 10px;
  width: 10%;
  float: left;
}
</style>
