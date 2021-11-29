<template>
  <div class="login">
    <h1>회원가입</h1>
    <div class="login-form">
      <form>
        <input v-model="name" type="text" name="name" class="text-field" placeholder="이름">
        <input v-model="id" type="text" name="id" class="text-field" placeholder="아이디">
        <input v-model="pwd" type="password" name="password" class="text-field" placeholder="비밀번호">
        <input v-model="pwd_ck" type="password" name="password_check" class="text-field" placeholder="비밀번호 확인">
        <input v-on:click="signup" type="submit" value="회원가입" class="submit-btn">
      </form>

      <div class="links">
        <router-link to="./login">로그인하기</router-link>
        <br>
        <a href="#">비밀번호 찾기</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      id: '',
      pwd: '',
      name: '',
      message: '',
      pwd_ck: '',
    }
  },
  methods: {
    signup() {
      if (this.name == '') alert("이름을 입력해주세요.");
      else if (this.id == '') alert("아이디를 입력해주세요.");
      else if (this.pwd == '') alert("비밀번호를 입력해주세요.");
      else if (this.pwd_ck == '') alert("비밀번호 확인을 입력해주세요.");
      else if (this.pwd != this.pwd_ck) alert("비밀번호와 비밀번호확인이 일치하지 않습니다.");
      else {
        this.$axios.get('http://localhost:3000/api/signup/' + this.id + "/" + this.pwd + "/" + this.name)
            .then((res) => {
              this.message = res.data.success;
              if (this.message == "signup_success") {
                alert("회원가입 성공");
                location.href = "http://localhost:8080/login";
              } else if (this.message == "id_overlap") {
                alert("아이디가 중복입니다.");
              } else alert("이프문이 실행되긴함")
            })
      }
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
  margin-top: 25px;
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