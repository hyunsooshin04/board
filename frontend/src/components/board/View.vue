<template>
  <div>
    <h1>게시판 상세보기</h1>
    <div class="AddWrap">
      <form>
        <table class="tbAdd">
          <colgroup>
            <col width="15%"/>
            <col width="*"/>
          </colgroup>
          <tr>
            <th>제목</th>
            <td>{{ subject }}</td>
          </tr>
          <tr>
            <th>내용</th>
            <td class="txt_cont" v-html="cont"></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btnWrap">
      <a href="javascript:;" @click="fnList" class="btn">목록</a>
      <a href="javascript:;" @click="fnMod" class="btnAdd btn">수정</a>
      <a v-if="num" href="javascript:;" @click="fnDeleteProc" class="btnDelete btn">삭제</a>
    </div>
    <div id="comment">
      <div id="form-commentInfo">
        <div id="comment-count">댓글 <span id="count">{{ comment_cnt }}</span></div>
        <input id="comment-input" v-model="comment" placeholder="댓글을 입력해 주세요.">
        <button id="submit" v-on:click="CommentPush">등록</button>
      </div>
      <h2>댓글 목록</h2>
      <table v-for="(list, index) in list" v-bind:key="index">
        <colgroup>
          <col width="35%">
          <col width="*">
        </colgroup>
        <tr id="top">
          <td>
            <h3 v-bind:key="index">{{ list.name + "(" + list.id + ")" }}</h3>
            <h4>{{ list.comment }}</h4>
            {{ list.regdate.substring(0, 10) }}
            {{ list.regdate.substring(11, 19) }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      body: this.$route.query,
      subject: '',
      cont: '',
      view: '',
      num: this.$route.query.num,
      form: '',
      id: '',
      name: '',
      comment: '',
      list: '',
      comment_cnt: ''
    }
  },
  mounted() {
    this.fnGetView();
    this.CommentGet();
  },
  methods: {
    CommentGet() {
      this.$axios.get('http://localhost:3000/api/board/comment/get/' + this.num)
          .then((res) => {
            this.list = res.data.list;
            this.comment_cnt = this.list.length;
          })
    },
    CommentPush() {
      this.form = {
        id: this.id,
        name: this.name,
        comment: this.comment,
        num: this.num
      }
      if (this.comment == "") alert("댓글을 입력해주세요.");
      else {
        this.$axios.post('http://localhost:3000/api/board/comment', this.form)
            .then((res) => {
              if (res.data.ok == "ok") {
                alert("댓글이 추가 되었습니다.");
                location.reload();
              }
            })
      }
    },
    fnGetView() {
      this.$axios.get('http://localhost:3000/api/board/' + this.body.num, {params: this.body})
          .then((res) => {
            this.view = res.data.view[0];
            this.subject = this.view.subject;
            this.cont = this.view.cont.replace(/(\n)/g, '<br/>');
          })
          .catch((err) => {
            console.log(err);
          })
    }
    ,
    fnList() {
      delete this.body.num;
      this.$router.push({path: './list', query: this.body});
    }
    ,
    fnMod() {
      this.$router.push({path: './write', query: this.body});
    }
    ,
    fnDeleteProc() {
      if (confirm("삭제하시겠습니까?")) {
        this.$axios.delete('http://localhost:3000/api/board/', {params: this.body})
            .then((res) => {
              if (res.data.result) {
                alert("삭제되었습니다.");
                this.fnList();
              } else {
                alert("실행중 실패했습니다.\n다시 이용해 주세요.");
              }
            })
            .catch((err) => {
              console.log(err);
            })
      }
    }
  },
  created: function () {
    this.isLogin = localStorage.getItem("isLogin") == null ? "false" : "true";
    this.name = localStorage.getItem("name") == null ? "Guest" : localStorage.getItem("name");
    this.id = localStorage.getItem("id") == null ? "Guest" : localStorage.getItem("id");
  }
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

.tbAdd {
  border-top: 1px solid #888;
}

.tbAdd th, .tbAdd td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}

h3 {
  margin: 0;
  padding: 0;
}

h4 {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

#comment {
  text-align: left;
  width: 100%;
}

#top {
  border-top: 1px solid;
}

#comment table {
  width: 100%;
}

#comment tr {
  border-bottom: 1px solid grey;
}

#comment td {
  float: left;
}

.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
  text-align: left;
}

.tbAdd td.txt_cont {
  height: 300px;
  vertical-align: top;
}

.btnWrap {
  text-align: center;
  margin: 20px 0 0 0;
}

.btnWrap a {
  margin: 0 10px;
}

.btnAdd {
  background: #43b984
}

.btnDelete {
  background: #f00;
}
</style>