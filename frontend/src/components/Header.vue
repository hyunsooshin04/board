<template>
  <header>
    <a href="http://localhost:8080/"><h1>게시판</h1></a>
    <div class="menuWrap">
      <ul class="menu">
        <li>
          <router-link to="/">홈</router-link>
        </li>
        <li>
          <router-link to="/board/list">게시판</router-link>
        </li>
        <li v-if="!isLogin">
          <router-link to="/login">로그인</router-link>
        </li>
        <!--        <li v-if="isLogin"><router-link to="/logout">로그아웃</router-link></li>-->
        <li v-if="isLogin"><label for="menu-toggle">{{ name }} 님</label>
          <input type="checkbox" id="menu-toggle"/>
          <ul id="menu"><br>
            <li>
              <router-link to="/myinformation">내정보</router-link>
            </li>
            <br>
            <li>
              <router-link to="/editinfo">내정보 수정</router-link>
            </li>
            <br>
            <li>
              <router-link to="/logout">로그아웃</router-link>
            </li>
          </ul>
        </li>
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
  height: 10vh;
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

label {
  cursor: pointer;
}

#menu-toggle {
  display: none; /* hide the checkbox */
}

#menu {
  padding-top: 10px;
  display: none;
  list-style: none;
  width: auto;
  position: absolute;
}

#menu li {
  /*background-color: skyblue;*/
  width: 50px;
}

#menu-toggle:checked + #menu {
  display: block;
}
</style>