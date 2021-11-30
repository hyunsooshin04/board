<template>
  <div>
    <h1>비밀번호 찾기</h1>
    <div class="login-form">
      <form>
        <input v-model="id" type="text" name="email" class="text-field" placeholder="아이디" v-if="!ck">
        <h3 v-if="ck">본인 확인 질문 : {{ question }}</h3>
        <input v-model="answer" type="text" name="answer" class="text-field" placeholder="본인 확인 답" v-if="ck">
        <input v-on:keyup.enter="get_pwd" v-model="pwd" type="text" name="answer" class="text-field" placeholder="변경할 비밀번호" v-if="ck">
        <!--        <input v-model="password" type="password" name="password" class="text-field" placeholder="비밀번호">-->
        <input v-on:click="search" type="submit" value="아이디 검색하기" class="submit-btn" v-if="!ck">
        <input v-on:click="get_pwd" type="submit" value="제출하기" class="submit-btn" v-if="ck">
      </form>

      <!--      <div class="links">-->
      <!--        <router-link to="./signup">회원가입하기</router-link><br>-->
      <!--        <router-link to="/login/pwd_search">비밀번호 찾기</router-link>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "Pwd_Search",
  data() {
    return {
      ck: false,
      id: '',
      question: '',
      answer: '',
      pwd: ''
    }
  },
  methods: {
    search(e) {
      e.preventDefault();
      this.$axios.get('http://localhost:3000/api/login/' + this.id)
          .then((res) => {
            if (res.data.isId == false) alert("존재하지 않는 아이디 입니다.");
            else {
              this.question = res.data.msg;
              this.ck = !this.ck;
            }
          })
    },
    get_pwd(e) {
      e.preventDefault();
      this.$axios.get('http://localhost:3000/api/login/' + this.id + '/' + this.answer + '/' + this.pwd)
      .then((res) => {
        if (res.data.check == false) alert("본인 확인 답이 틀립니다.");
        if (res.data.check == true) {
          alert("비밀번호가 변경되었습니다.");
          location.href = "http://localhost:8080/login";
        }
      })
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