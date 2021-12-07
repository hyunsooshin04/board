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
      <a href="javascript:;" @click="fnMod" class="btnAdd btn" v-if="edit">수정</a>
      <a href="javascript:;" @click="book(`true`)" class="btnbookmark btn" v-if="bookmark && isLogin">즐겨찾기 해제</a>
      <a href="javascript:;" @click="book('false')" class="btnbookmark btn" v-if="!bookmark && isLogin">즐겨찾기</a>
      <a v-if="del" href="javascript:;" @click="fnDeleteProc" class="btnDelete btn">삭제</a>
    </div>
    <div id="comment">
      <div id="form-commentInfo">
        <div id="comment-count">댓글 <span id="count">{{ comment_cnt }}</span></div>
        <input id="comment-input" v-model="comment" placeholder="댓글을 입력해 주세요.">
        <button id="submit" v-on:click="CommentPush">등록</button>
        <br>
        <span style="color: grey">({{ comment.length }} / 49)</span>
      </div>
      <h2>댓글 목록</h2>
      <h3 v-if="comment_cnt == 0">댓글이 없습니다.</h3>
      <table v-for="(list, index) in list" v-bind:key="index">
        <colgroup>
          <col width="35%">
          <col width="*">
        </colgroup>
        <tr id="top">
          <td>
            <h3 v-bind:key="index">{{ list.name + "(" + list.id + ")" }}
              <button v-if="delsee[index]" id="delbtn" v-on:click="del_comment('' + list.no)">삭제</button>
              <button v-if="editsee[index]" id="editinputbtn" v-on:click="input_update(`` + list.no)"
                      style="display: inline">수정하기
              </button>
            </h3>
            <h4>{{ list.comment }}</h4>
            <span v-bind:id="list.no" class="see" style="display: none">
              <input id="editinput" type="text" v-model="edit_comment">
              <button id="editbtn" v-on:click="update_comment('' + list.no)">완료</button><br>
            </span>
            <span>작성 시간 : {{ list.regdate.substring(0, 10) }} {{ list.regdate.substring(11, 19) }}</span>
            <span v-if="!list.editdate == ''" style="padding-left: 50px">
              수정한 시각 : {{ list.editdate.substring(0, 10) }} {{ list.editdate.substring(11, 19) }}
            </span>
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
      comment_cnt: '',
      del_num: '',
      edit_comment: '',
      see: false,
      edit: false,
      del: false,
      userid: '',
      userlv: '',
      editsee: [],
      delsee: [],
      bookmark: false,
      isLogin: '',
    }
  },
  mounted() {
    this.fnGetView();
  },
  methods: {
    book(ck) {
      this.$axios.get('http://localhost:3000/api/board/user/bookmark/' + this.id + '/' + this.num + '/' + ck)
          .then((res) => {
            if (res.data.ok == "ok") alert("즐겨찾기가 해제되었습니다.");
            if (res.data.ok == "Ok") alert("즐겨찾기가 등록되었습니다.");
            this.fnGetView();
          })
    },
    input_update(id) {
      let see = document.getElementsByClassName("see");
      for (let i = 0; i < see.length; i++) {
        let see1 = see.item(i);
        see1.style.display = "none";
      }
      this.edit_comment = '';
      this.see = !this.see;
      if (this.see) {
        document.getElementById(`` + id).style.display = "inline";
      } else {
        document.getElementById(`` + id).style.display = "none";
      }
    },
    update_comment(id) {
      this.$axios.get('http://localhost:3000/api/board/comment/update/' + this.edit_comment + "/" + id)
          .then((res) => {
            if (res.data.update == "ok") {
              alert("수정 완료");
              this.CommentGet();
              this.input_update(`` + id);
            }
          })
    },
    del_comment(id) {
      let confirmdel = confirm("삭제 하시겠습니까?");

      if (confirmdel) {
        this.$axios.get('http://localhost:3000/api/board/comment/del/' + id)
            .then((res) => {
              if (res.data.del == "ok") {
                alert("삭제되었습니다.");
                this.CommentGet();
              }
            })
      } else alert("삭제가 취소되었습니다.");
    },
    CommentGet() {
      this.$axios.get('http://localhost:3000/api/board/comment/get/' + this.num)
          .then((res) => {
            this.list = res.data.list;
            this.comment_cnt = this.list.length;
            for (let i = 0; i < this.list.length; i++) {
              const tmp = this.list[i].id == this.id && this.id != 'Guest';
              this.editsee.push(tmp)
              if (this.userlv > parseInt("1") || this.list[i].name == this.name) {
                this.delsee.push(this.name != "Guest");
              } else this.delsee.push(false);
            }
            this.list = res.data.list;
          })
    },
    CommentPush() {
      this.form = {
        id: this.id,
        name: this.name,
        comment: this.comment,
        num: this.num
      }
      if (this.comment.trim() == "") alert("댓글을 입력해주세요.");
      else {
        this.$axios.post('http://localhost:3000/api/board/comment', this.form)
            .then((res) => {
              if (res.data.ok == "ok") {
                alert("댓글이 추가 되었습니다.");
                this.comment = '';
                this.CommentGet();
              }
            })
      }
    },
    fnGetView() {
      this.$axios.get('http://localhost:3000/api/board/' + this.body.num + '/' + this.id, {params: this.body})
          .then((res) => {
            this.view = res.data.view[0];
            this.subject = this.view.subject;
            this.cont = this.view.cont.replace(/(\n)/g, '<br/>');
            this.userlv = parseInt(res.data.user.level);
            this.bookmark = res.data.bookmark;
            if (res.data.user.id == this.view.id) this.edit = true;
            if (this.userlv == 3 || res.data.user.id == this.view.id) this.del = true;
            this.CommentGet();
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
    this.isLogin = localStorage.getItem("isLogin") == null ? false : true;
    this.name = localStorage.getItem("name") == null ? "Guest" : localStorage.getItem("name");
    this.id = localStorage.getItem("id") == null ? "Guest" : localStorage.getItem("id");
  },
  watch: {
    comment() {
      if (this.comment.length > 49) {
        alert("댓글의 길이는 49자 이상 등록할수 없습니다.");
        this.comment = this.comment.substring(0, 49)
      }
    }
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
  padding: 100px;
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

.btnbookmark {
  background: darkkhaki;
}

.btnDelete {
  background: #f00;
}

button {
  margin: 5px;
}

#delbtn {
  background-color: crimson;
  color: white;
  border: none;
}

#editinputbtn {
  background-color: #1BBC9B;
  color: white;
  border: none;
}

#editbtn {
  background-color: #1BBC9B;
  color: white;
  border: none;
}
</style>