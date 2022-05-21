<template>
    <div class= "mainbg">
        <div>
            <router-link to="/connect"><v-btn style = "height : 320px" class = "mainbtn">연결</v-btn></router-link>
            <router-link to="/apply"><v-btn style = "float : right; height : 320px" class = "mainbtn">신청</v-btn></router-link>
            <br><br>
            <router-link to="/phising"><v-btn style = "height : 320px" class = "mainbtn">피싱</v-btn></router-link>
        </div>
        <router-view/>
    </div>
</template>

<style>
.mainbg{
   position: absolute;
   left: 50%;
   transform: translateX(-50%);
   width : 95%; background: rgb(231, 231, 231);
   height: 95%;
   border-radius: 15px;
   margin-top: 5%;
   padding : 20px;
}
.mainbtn{
    width : 48%;
    height : 40%;
}
</style>