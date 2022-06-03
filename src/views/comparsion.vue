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
  data: () => (
    {
    show_state : 1,
    input_text : '',
    update_input : '',
    checked_names: ["NH농협", "신한", "하나", "부산", "대구", "SC제일", "수협", "제주", "카카오뱅크",
     "KDB산업", "국민", "우리", "IBK기업", "경남", "우체국", "광주", "전북", "케이뱅크", "씨티", "우리종금"],
    banks_popup: 0,
    keyword: " ",
    view_type:"예금",
    info:[],
    /*
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
    ],*/
    banks : ["NH농협", "신한", "하나", "부산", "대구", "SC제일", "수협", "제주", "카카오뱅크",
     "KDB산업", "국민", "우리", "IBK기업", "경남", "우체국", "광주", "전북", "케이뱅크", "씨티", "우리종금"],
  }
  ),
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
  created () {
// [{"id":1,"createAt":null,"updateAt":null,"name":"김민성","phonenumber":"01022039894","location":"서울특별시 강북구","date":null,"startAt":"2022-06-13","endAt":"2022-06-16","dateDesc":null}]
      fetch("http://15.165.197.35:8081/search", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        })
        .then(d=>d.json())
          .then((response) => {
            // 파라미터 이름 변환용
              /*
    "result": {
        "prdt_div": "D",
        "total_count": "50",
        "max_page_no": "1",
        "now_page_no": "1",
        "err_cd": "000",
        "err_msg": "정상",
        "baseList": [
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001A",
                "kor_co_nm": "우리은행",
                "fin_prdt_nm": "우리 SUPER정기예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후\n- 1개월이내 : 만기시점약정이율×50%\n- 1개월초과 6개월이내: 만기시점약정이율×30%\n- 6개월초과 : 만기시점약정이율×20%\n\n※ 만기시점 약정이율 : 일반정기예금 금리",
                "spcl_cnd": "해당사항 없음",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "-만기일을 일,월 단위로 자유롭게 선택 가능\n-10년까지 자동재예치가 가능",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205271446"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001B",
                "kor_co_nm": "우리은행",
                "fin_prdt_nm": "시니어플러스우리예금\n(회전형)",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후\n- 1개월이내 : 만기시점약정이율×50%\n- 1개월초과 6개월이내: 만기시점약정이율×30%\n- 6개월초과 : 만기시점약정이율×20%\n\n※ 만기시점 약정이율 : 일반정기예금 금리",
                "spcl_cnd": "최고 연 0.4%p우대이율\n1. 5천만원 이상: 연0.2%p\n2. 이상품에 5천만원 비과세한도 사용한 후 추가로 가입한 경우:연0.2%p\n3. 우리카드사용: 연0.1%p\n4. 공과금/관리비 : 연 0.1%",
                "join_deny": "3",
                "join_member": "만 50세이상실명의 개인",
                "etc_note": "-3.4.의 경우 실적인정기간 중 필수기간 이상 주거래조건 충족해야 우대금리 제공\n- 금리 12개월 회전형상품",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205271445"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001D",
                "kor_co_nm": "우리은행",
                "fin_prdt_nm": "WON 예금",
                "join_way": "스마트폰",
                "mtrt_int": "만기 후\n- 1개월이내 : 만기시점약정이율×50%\n- 1개월초과 6개월이내: 만기시점약정이율×30%\n- 6개월초과 : 만기시점약정이율×20%\n\n※ 만기시점 약정이율 : 일반정기예금 금리",
                "spcl_cnd": "최고 연1.25%p \n만기해지시 신규일 당시 이 예금의 기본금리와 동일한 금리 추가 제공",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "-가입기간: 1~36개월\n-최소가입금액: 100만원 이상\n-가입기간별 금리안내\n 1~2개월: 기본0.75% 우대0.75%p\n 3~5개월: 기본0.90% 우대0.90%p\n 6~11개월: 기본1.00% 우대1.00%p\n 12~23개월: 기본1.20% 우대1.20%p\n 24~35개월: 기본1.23% 우대1.23%p\n 36개월: 기본1.25% 우대1.25%p",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205271444"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001E",
                "kor_co_nm": "우리은행",
                "fin_prdt_nm": "두루두루정기예금",
                "join_way": "영업점,인터넷",
                "mtrt_int": "만기 후\n- 1개월이내 : 만기시점약정이율×50%\n- 1개월초과 6개월이내: 만기시점약정이율×30%\n- 6개월초과 : 만기시점약정이율×20%\n\n※ 만기시점 약정이율 : 일반정기예금 금리",
                "spcl_cnd": "최고 연0.1%p 우대이율 -인터넷으로 가입시 0.1%p 우대금리 지급",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "-가입기간 : 1년이상 연단위\n-회전주기별 금리 차등 적용\n- 5천만원 미만 : 1개월 1.35%, 2개월 1.35%, 3개월 1.40%, 6개월 : 1.50%\n- 5천만원 이상: 1개월 1.45%, 2개월 1.45%, 3개월 1.50%, 6개월 : 1.60%",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205271442"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010002",
                "fin_prdt_cd": "00320342",
                "kor_co_nm": "한국스탠다드차타드은행",
                "fin_prdt_nm": "e-그린세이브예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월: 약정이율의 50%\n만기 후 1개월 초과 1년 이내: 약정이율의 30%\n만기 후 1년 초과: 약정이율의 10%",
                "spcl_cnd": "없음",
                "join_deny": "1",
                "join_member": "개인(개인사업자 포함)",
                "etc_note": "디지털채널 전용상품 (인터넷, 모바일뱅킹)",
                "max_limit": 499999999,
                "dcls_strt_day": "20220520",
                "dcls_end_day": "99991231",
                "fin_co_subm_day": "202205200950"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008000996000",
                "kor_co_nm": "대구은행",
                "fin_prdt_nm": "DGB주거래우대예금(첫만남고객형)",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월 미만 경과 : 약정이자율 x 50%만기 후 3개월 미만 경과 : 약정이자율 x 25% 만기 후 3개월 이상 경과 : 약정이자율 x 12%",
                "spcl_cnd": "* 최고우대금리 : 0.60%\n              \n - 목돈굴리기예금 최초 가입시 : 0.2%\n - 최근 1개월 이내 신용(체크)카드 신규 발급 시 : 0.2%\n - 최근 1개월 이내 인터넷.폰.스마트뱅킹 가입시 : 0.2%\n -*인터넷/스마트뱅킹을 통해 가입시 우대 : 0.05%",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "계좌당 가입 최저한도 : 100만원",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205311033"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001004000",
                "kor_co_nm": "대구은행",
                "fin_prdt_nm": "DGB행복파트너예금(일반형)",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월 미만 경과 : 약정이자율 x 50%만기 후 3개월 미만 경과 : 약정이자율 x 25% 만기 후 3개월 이상 경과 : 약정이자율 x 13%",
                "spcl_cnd": "* 최고우대금리 : 0.40%\n\n- 연금실적우대 : 0.1%\n- 신용(체크)카드 보유 : 0.1%\n- 거래실적우대 : 0.1%\n- DGB행복파트너적금 동시보유 : 0.1%\n- 인터넷/스마트뱅킹을 통해 가입시 : 0.05%",
                "join_deny": "3",
                "join_member": "만50세 이상 개인",
                "etc_note": "계좌당 가입 최저한도 : 100만원",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205311033"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001166004",
                "kor_co_nm": "대구은행",
                "fin_prdt_nm": "DGB함께예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월 미만 경과 : 약정이자율 x 50%만기 후 3개월 미만 경과 : 약정이자율 x 25% 만기 후 3개월 이상 경과 : 약정이자율 x 10%",
                "spcl_cnd": "* 최고우대금리 : 0.4%\n\n- 총 수신 평잔실적 or 첫만남플러스 통장 보유시 : 0.1%\n- 주택청약상품보유 : 0.1%\n- 신규일 \"DGB함께적금\" 동시 가입 후 만기일까지 보유 : 0.1%\n- 대구은행 오픈뱅킹서비스에 다른 은행 계좌 등록시 : 0.1%                       *인터넷/스마트뱅킹을 통해 가입 시 :0.05%",
                "join_deny": "1",
                "join_member": "실명의 개인 및 개인사업자",
                "etc_note": "계좌당 가입 최저한도 : 100만원",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205311033"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001278000",
                "kor_co_nm": "대구은행",
                "fin_prdt_nm": "IM스마트예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월 미만 경과 : 약정이자율 x 50%만기 후 3개월 미만 경과 : 약정이자율 x 25% 만기 후 3개월 이상 경과 : 약정이자율 x 11%",
                "spcl_cnd": "*최고우대금리 : 0.2%\n\n- 가입일(재예치일)로부터 3개월이내 아래 1가지 이상 요건 충족시\n① 주택청약종합저축 보유시\n② 대구은행 신용(체크)카드 결제실적",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "계좌당 가입 최저한도 : 100만원",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205311033"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511020000464000",
                "kor_co_nm": "대구은행",
                "fin_prdt_nm": "친환경녹색예금",
                "join_way": "영업점",
                "mtrt_int": "만기 후 1개월 미만 경과 : 약정이자율 x 50%만기 후 3개월 미만 경과 : 약정이자율 x 25% 만기 후 3개월 이상 경과 : 약정이자율 x 14%",
                "spcl_cnd": "* 최고우대금리 : 0.3%\n- 승용차요일제 참여고객 : 0.1%\n- 저공해 자동차 보유고객 : 0.05%\n- 탄소포인트제 참여고객 : 0.05%\n- 자전거타기 관련단테 가입고객  : 0.05%",
                "join_deny": "1",
                "join_member": "제한없음(국가 및 자방자치단체 제외)",
                "etc_note": "계좌당 가입 최저한도 : 100만원",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205311033"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500220002",
                "kor_co_nm": "부산은행",
                "fin_prdt_nm": "백세청춘 실버예금",
                "join_way": "영업점,스마트폰",
                "mtrt_int": "- 만기후1년내: 가입기간별 일반정기예금이율 x 50%,\n- 만기후1년초과:가입기간별 일반정기예금이율 x 20%",
                "spcl_cnd": "*우대이율\n-만 70세 미만 : 예치기간별 고시이율 +최고 연0.4%이내\n-만 70세 이상 : 예치기간별 고시이율 +최고 연0.5%이내\n-만 80세 이상 : 예치기간별 고시이율 +최고 연0.6%이내",
                "join_deny": "1",
                "join_member": "만 65세 이상의 개인",
                "etc_note": "1. 가입한도: \n5 백만원이상\n(1인 합산 1억원이하)\n2. 가입기간 : \n6개월이상~36개월 이내\n3. 만기일시지급식",
                "max_limit": 100000000,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310958"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500570002",
                "kor_co_nm": "부산은행",
                "fin_prdt_nm": "저탄소 실천 예금",
                "join_way": "영업점,인터넷,스마트폰,기타",
                "mtrt_int": "- 만기후1년내: 가입기간별 일반정기예금이율 x 50%,\n- 만기후1년초과:가입기간별 일반정기예금이율 x 20%",
                "spcl_cnd": "조건 달성여부에 따라 우대금리 적용\n*개인형 우대이율: 최대0.5%\n*기업형(개인사업자 및 법인)우대이율: 최대0.5%\n세계 환경의 날 기념 특판(개인형,기업형 가입고객 모두 적용)\n* 특판우대이율: 출시1주년 기념 고객 감사 우대이율 0.2%",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "1. 가입한도: \n3백만원이상~3억원이하 (원단위)\n2. 가입기간 :\n6개월이상~36개월 이하 (일단위)",
                "max_limit": 300000000,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310958"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500580002",
                "kor_co_nm": "부산은행",
                "fin_prdt_nm": "내맘대로 \n예금",
                "join_way": "영업점,인터넷,스마트폰,기타",
                "mtrt_int": "- 만기후1년내: 가입기간별 일반정기예금이율 x 50%,\n- 만기후1년초과:가입기간별 일반정기예금이율 x 20%",
                "spcl_cnd": "*우대이율 최대 0.2%\n- 신규시 우대이율 0.05% 및 해지시 우대이율 최대 0.15%\n- 6개월 미만 가입시 우대이율 미적용",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "1. 가입금액 :\n   1백만원 이상\n2. 가입기간 : \n1개월 이상 60개월 이하(일단위)\n3. 월이자지급식/만기일시지급식",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310958"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300027000",
                "kor_co_nm": "광주은행",
                "fin_prdt_nm": "미즈월복리정기예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기후 1개월 이내: 만기일 당시 최초 가입 기간별 일반정기예금 고시금리의 1/2 \n만기후 1개월 초과: 0.01%",
                "spcl_cnd": "▶ 최고우대금리 0.2% \n ① 요구불평잔 : 0.2% -300만원이상 0.1%, 500만원이상 0.2%\n ② 신용(체크)카드결제실적 : 0.1% -전월결제금 300만원이상 0.05%, 500만원이상 0.1%",
                "join_deny": "1",
                "join_member": "만18세이상 여성으로 실명의 개인 및 개인사업자",
                "etc_note": "1. 가입기간 : 1년이상 3년제\n2. 가입금액 : 5백만원이상 최고 50백만원",
                "max_limit": 50000000,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206031451"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300033000",
                "kor_co_nm": "광주은행",
                "fin_prdt_nm": "호랏차차디지털예금",
                "join_way": "스마트폰",
                "mtrt_int": "만기후 1개월 이내: 만기일 당시 최초 가입 기간별 일반정기예금 고시금리의 1/2 \n만기후 1개월 초과: 0.01%",
                "spcl_cnd": "▶ 신규고객 가입시 우대금리 0.35%",
                "join_deny": "1",
                "join_member": "개인 및 개인사업자",
                "etc_note": "1. 가입기간 : 12개월, 13개월\n2. 가입금액 : 1백만원이상 최고 50백만원(1인1계좌)\n※ 13개월 기본금리 1.90%, 최고금리 2.25%",
                "max_limit": 50000000,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205201344"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300034000",
                "kor_co_nm": "광주은행",
                "fin_prdt_nm": "KIA기아타이거즈우승기원예금",
                "join_way": "영업점,스마트폰",
                "mtrt_int": "만기후 1개월 이내: 만기일 당시 최초 가입 기간별 일반정기예금 고시금리의 1/2 \n만기후 1개월 초과: 0.01%",
                "spcl_cnd": "▶ 최고우대금리 0.25% \n ① 포스트시즌진출 : 0.05%  ② 정규시즌우승 : 0.1%\n ③ 한국시리즈우승 : 0.1%",
                "join_deny": "1",
                "join_member": "개인 및 개인사업자",
                "etc_note": "1. 가입기간 : 1년제\n2. 최소가입금액 : 500만원이상~1억원이하",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205201344"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000301",
                "kor_co_nm": "제주은행",
                "fin_prdt_nm": "제주Dream\n정기예금\n(개인/만기\n지급식)",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "- 만기후 1개월 이내 : (일반)정기예금 기본이자율의 50%\n(단, 최저금리 0.1%)\n- 만기후 1개월 초과 3개월 이내 : (일반)정기예금 기본이자율의 25%\n(단, 최저금리 0.1%)\n- 만기후 3개월 초과 : 0.1%",
                "spcl_cnd": "최고 연 0.1%p(항목별 0.1%p)\n①급여이체\n②적립식예금 잔액 10만원 이상 보유\n③탑스, 주거래 고객\n④결제계좌(가맹점) 전월 입금액 10만원 이상 \n⑤비과세종합저축 대상 고객\n⑥다자녀(3인이상 자녀)가정\n⑦탐나는 J연금통장 가입고객\n⑧국민연금안심통장 가입고객\n⑨공무원연금안심통장 가입고객",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "가입금액 : 1백만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205201011"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000302",
                "kor_co_nm": "제주은행",
                "fin_prdt_nm": "사이버우대\n정기예금\n(만기지급식\n-일반)",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "- 만기후 1개월 이내 : (일반)정기예금 기본이자율의 50%\n(단, 최저금리 0.1%)\n- 만기후 1개월 초과 3개월 이내 : (일반)정기예금 기본이자율의 25%\n(단, 최저금리 0.1%)\n- 만기후 3개월 초과 : 0.1%",
                "spcl_cnd": "예금 신규 가입시점 기준 기간별 우대금리 적용\n- 6개월~12개월미만: 연0.1%p\n- 12개월이상~36개월미만 :연0.30%  \n- 36개월이상 : 연0.20%\n- 아래의 우대요건 충족시 최고 0.1%p 추가 우대 \n①탐나는 J직장인통장 또는 \n②탐나는 J주거래통장 가입고객이 기본우대 요건 충족 후 이 상품 가입시 0.1%p",
                "join_deny": "1",
                "join_member": "실명의 \n개인 및 \n개인사업자",
                "etc_note": "가입금액 : 30만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205201011"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0030-0000",
                "kor_co_nm": "전북은행",
                "fin_prdt_nm": "JB시니어우대예금\n(만기일시지급식)",
                "join_way": "영업점",
                "mtrt_int": "만기후 1개월 이하 : 만기일 현재 계약기간별 정기예금 실행이율 1/2\n만기후 1개월 초과 : 연 0.01%",
                "spcl_cnd": "연0.45%이하 추가 우대",
                "join_deny": "3",
                "join_member": "만60세이상 실명의 개인으로\n전라북도 소재 영업점 : 주민등록상 주소지가 전라북도인 경우 \n전라북도 소재 이외 영업점 : 주민등록상 주소지, 원적지, 본적지가 전라북도인 경우",
                "etc_note": "가입금액 1백만원이상, 1인당 가입한도 제한없음",
                "max_limit": null,
                "dcls_strt_day": "20220524",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205241655"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0038-0000",
                "kor_co_nm": "전북은행",
                "fin_prdt_nm": "시장금리부정기예금\n(만기일시지급식)",
                "join_way": "영업점",
                "mtrt_int": "만기후 1개월 이하 : 만기일 현재 계약기간별 정기예금 실행이율 1/2\n만기후 1개월 초과 : 연 0.01%",
                "spcl_cnd": "없음",
                "join_deny": "1",
                "join_member": "제한없음\n(국가 및 지방자치단체 제외)",
                "etc_note": "가입금액 3백만원이상",
                "max_limit": null,
                "dcls_strt_day": "20220524",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205241655"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0042-0021",
                "kor_co_nm": "전북은행",
                "fin_prdt_nm": "스마트정기예금\n(만기일시지급식)",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기후 1개월 이하 : 만기일 현재 계약기간별 정기예금 실행이율 1/2\n만기후 1개월 초과 : 연 0.01%",
                "spcl_cnd": "기본우대금리 0.15%,1.가입시JB급여플러스통장보유 연0.1%, 2.최근1개월이내신용카드사용고객 연0.1%,3.예금가입기간별우대금리:2년이상연0,1%,3년이상연0.2%",
                "join_deny": "1",
                "join_member": "스마트폰뱅킹 또는 인터넷뱅킹에 가입한 개인",
                "etc_note": "가입금액 3백만원이상 5천만원이하,\n스마트폰뱅킹 가입상품",
                "max_limit": 50000000,
                "dcls_strt_day": "20220524",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205241655"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0046-0000",
                "kor_co_nm": "전북은행",
                "fin_prdt_nm": "JB 다이렉트예금통장\n(만기일시지급식)",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기후 1개월 이하 : 만기일 현재 계약기간별 정기예금 실행이율 1/2\n만기후 1개월 초과 : 연 0.01%",
                "spcl_cnd": "없음",
                "join_deny": "1",
                "join_member": "실명의 개인(임의단체 제외)",
                "etc_note": "가입금액 1계좌당 1백만원이상 10억원이하,\n1인당  총 10억원 이하,\n인터넷/스마트폰뱅킹 가입상품",
                "max_limit": 1000000000,
                "dcls_strt_day": "20220524",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205241655"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0054-0000",
                "kor_co_nm": "전북은행",
                "fin_prdt_nm": "JB주거래예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기후 1개월 이하 : 만기일 현재\n계약기간별 정기예금 실행이율 1/2\n만기후 1개월 초과 : 연 0.01%",
                "spcl_cnd": "추가우대:최고연0.6%우대 ①첫거래또는장기거래고객연0.1%우대,②JB주거래통장보유연0.1%우대,③카드매입(승인)실적연0.1%우대,④공과금출금연0.1%우대,⑤급여/연금/제로페이/가맹점대금입금실적연0.2%우대",
                "join_deny": "1",
                "join_member": "실명의 개인 및 개인사업자",
                "etc_note": "계좌별 가입금액 최저 1백만원이상\n고객별 가입금액 최고 5억원이내",
                "max_limit": 500000000,
                "dcls_strt_day": "20220524",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205241655"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001115",
                "kor_co_nm": "경남은행",
                "fin_prdt_nm": "BNK더조은정기예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월 이내: 일반정기예금 기본이율 Ⅹ50%\n만기 후 1개월 초과: 일반정기예금 기본이율 Ⅹ20%",
                "spcl_cnd": "①가입금액 20백만원 이상인 경우 0.20%\n②이 예금 신규시 금리우대쿠폰 등록할 경우 0.20%\n③ 경남은행 오픈뱅킹 서비스에 가입되어 있는 경우(만기시까지 해당서비스 유지하는 경우) 0.10%",
                "join_deny": "1",
                "join_member": "거래대상자는 제한을 두지 아니한다. 다만, 국가 및 지방자치단체는 이 예금을 거래할 수 없다.",
                "etc_note": "1. 이 예금의 계약기간은 3개월 이상 2년 이내 월단위로 한다.\n2. 가입금액은 1인당 최소 100만원 이상 5억원 이하이다.",
                "max_limit": 500000000,
                "dcls_strt_day": "20220602",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206021653"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001203",
                "kor_co_nm": "경남은행",
                "fin_prdt_nm": "BNK주거래우대정기예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기 후 1개월 이내: 일반정기예금 기본이율 Ⅹ50%\n만기 후 1개월 초과: 일반정기예금 기본이율 Ⅹ20%",
                "spcl_cnd": "①급여,연금,가맹점대금 중 한 종류 입금할 경우 0.10%\n②당행 신용/체크카드 결제실적 보유할 경우 0.10%\n③가입일 기준 6개월이내 당행 정기예금 미보유 신규 고객인 경우 0.10%",
                "join_deny": "1",
                "join_member": "개인 및 개인사업자",
                "etc_note": "1. 이 예금의 계약기간은 6개월, 1년, 2년으로 한다.\n2. 1인 1계좌이며, 가입금액은 최소 1백만원 이상 최고 1억원 이하이다.",
                "max_limit": 100000000,
                "dcls_strt_day": "20220602",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206021653"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511810025",
                "kor_co_nm": "중소기업은행",
                "fin_prdt_nm": "IBK D-DAY통장",
                "join_way": "스마트폰",
                "mtrt_int": "만기일 당시 단기중금채 만기후금리 적용\n- 1개월 이내: 만기일 당시 약정금리×50%\n- 1월 초과 6개월 이내: 만기일 당시 약정금리×30%\n- 6개월 초과: 만기일 당시 약정금리×20%",
                "spcl_cnd": "없음",
                "join_deny": "1",
                "join_member": "실명의  개인",
                "etc_note": "비대면전용상품",
                "max_limit": 200000000,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206030902"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511830090",
                "kor_co_nm": "중소기업은행",
                "fin_prdt_nm": "IBK 늘푸른하늘통장",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기일 당시 중금채(복리채) 만기후금리 적용\n- 1개월 이내: 만기일 당시 약정금리×50%\n- 1월 초과 6개월 이내: 만기일 당시 약정금리×30%\n- 6개월 초과: 만기일 당시 약정금리×20%",
                "spcl_cnd": "다음 중 1가지 이상 충족시 0.25%p 우대                        대중교통이용 / 친환경차량 이용 / 노후경유차 폐차 및 저감장치 부착",
                "join_deny": "1",
                "join_member": "실명의  개인",
                "etc_note": "영업점 및 비대면 신규 가능",
                "max_limit": null,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206030901"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511830092",
                "kor_co_nm": "중소기업은행",
                "fin_prdt_nm": "IBK 첫만남통장",
                "join_way": "스마트폰",
                "mtrt_int": "만기일 당시 중금채(복리채) 만기후금리 적용\n- 1개월 이내: 만기일 당시 약정금리×50%\n- 1월 초과 6개월 이내: 만기일 당시 약정금리×30%\n- 6개월 초과: 만기일 당시 약정금리×20%",
                "spcl_cnd": "없음",
                "join_deny": "1",
                "join_member": "실명의  개인",
                "etc_note": "오픈뱅킹서비스를 이용한 디지털 \n고객 맞춤형 비대면 전용상품",
                "max_limit": 10000000,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206030902"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05100",
                "kor_co_nm": "한국산업은행",
                "fin_prdt_nm": "정기예금",
                "join_way": "영업점,인터넷",
                "mtrt_int": "지급일 현재 고시된 이 예금의 만기후 이율",
                "spcl_cnd": "해당없음",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "해당없음",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301406"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05702",
                "kor_co_nm": "한국산업은행",
                "fin_prdt_nm": "KDBdream 정기예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "* 만기후 1년 이내 :\n 만기일 현재 고시된 일반 정기예금 해당기간 기본이자율의 1/2\n* 만기후 1년 초과 :\n만기일 현재 고시된 보통예금 이자율",
                "spcl_cnd": "* KDBdream Account 가입고객이 이 예금을 가입하는 경우, 0.10%P 가산",
                "join_deny": "1",
                "join_member": "개인(개인사업자 및 임의단체 포함)",
                "etc_note": "해당없음",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301402"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05705",
                "kor_co_nm": "한국산업은행",
                "fin_prdt_nm": "KDB Hi 정기예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "* 만기후 1년 이내 :\n 만기일 현재 고시된 일반 정기예금 해당기간 기본이자율의 1/2\n* 만기후 1년 초과 :\n만기일 현재 고시된 보통예금 이자율",
                "spcl_cnd": "해당없음",
                "join_deny": "1",
                "join_member": "KDB Hi 입출금통장에 가입한 개인(개인사업자 및 임의단체 제외)\n단, 국민인 거주자에 한함",
                "etc_note": "해당없음",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301408"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100251",
                "kor_co_nm": "국민은행",
                "fin_prdt_nm": "KB국민첫재테크예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "- 1개월 이내 : 기본이율 X 50%\n- 1개월 초과  ~ 3개월 이내 : 기본이율 X 30%\n- 3개월 초과 : 0.1%",
                "spcl_cnd": "우대이율 최고 연0.2%p\n - 첫예금 우대이율 : 연0.1%p\n - 패키지 우대이율 : 연0.1%p\n - 급여이체 우대이율 : 연0.1%p\n - 재예치 우대이율 : 연0.1%p",
                "join_deny": "1",
                "join_member": "만18세 이상 ~ 만38세 이하 개인",
                "etc_note": "1인당 가입한도 : 2천만원",
                "max_limit": 20000000,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310850"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100293",
                "kor_co_nm": "국민은행",
                "fin_prdt_nm": "KB골든라이프연금우대예금",
                "join_way": "영업점",
                "mtrt_int": "- 연0.1%",
                "spcl_cnd": "우대이율 최고 연0.2%p\n - 연금실적 우대이율 : 연0.1%p\n - 한가족사랑 우대이율 : 연0.1%p",
                "join_deny": "1",
                "join_member": "실명의 개인 또는 개인사업자",
                "etc_note": "해당없음",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310851"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100312",
                "kor_co_nm": "국민은행",
                "fin_prdt_nm": "KB Young Youth 증여예금",
                "join_way": "영업점",
                "mtrt_int": "- 연0.1%",
                "spcl_cnd": "우대이율 최고 연0.1%p\n - 체크카드 우대이율 : 연0.1%p",
                "join_deny": "1",
                "join_member": "실명의 개인 또는 개인사업자",
                "etc_note": "- 상품유형\n  ㅇ 원금일시지급식\n  ㅇ 원금균등분할지급식",
                "max_limit": null,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310849"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100335",
                "kor_co_nm": "국민은행",
                "fin_prdt_nm": "KB Star 정기예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "- 1개월 이내 : 기본이율 X 50%\n- 1개월 초과  ~ 3개월 이내 : 기본이율 X 30%\n- 3개월 초과 : 0.1%",
                "spcl_cnd": "해당무",
                "join_deny": "1",
                "join_member": "실명의 개인 또는 개인사업자",
                "etc_note": "- 가입금액 : 1백만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205300940"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100353",
                "kor_co_nm": "국민은행",
                "fin_prdt_nm": "KB Green Wave 1.5℃ 정기예금",
                "join_way": "영업점,스마트폰",
                "mtrt_int": "- 1개월 이내 : 기본이율 X 50%\n- 1개월 초과  ~ 3개월 이내 : 기본이율 X 30%\n- 3개월 초과 : 0.1%",
                "spcl_cnd": "우대이율 최고 연0.45%p\n - 지구수호대 우대이율 : 연0.15%p\n - 친환경패키지 우대이율 : 연0.15%p\n - KB모바일인증서 우대이율 : 연0.15%p",
                "join_deny": "1",
                "join_member": "실명의 개인 또는 개인사업자",
                "etc_note": "- 1인 1계좌 \n- 10만좌 가입 시 판매 종료",
                "max_limit": 10000000,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310848"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100354",
                "kor_co_nm": "국민은행",
                "fin_prdt_nm": "KB 더블모아 예금",
                "join_way": "영업점,전화(텔레뱅킹)",
                "mtrt_int": "- 1개월 이내 : 기본이율 X 50%\n- 1개월 초과  ~ 3개월 이내 : 기본이율 X 30%\n- 3개월 초과 : 0.1%",
                "spcl_cnd": "우대이율 최고 연0.7%p\n - 주거래 우대이율 : 연0.55%p\n - 패키지 우대이율 : 연0.15%p\n - 오픈뱅킹 우대이율 : 연0.15%p",
                "join_deny": "1",
                "join_member": "만50세이상 실명의 개인",
                "etc_note": "- 개인사업자, 관련서류 미제출 임의단체, 공동명의 가입불가\n- 가입금액 : 1천만원 이상 ~ 4천만원 이하\n- 10만좌 가입 시 판매 종료",
                "max_limit": 40000000,
                "dcls_strt_day": "20220531",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205310849"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0037-15",
                "kor_co_nm": "신한은행",
                "fin_prdt_nm": "미래설계 크레바스 연금예금",
                "join_way": "영업점",
                "mtrt_int": "-1개월 이하: (일반) 정기예금 기본금리 1/2\n(단, 최저금리 0.10%)\n-1개월 초과~6개월 이하: (일반) 정기예금 기본금리의 1/4\n(단, 최저금리 0.10%)\n-6개월 초과:  0.10%",
                "spcl_cnd": "해당사항없음",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "1. 가입한도 : \n3백만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301614"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-12",
                "kor_co_nm": "신한은행",
                "fin_prdt_nm": "쏠편한 정기예금",
                "join_way": "인터넷,스마트폰,기타",
                "mtrt_int": "-1개월 이하: (일반) 정기예금 기본금리 1/2\n(단, 최저금리 0.10%)\n-1개월 초과~6개월 이하: (일반) 정기예금 기본금리의 1/4\n(단, 최저금리 0.10%)\n-6개월 초과:  0.10%",
                "spcl_cnd": "해당사항없음",
                "join_deny": "1",
                "join_member": "만14세이상 개인고객",
                "etc_note": "1. 가입한도 :\n 1만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301611"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-17",
                "kor_co_nm": "신한은행",
                "fin_prdt_nm": "아름다운 용기 정기예금",
                "join_way": "영업점,스마트폰",
                "mtrt_int": "-1개월 이하: (일반) 정기예금 기본금리 1/2\n(단, 최저금리 0.10%)\n-1개월 초과~6개월 이하: (일반) 정기예금 기본금리의 1/4\n(단, 최저금리 0.10%)\n-6개월 초과:  0.10%",
                "spcl_cnd": "※ 가산금리 최고 0.15%\n- 실천 서약 0.15%\n- 비대면,무통장등 0.15%\n- 아름다운 용기적금 가입 0.15%\n- 신규시점 만 65세이상 0.15%",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "1. 가입한도 :\n 300만원 이상",
                "max_limit": 30000000,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301613"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0136-01",
                "kor_co_nm": "신한은행",
                "fin_prdt_nm": "신한 S드림 정기예금",
                "join_way": "영업점,전화(텔레뱅킹)",
                "mtrt_int": "-1개월 이하: (일반) 정기예금 기본금리 1/2\n(단, 최저금리 0.10%)\n-1개월 초과~6개월 이하: (일반) 정기예금 기본금리의 1/4\n(단, 최저금리 0.10%)\n-6개월 초과:  0.10%",
                "spcl_cnd": "해당사항없음",
                "join_deny": "1",
                "join_member": "제한없음",
                "etc_note": "1. 가입한도 :\n 3백만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220530",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205301612"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1225-0001",
                "kor_co_nm": "농협은행주식회사",
                "fin_prdt_nm": "NH왈츠회전예금 II",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후 3개월 : 기본금리의 50%\n만기 후 6개월 : 기본금리의 20%\n만기 후 6개월 초과 : 기본금리의 10%\n\n* 기본금리 : 만기시점의 일반정기예금 계약기간별 금리",
                "spcl_cnd": "1. 급여이체실적(50만원 이상)이 있는 경우 : 0.1%p\n2. 트리플 회전 우대이율 :  4회전기간부터 0.1%p",
                "join_deny": "1",
                "join_member": "개인",
                "etc_note": "※ 기본금리 및 최고 우대금리 항목은 가입기간이 아닌 ‘회전주기’기간별 금리를 공시\n - 회전주기는 1개월 이상 12개월 이내 월단위로 선택 가능\n※ 전월취급평균금리는 본 홈페이지에 공시되지 않는 회전기간 6개월 미만의 계좌들도 포함하여 산출하기 때문에 회전기간별로 공시된 기본금리보다 낮게 보여질 수 있음",
                "max_limit": null,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206030954"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1267-0003",
                "kor_co_nm": "농협은행주식회사",
                "fin_prdt_nm": "e-금리우대 예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기 후 3개월 : 기본금리의 50%\n만기 후 6개월 : 기본금리의 20%\n만기 후  6개월 초과 : 기본금리의 10%\n\n* 기본금리 : 만기시점의 일반정기예금 계약기간별 금리",
                "spcl_cnd": "1. NH채움카드 이용실적 100만원 : 0.1%p\n2. 추천계좌와 피추천계좌에 각각 : 0.1 %p, 최대 0.3%p\n※ 추천 및 피추천 횟수 5회",
                "join_deny": "1",
                "join_member": "개인",
                "etc_note": "1. 1인당 가입한도 : 3억원\n2. 인터넷/스마트뱅킹 전용상품",
                "max_limit": 300000000,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206030954"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1381-0001",
                "kor_co_nm": "농협은행주식회사",
                "fin_prdt_nm": "NH내가Green초록세상예금",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "만기 후 3개월 : 기본금리의 50%\n만기 후 6개월 : 기본금리의 20%\n만기 후  6개월 초과 : 기본금리의 10%\n\n* 기본금리 : 만기시점의 일반정기예금 계약기간별 금리",
                "spcl_cnd": "※ 우대금리 최대한도 : 0.4%p(연%, 세전)\n1. 온실가스 줄이기 실천서약서 동의 : 0.1%p\n2. 통장미발급 : 0.1%p\n3. 손하나로인증 서비스 등록 : 0.1%p\n4. NH내가Green초록세상적금 동시 보유 : 0.1%p",
                "join_deny": "1",
                "join_member": "개인",
                "etc_note": "1. 300만원이상 가입\n2. 온실가스 줄이기 실천서약서 동의시 가입가능\n3. 신규가입 계좌당 2천원씩 녹색환경기금 적립\n※ 자세한 사항은 상품설명서 참조",
                "max_limit": null,
                "dcls_strt_day": "20220603",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206030954"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013909",
                "fin_prdt_cd": "4",
                "kor_co_nm": "하나은행",
                "fin_prdt_nm": "하나의정기예금",
                "join_way": "스마트폰",
                "mtrt_int": "1개월이내 : 지급당시 해당기간 일반정기예금 월이자지급식 기본금리 1/2\n1개월초과 : 지급당시 해당기간 일반정기예금 월이자지급식 기본금리 1/4",
                "spcl_cnd": "해당사항없음",
                "join_deny": "1",
                "join_member": "실명의 개인\n또는 개인사업자",
                "etc_note": "1. 가입금액: 1백만원이상\n2. 1인 최대가입한도 : 제한 없음",
                "max_limit": null,
                "dcls_strt_day": "20220602",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206021558"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014674",
                "fin_prdt_cd": "01013000110000000001",
                "kor_co_nm": "주식회사 케이뱅크",
                "fin_prdt_nm": "코드K 정기예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "만기 후 \n- 1개월 이내 : 만기시점 기본금리 X 50%\n- 1개월 초과~6개월 이내 : 만기시점 기본금리 X 30%\n- 6개월 초과 : 연 0.20%",
                "spcl_cnd": "우대조건 없음",
                "join_deny": "1",
                "join_member": "만 17세 이상 실명의 개인 및 개인사업자",
                "etc_note": "가입금액 : 1만원 이상\n가입기간 : 1개월~36개월",
                "max_limit": 1000000000,
                "dcls_strt_day": "20220602",
                "dcls_end_day": null,
                "fin_co_subm_day": "202206021059"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120110400011",
                "kor_co_nm": "수협은행",
                "fin_prdt_nm": "Sh평생주거래우대예금\n(만기일시지급식)",
                "join_way": "영업점",
                "mtrt_int": "* 만기후 1년 이내\n - 만기당시 일반정기예금(월이자지급식) 계약기간별 기본금리 1/2\n* 만기후 1년 초과\n - 만기당시 보통예금 기본금리",
                "spcl_cnd": "* 최대우대금리 : 0.4%\n1. 거래고객우대금리 : 최대0.1% (신규시) \n -최초예적금고객/재예치/장기거래 각 0.05% \n2. 거래실적우대금리 : 최대0.3% (만기시)\n -급여,연금이체등/수협카드결제/공과금이체등 각0.1%\n※단위:연%p",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "- 1인 1계좌\n- 최저 100만원 이상",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205200836"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120114300011",
                "kor_co_nm": "수협은행",
                "fin_prdt_nm": "Sh해양플라스틱Zero!예금\n(만기일시지급식)",
                "join_way": "영업점,인터넷,스마트폰",
                "mtrt_int": "* 만기후 1년 이내\n - 만기당시 일반정기예금(월이자지급식) 계약기간별 기본금리 1/2\n* 만기후 1년 초과\n - 만기당시 보통예금 기본금리",
                "spcl_cnd": "* 최대우대금리:0.35%\n1. 해양플라스틱감축서약 : 0.1% (신규시) \n2. 봉사활동 또는 상품홍보 : 0.15% (만기시) \n3. 입출금통장 최초신규 : 0.1% (만기시)\n4. 자동이체 출금실적 : 0.1% (만기시)\n - 수협신용카드 / 당행 펀드 또는 적금 / 수협체크카드\n※단위:연%p",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "- 1인 다계좌 가능. \n  단,  합산금액 5억원 이내 \n- 최저 100만원 이상",
                "max_limit": 500000000,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205200836"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120114700011",
                "kor_co_nm": "수협은행",
                "fin_prdt_nm": "헤이(Hey)정기예금",
                "join_way": "인터넷,스마트폰",
                "mtrt_int": "* 만기후 1년 이내\n - 만기당시 일반정기예금(월이자지급식 기준) 계약기간별 기본금리 1/2\n* 만기후 1년 초과\n - 만기당시 보통예금 기본금리",
                "spcl_cnd": "없음",
                "join_deny": "1",
                "join_member": "실명의 개인",
                "etc_note": "-1인 다계좌 가능.\n 단, 합산금액 최대 2억원 이내\n-최저 10만원 이상",
                "max_limit": 200000000,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205200836"
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0015130",
                "fin_prdt_cd": "10-01-20-388-0002",
                "kor_co_nm": "주식회사 카카오뱅크",
                "fin_prdt_nm": "카카오뱅크 정기예금",
                "join_way": "스마트폰",
                "mtrt_int": "- 만기 후 1개월 이내 : 가입(또는 자동연장)시점 기본금리x50%\n- 만기 후 1개월초과 3개월 이내 : 가입(또는 자동연장)시점 기본금리x30%\n- 만기 후 3개월 초과 : 0.20%",
                "spcl_cnd": "※복잡한 우대조건 없이 가입가능한 정기예금",
                "join_deny": "1",
                "join_member": "만 17세 이상의 실명의 개인",
                "etc_note": "1. 가입방법 : 스마트폰\n2. 가입금액 : 100만원 이상(원단위)\n3. 가입기간 : 1개월 이상 ~ 36개월 이하(월, 일단위 지정 가능)",
                "max_limit": null,
                "dcls_strt_day": "20220520",
                "dcls_end_day": null,
                "fin_co_subm_day": "202205200906"
            }
        ],
        "optionList": [
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001A",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.75,
                "intr_rate2": 1.75
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001A",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.9,
                "intr_rate2": 1.9
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001A",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.1,
                "intr_rate2": 2.1
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001A",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.2,
                "intr_rate2": 2.2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001B",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.55,
                "intr_rate2": 1.95
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001D",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1,
                "intr_rate2": 2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001D",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.2,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001D",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.23,
                "intr_rate2": 2.46
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001D",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.25,
                "intr_rate2": 2.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010001",
                "fin_prdt_cd": "WR0001E",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.6,
                "intr_rate2": 1.7
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010002",
                "fin_prdt_cd": "00320342",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.8,
                "intr_rate2": 1.8
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010002",
                "fin_prdt_cd": "00320342",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.3,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008000996000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.82,
                "intr_rate2": 2.47
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008000996000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.41,
                "intr_rate2": 3.06
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008000996000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.43,
                "intr_rate2": 3.08
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008000996000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.45,
                "intr_rate2": 2.1
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001004000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.57,
                "intr_rate2": 2.02
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001004000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.1,
                "intr_rate2": 2.61
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001004000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.18,
                "intr_rate2": 2.63
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001004000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.2,
                "intr_rate2": 2.65
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001166004",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.96,
                "intr_rate2": 2.41
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001278000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.75,
                "intr_rate2": 1.95
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001278000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.3,
                "intr_rate2": 2.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001278000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.35,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511008001278000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.4,
                "intr_rate2": 2.6
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511020000464000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.52,
                "intr_rate2": 1.77
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511020000464000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.11,
                "intr_rate2": 2.36
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511020000464000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.13,
                "intr_rate2": 2.38
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010016",
                "fin_prdt_cd": "10511020000464000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.15,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500220002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.5,
                "intr_rate2": 2.1
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500220002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.7,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500220002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.75,
                "intr_rate2": 2.35
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500220002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.8,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500570002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.85,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500570002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.1,
                "intr_rate2": 2.8
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500570002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.2,
                "intr_rate2": 2.9
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500570002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.3,
                "intr_rate2": 3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500580002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.85,
                "intr_rate2": 2.05
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500580002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.2,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500580002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.5,
                "intr_rate2": 2.7
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010017",
                "fin_prdt_cd": "01030500580002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.6,
                "intr_rate2": 2.8
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300027000",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "12",
                "intr_rate": 2.45,
                "intr_rate2": 2.65
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300027000",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "24",
                "intr_rate": 2.78,
                "intr_rate2": 2.98
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300027000",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "36",
                "intr_rate": 2.97,
                "intr_rate2": 3.17
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300033000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.95,
                "intr_rate2": 2.45
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010019",
                "fin_prdt_cd": "TD11300034000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.15,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000301",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.5,
                "intr_rate2": 1.6
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000301",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.55,
                "intr_rate2": 1.65
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000301",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.6,
                "intr_rate2": 1.7
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000301",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.65,
                "intr_rate2": 1.75
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000302",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.5,
                "intr_rate2": 1.7
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000302",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.55,
                "intr_rate2": 1.95
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000302",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.6,
                "intr_rate2": 2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010020",
                "fin_prdt_cd": "200000302",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.65,
                "intr_rate2": 1.95
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0030-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.4,
                "intr_rate2": 1.85
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0038-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.1,
                "intr_rate2": 1.1
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0038-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.4,
                "intr_rate2": 1.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0038-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.5,
                "intr_rate2": 1.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0038-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.55,
                "intr_rate2": 1.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0042-0021",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.1,
                "intr_rate2": 1.45
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0042-0021",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.4,
                "intr_rate2": 1.75
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0042-0021",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.5,
                "intr_rate2": 1.95
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0042-0021",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.55,
                "intr_rate2": 2.1
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0046-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.9,
                "intr_rate2": 1.9
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0046-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.4,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0054-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.15,
                "intr_rate2": 1.75
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0054-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.2,
                "intr_rate2": 1.8
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010022",
                "fin_prdt_cd": "10-01-20-024-0054-0000",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.25,
                "intr_rate2": 1.85
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001115",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.75,
                "intr_rate2": 2.25
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001115",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2,
                "intr_rate2": 2.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001115",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.05,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001203",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 2,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001203",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.25,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010024",
                "fin_prdt_cd": "21001203",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.3,
                "intr_rate2": 2.6
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511810025",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 2.34,
                "intr_rate2": 2.34
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511810025",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.75,
                "intr_rate2": 2.75
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511830090",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.46,
                "intr_rate2": 2.71
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010026",
                "fin_prdt_cd": "01511830092",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.71,
                "intr_rate2": 2.71
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05100",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.5,
                "intr_rate2": 1.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05100",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.7,
                "intr_rate2": 1.7
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05100",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.3,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05100",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.5,
                "intr_rate2": 2.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05702",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.95,
                "intr_rate2": 2.05
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05702",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.3,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05702",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.5,
                "intr_rate2": 2.6
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010030",
                "fin_prdt_cd": "05705",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.5,
                "intr_rate2": 2.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100251",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "6",
                "intr_rate": 1.75,
                "intr_rate2": 1.95
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100251",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "12",
                "intr_rate": 1.85,
                "intr_rate2": 2.05
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100293",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "12",
                "intr_rate": 2.05,
                "intr_rate2": 2.25
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100312",
                "intr_rate_type": "M",
                "intr_rate_type_nm": "복리",
                "save_trm": "12",
                "intr_rate": 1.9,
                "intr_rate2": 2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100335",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.97,
                "intr_rate2": 1.97
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100335",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.24,
                "intr_rate2": 2.24
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100335",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.29,
                "intr_rate2": 2.29
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100335",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.37,
                "intr_rate2": 2.37
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100353",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.85,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0010927",
                "fin_prdt_cd": "010300100354",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.85,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0037-15",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.05,
                "intr_rate2": 2.05
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0037-15",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.2,
                "intr_rate2": 2.2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0037-15",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.4,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-12",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.6,
                "intr_rate2": 1.85
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-12",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.85,
                "intr_rate2": 2.25
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-12",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.05,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-12",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.15,
                "intr_rate2": 2.35
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0135-17",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.15,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0136-01",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.6,
                "intr_rate2": 1.6
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0136-01",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.85,
                "intr_rate2": 1.85
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0136-01",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.05,
                "intr_rate2": 2.05
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0011625",
                "fin_prdt_cd": "200-0136-01",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.15,
                "intr_rate2": 2.15
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1225-0001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.87,
                "intr_rate2": 1.97
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1225-0001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.29,
                "intr_rate2": 2.39
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1267-0003",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.95,
                "intr_rate2": 2.35
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1381-0001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.85,
                "intr_rate2": 2.25
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1381-0001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.9,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013175",
                "fin_prdt_cd": "10-003-1381-0001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.15,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013909",
                "fin_prdt_cd": "4",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.6,
                "intr_rate2": 2.2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013909",
                "fin_prdt_cd": "4",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.7,
                "intr_rate2": 2.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013909",
                "fin_prdt_cd": "4",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 1.8,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0013909",
                "fin_prdt_cd": "4",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 1.9,
                "intr_rate2": 2.55
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014674",
                "fin_prdt_cd": "01013000110000000001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 2.3,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014674",
                "fin_prdt_cd": "01013000110000000001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 3,
                "intr_rate2": 3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014674",
                "fin_prdt_cd": "01013000110000000001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 3.2,
                "intr_rate2": 3.2
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014674",
                "fin_prdt_cd": "01013000110000000001",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 3.5,
                "intr_rate2": 3.5
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120110400011",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.95,
                "intr_rate2": 2.35
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120114300011",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.55,
                "intr_rate2": 1.9
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120114300011",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 1.95,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120114700011",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.9,
                "intr_rate2": 1.9
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0014807",
                "fin_prdt_cd": "10120114700011",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.3,
                "intr_rate2": 2.3
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0015130",
                "fin_prdt_cd": "10-01-20-388-0002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "6",
                "intr_rate": 1.8,
                "intr_rate2": 1.8
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0015130",
                "fin_prdt_cd": "10-01-20-388-0002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "12",
                "intr_rate": 2.25,
                "intr_rate2": 2.25
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0015130",
                "fin_prdt_cd": "10-01-20-388-0002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "24",
                "intr_rate": 2.4,
                "intr_rate2": 2.4
            },
            {
                "dcls_month": "202205",
                "fin_co_no": "0015130",
                "fin_prdt_cd": "10-01-20-388-0002",
                "intr_rate_type": "S",
                "intr_rate_type_nm": "단리",
                "save_trm": "36",
                "intr_rate": 2.7,
                "intr_rate2": 2.7
            }
        ]
    }
}*/

            this.info = response.result.baseList.map((item)=>{
              return {
                ...item,
        show:1,
        name:item.fin_prdt_nm,//"우리은행",
        bank_name:item.kor_co_nm,//"신한",
        type : item.fin_prdt_nm.includes("예금") ?"예금" : item.fin_prdt_nm.includes("적금") ? "적금" : "CMA",
        interest_rate : item.mtrt_int,
        contents:item.join_member+","+item.etc_note,
              }
            })
          })
          .catch((error) => console.log("error:", error));
    }
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
