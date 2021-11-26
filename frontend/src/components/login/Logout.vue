<template>
  <div>
    로그아웃 완료
  </div>
</template>

<script>
export default {
  name: "Logout",
  created: function () {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("name");
    location.href = "http://localhost:8080/board/list"
  }
}
</script>

<style scoped>

</style>