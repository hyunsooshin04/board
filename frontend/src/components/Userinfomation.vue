<template>
  <div>
    <h1>사용자 정보</h1>
    <table class="type09">
      <thead>
      <tr>
        <th scope="cols">타이틀</th>
        <th scope="cols">내용</th>
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
    }
  },
  methods: {
    GetUserInfo() {
      this.$axios.get('http://localhost:3000/api/userinfo/' + this.id)
      .then((res) => {
        this.name = res.data.name == null ? "미설정" : res.data.name;
        this.gender = res.data.gender;
        this.status_message = res.data.cont == null ? "미설정" : res.data.cont;;
        this.hobby = res.data.hobby == null ? "미설정" : res.data.hobby;
        this.city = res.data.city == null ? "미설정" : res.data.city;
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
</style>