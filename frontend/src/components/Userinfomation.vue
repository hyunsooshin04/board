<template>
  <div>
    <h1>사용자 정보</h1>
    <table class="type09">
      <thead>
      <tr>
        <th scope="cols">타이틀</th>
        <th scope="cols">내용
          <span v-if="lv > 2" style="float: right;">
            <select v-model="selectlv">
              <option value="1">일반계정</option>
              <option value="2">댓글관리자계정</option>
              <option value="3">관리자계정</option>
            </select>
            <button v-on:click="updatepower">권한 부여</button>
<!--            <button>유저 정보 삭제</button>-->
          </span>
        </th>
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
        <th scope="row">상태 메세지</th>
        <td>{{ status_message }}</td>
      </tr>
      <tr>
        <th scope="row">성별</th>
        <td>{{ gender }}</td>
      </tr>
      <tr>
        <th scope="row">취미</th>
        <td>{{ hobby }}</td>
      </tr>
      <tr>
        <th scope="row">지역</th>
        <td>{{ city }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Userinfomation",
  data() {
    return {
      id: this.$route.query.id,
      name: '',
      gender: '미설정',
      hobby: '미설정',
      status_message: '미설정',
      city: '미설정',
      userid: localStorage.getItem("id"),
      lv: '',
      selectlv: '1',
    }
  },
  methods: {
    GetUserInfo() {
      this.$axios.get('http://localhost:3000/api/userinfo/' + this.id + "/" + this.userid)
          .then((res) => {
            this.name = res.data.name == null ? "미설정" : res.data.name;
            this.gender = res.data.gender;
            this.status_message = res.data.cont == null ? "미설정" : res.data.cont;
            this.hobby = res.data.hobby == null ? "미설정" : res.data.hobby;
            this.city = res.data.city == null ? "미설정" : res.data.city;
            this.lv = res.data.level;
            this.selectlv = res.data.userlv
          })
    },
    updatepower(e) {
      e.preventDefault();
      this.$axios.get('http://localhost:3000/api/userinfo/update/' + this.id + "/" + this.selectlv)
      .then((res) => {
        if (res.data.ok == "ok") alert("수정되었습니다.")
      })
    }
  },
  mounted() {
    this.GetUserInfo();
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

button {
  margin: 5px;
}
</style>