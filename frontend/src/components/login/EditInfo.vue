<template>
  <div>
    <h1>내 정보 수정</h1>
    <table class="type09">
      <thead>
      <tr>
        <th scope="cols">타이틀</th>
        <th scope="cols">내용
          <span style="float: right">공개여부 : <select v-model="share">
              <option value="true">공개</option>
              <option value="false">비공개</option>
            </select>
          </span></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">이름</th>
        <td>{{ name }}</td>
      </tr>
      <tr>
        <th scope="row">아이디</th>
        <td>{{ id }}</td>
      </tr>
      <tr>
        <th scope="row">비밀번호</th>
        <td><input type="text" v-model="pwd"></td>
      </tr>
      <tr>
        <th scope="row">상태 메세지</th>
        <td><input style="width: 16rem" type="text" v-model="status_message"></td>
      </tr>
      <tr>
        <th scope="row">성별</th>
        <td>
          <select v-model="gender">
            <option>미설정</option>
            <option>남자</option>
            <option>여자</option>
          </select>
        </td>
      </tr>
      <tr>
        <th scope="row">취미</th>
        <td><input style="width: 16rem" type="text" v-model="hobby"></td>
      </tr>
      <tr>
        <th scope="row">지역</th>
        <td><input style="width: 16rem" type="text" v-model="city"></td>
      </tr>
      <tr>
        <th scope="row">본인확인 질문</th>
        <td><input style="width: 16rem" type="text" v-model="question" placeholder="최대 20자"></td>
      </tr>
      <tr>
        <th scope="row">본인확인 답</th>
        <td><input style="width: 16rem" type="text" v-model="answer" placeholder="최대 10자"></td>
      </tr>
      </tbody>
    </table>
    <br>
    <button v-on:click="edit">수정하기</button>
    <br><br>
    <span style="color: grey;">본인확인 질문과 본인확인 답이 없으면 비밀번호 찾기를 사용하실수 없습니다.</span>
  </div>
</template>

<script>
export default {
  name: "EditInfo",
  data() {
    return {
      id: '',
      name: '',
      gender: '미설정',
      hobby: '미설정',
      cont: '미설정',
      status_message: '미설정',
      city: '미설정',
      pwd: '',
      form: '',
      question: '',
      answer: '',
      share: "true"
    }
  },
  methods: {
    edit() {
      if (this.question == '') this.question = null;
      if (this.answer == '') this.answer = null;
      this.form = {
        name: this.name,
        id: this.id,
        pwd: this.pwd,
        msg: this.status_message,
        gender: this.gender,
        hobby: this.hobby,
        city: this.city,
        question: this.question,
        answer: this.question == null ? null : this.answer,
        share: this.share
      }
      this.$axios.post('http://localhost:3000/api/edit', this.form)
          .then((res) => {
            if (res.data.edit == true) {
              alert("수정이 완료되었습니다.");
              location.href = "http://localhost:8080/editinfo";
            }
          })
    }
  },
  created: function () {
    this.name = localStorage.getItem("name") == null ? "Guest" : localStorage.getItem("name");
    this.id = localStorage.getItem("id") == null ? "Guest" : localStorage.getItem("id");
    this.$axios.get('http://localhost:3000/api/myinfo/' + this.id)
        .then((res) => {
          this.gender = res.data.gender;
          this.status_message = res.data.cont;
          this.hobby = res.data.hobby;
          this.city = res.data.city;
          this.pwd = res.data.pwd;
          this.question = res.data.msg;
          this.answer = res.data.answer;
          this.share = res.data.share;
        })
  }
}
</script>
<style scoped>
table.type09 {
  border-collapse: collapse;
  text-align: left;
  line-height: 1.5;
}

table.type09 thead th {
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  color: #369;
  border-bottom: 3px solid #036;
}

table.type09 tbody th {
  width: 150px;
  padding: 10px;
  font-weight: bold;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
  background: #f3f6f7;
}

table.type09 td {
  width: 350px;
  padding: 10px;
  vertical-align: top;
  border-bottom: 1px solid #ccc;
}

input {
  padding: 5px;
}

select {
  padding: 5px;
}
</style>