<template>
  <div>
      上料开工C01
      <button @click="showdddd">idtest</button>
      <button @click="AddOneUser">AddoneUser</button>
      <button @click="startOrStopTimer">startOrStopTimer</button>

      <div>{{timer1start}}</div>
      <span>随机验证码为： {{checkCode}}</span>
  </div>
</template>

<script>
import axios from "axios"; //在单独用到的地方引用 axios 包

export default {
  name: "main_C01",  //本页面的组件名，一般定义成路由名一样
  data() {
    return {
      rsp: [1, 2, 3],
      timer1start: false,
      checkCode: ""
    };
  },
  methods: {
    showdddd() {
      axios
        .get("http://localhost/TRX/api/AuthPower/5")
        .then(res => {
          //一定要采用箭头函数，才能使用this
          this.rsp = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    AddOneUser() {
      axios
        .post("http://localhost/TRX/api/AuthPower/AddUser", {
          loginid: "rbf",
          fullname: "傅明东",
          password: "1234",
          group_code: "superadmin",
          group_desc: "超级用户组",
          role_code: "superUserRole",
          role_desc: "超级管理员",
          super_user: "Y",
          fmale: "男",
          email: "huaxiao168@126.com",
          phone: "15802148508",
          u_create_id: "system",
          u_create_name: "系统自动",
          u_update_id: "system",
          u_update_name: "系统自动",
          factory_num: "01",
          warehouse_num: "01"
        })
        .then(respone => {
          alert(respone.status);
        })
        .catch(error => {
          alert(error);
        });
    },
    startOrStopTimer() {
      if (this.timer1start) {
        this.timer1start = false; 
        alert(this.timer1start);
      } else {
        this.timer1start = true;
        var ss= setInterval(() => {
          if(this.timer1start==false){
            clearInterval(ss);
          }
          else{
            this.createRandomCode()
          } 
        },2000);
      }
    },
    getData() {},
    createRandomCode() {
      var randomcode ='';
      var codeLength = 4; //验证码的长度
      var rdChars = new Array(  0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ); //随机数
      for (var i = 0; i < codeLength; i++) {
        //循环操作
        var index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）
        randomcode += rdChars[index]; //根据索引取得随机数加到randomcode上
      }
      this.checkCode = randomcode; //把randomcode值赋给验证码
    }
  }
};
</script>

