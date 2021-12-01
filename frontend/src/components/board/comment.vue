<template>
  <div>
    <div id="form-commentInfo">
      <div id="comment-count">댓글 <span id="count">0</span></div>
      <input id="comment-input" placeholder="댓글을 입력해 주세요.">
      <button id="submit">등록</button>
    </div>
    <div id=comments></div>
  </div>
</template>

<script>
export default {
  name: "comment"
}
</script>

<style scoped>
#form-commentInfo {
  width: 100%;
}

#comment-count {
  margin-bottom: 10px;
}

#comment-input {
  width: 50%;
  height: 3.3em;
}

#submit {
  background-color: rgb(0, 128, 255);
  width: 5.5em;
  height: 3.3em;;
  font-size: 15px;
  font-weight: bold;
  color: aliceblue;
}
</style>