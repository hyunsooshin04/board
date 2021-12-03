<template>
  <div>
    <h1>유저 리스트</h1>
    <table class="type09">
      <thead>
      <tr>
        <th scope="cols">유저 리스트</th>
        <th style="text-align: right" scope="cols"><span style="background-color: deepskyblue">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : 관리자
          <span style="background-color: skyblue;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> : 댓글 관리자
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(list, index) in list" v-bind:key="index">
        <th v-bind:id="'lv' + list.level" scope="row">유저명(아이디)</th>
        <td><a href="javascript:;" v-on:click="FnList(`` + list.id)">{{ list.name }}({{ list.id }})</a></td>
      </tr>
      </tbody>
    </table>
    <!--    <select v-model="test">-->
    <!--      <option value="1">일반계정</option>-->
    <!--      <option value="2">댓글 관리자 계정</option>-->
    <!--      <option value="3">관리자 계정</option>-->
    <!--    </select>-->
  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      list: '',
      body: '',
      test: 2,
    }
  },
  mounted() {
    this.GetList();
  },
  methods: {
    GetList() {
      this.$axios.get('http://localhost:3000/api/board/user/list/get')
          .then((res) => {
            this.list = res.data.list;
          })
    },
    FnList(id) {
      this.body = {
        id: id
      }
      this.$router.push({path: './view', query: this.body});
    }
  }
}
</script>

<style scoped>
#lv3 {
  background-color: deepskyblue;
}

#lv2 {
  background-color: skyblue;
}

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

a:link {
  color: black;
  text-decoration: none;
}

a:visited {
  color: black;
  text-decoration: none;
}

a:hover {
  color: blue;
  text-decoration: underline;
}
</style>