<template>
  <div class="login">
    <h1>로그인</h1>
    <div class="login-form">
      <form>
        <input v-model="id" type="text" name="email" class="text-field" placeholder="아이디">
        <input v-model="password" type="password" name="password" class="text-field" placeholder="비밀번호">
        <input v-on:click="login" type="submit" value="로그인" class="submit-btn">
      </form>

      <div class="links">
        <router-link to="./signup">회원가입하기</router-link><br>
        <router-link to="/login/pwd_search">비밀번호 찾기</router-link>
      </div>
    </div>
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

        location.href = "http://localhost:8080/board/list"
      }
      if (isLogin == 'id') alert("ID가 틀렸습니다.");
      if (isLogin == 'pwd') alert("Pw가 틀렸습니다.");
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Noto Sans KR', sans-serif;
  border-radius: 5px;
}

body {
  margin: 0;
  background-color: #1BBC9B;
}

.login-form {
  width: 300px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  padding: 20px;
  text-align: center;
  border: none;

}

.text-field {
  font-size: 14px;
  padding: 10px;
  border: 1px solid;
  width: 260px;
  margin-bottom: 10px;

}

.submit-btn {
  font-size: 14px;
  border: none;
  padding: 10px;
  width: 260px;
  background-color: #1BBC9B;
  margin-bottom: 30px;
  color: white;
}

.links {
  text-align: center;
}

.links a {
  font-size: 12px;
  color: #9B9B9B;
}
</style>