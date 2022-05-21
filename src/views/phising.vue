<template>
  <v-app>
      <!--앱 바-->
    <v-app-bar elevation = "0" height = "55px" absolute dense color="#5882FA" dark>
      <v-app-bar-title>보이스 피싱 방지 어시스턴트</v-app-bar-title>
      <v-spacer></v-spacer>
      <router-link to ="/"> <v-btn icon color="white">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn></router-link>
    </v-app-bar>

    <div class= "bg">
      <div>
        <div class=blank></div>
        <span class = file><v-btn>검사</v-btn></span>
      </div>
      <br><br><br>
      <div class="texts"></div>
      <br>
      <div class="result"></div>
    </div>
    
  </v-app>
</template>

<style>
 .blank{
   border-radius: 5px;
   width : 80%; background: white;
   height: 40px;
   padding : 10px;
   float:left;
}
.file{
   border-radius: 10px;
   width : 15%;
   height: 40px;
   float:right;
}

.texts{
   border-radius : 5px;
   width : 100%; background: white;
   height: 77%;
   padding : 10px;
}

.result{
   border-radius : 5px;
   width : 100%; background: white;
   padding : 10px;
   height : 7%;

}
</style>