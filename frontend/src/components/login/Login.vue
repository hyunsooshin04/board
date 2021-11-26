<template>
  <div class="login">
    <h1>로그인</h1><br>
    Id : <input type="text" v-model="id"><br>
    pw : <input type="password" v-model="password"><br>
    <button v-on:click="login">로그인</button>
    <button v-on:click="signup">회원가입</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      id: "",
      password: "",
      form: '',
      body: this.$route.query,
      isLogin: '',
      name: 'Guest',
    }
  },
  methods: {
    login() {
      if (this.id == "") {
        alert("아이디를 입력해주세요.")
      } else if (this.pwd == "") {
        alert("패스워드를 입력해주세요.")
      } else {
        this.form = {
          id: this.id,
          password: this.password
        }

        this.$axios.get('http://localhost:3000/api/login/' + this.id + "/" + this.password)
            .then((res) => {
              this.isLogin = res.data.isLogin;
              this.name = res.data.name;
              this.id = res.data.id;
            })
      }
    },
    signup() {
      location.href = "http://localhost:8080/signup"
    }
    // setCookie(c_name, value, exdays) {
    //   var exdate = new Date();
    //   exdate.setDate(exdate.getDate() + exdays);
    //   var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    //   document.cookie = c_name + "=" + c_value;
    // }
  },
  watch: {
    isLogin() {
      const isLogin = this.isLogin;
      const name = this.name;
      console.log(name)
      if (isLogin == 'true') {
        alert("로그인 완료");
        // this.setCookie("isLogin","true",1);
        // this.setCookie("name", name, 1);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("name", this.name);
        localStorage.setItem("id", this.id);

        location.href="http://localhost:8080/board/list"
      }
      if (isLogin == 'id') alert("ID가 틀렸습니다.");
      if (isLogin == 'pwd') alert("Pw가 틀렸습니다.");
    }
  }
}
</script>

<style scoped>
input {
  margin: 5px;
  padding: 5px;
}
button {
  margin: 5px;
  font-size: 15px;
}
</style>