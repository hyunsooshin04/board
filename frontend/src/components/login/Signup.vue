<template>
  <div class="signup">
    <h1>회원가입</h1>
    Name : <input type="text" v-model="name"><br>
    Id : <input type="text" v-model="id"><br>
    pw : <input type="password" v-model="pwd"><br>
    <button v-on:click="signup">signup</button>
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
    }
  },
  methods: {
    signup() {
      this.$axios.get('http://localhost:3000/api/signup/' + this.id + "/" + this.pwd + "/" + this.name)
          .then((res) => {
            this.message = res.data.success;
          })
      if (!this.message == false) {
        alert("ID가 중복입니다 다시 입력해주세요.");
      } else {
        alert("회원가입 성공");
        location.href = "http://localhost:8080/login";
      }
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