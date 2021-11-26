<template>
  <header>
    <h1><a href="#" class="logo"><img alt="Vue logo" src="../assets/logo.png" width="80"></a></h1>
    <div class="menuWrap">
      <ul class="menu">
        <li><router-link to="/board/list">게시판</router-link></li>
        <li v-if="!isLogin"><router-link to="/login">로그인</router-link></li>
        <li v-if="isLogin"><router-link to="/logout">로그아웃</router-link></li>
      </ul>

    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isLogin: "false",
      name: "Guest",
    }
  },
  created: function () {
    this.isLogin = localStorage.getItem("isLogin") == null ? false : true;
    // console.log(this.isLogin)
    this.name = localStorage.getItem("name") == null ? "Guest" : localStorage.getItem("name");
    // console.log(this.name)
  }
}
</script>

<style scoped>
header {
  width: 100%;
  text-align: center;
  position: relative;
  height: 120px;
  border-bottom: 1px solid #35495e
}

header h1 {
  position: absolute;
  top: 0;
  left: 100px;
}

header ul.menu:after {
  display: block;
  clear: both;
  content: '';
}

header ul.menu {
  position: absolute;
  top: 20px;
  right: 50px;
}

header ul.menu li {
  float: left;
  padding: 10px 20px;
  list-style: none;
}

a {
  text-decoration: none;
  color: #333;
}
</style>