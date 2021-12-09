<template>
  <div>
    <h1>공지사항 {{ num ? '수정' : '등록' }}</h1>
    <span v-if="id != 'Guest'">로그인 한 유저에게만 보이기 : <input type="checkbox" v-model="see"></span>
    <div class="AddWrap">
      <form>
        <table class="tbAdd">
          <colgroup>
            <col width="15%"/>
            <col width="*"/>
          </colgroup>
          <tr>
            <th>제목</th>
            <td>
              <input type="text" v-model="subject" ref="subject"/></td>
          </tr>
          <tr>
            <th>내용</th>
            <td><textarea v-model="cont" ref="cont"></textarea></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="btnWrap">
      <a href="javascript:;" @click="fnList" class="btn">목록</a>
      <a v-if="!num" href="javascript:;" @click="fnAddProc" class="btnAdd btn">등록</a>
      <a v-else href="javascript:;" @click="fnModProc" class="btnAdd btn">수정</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board_code: 'Home_list',
      subject: '',
      cont: '',
      id: 'Guest',
      body: this.$route.query,
      form: '',
      num: this.$route.query.num,
      name: 'Guest',
      see: false,
    }
  },
  mounted() {
    if (this.num) {
      this.fnGetView();
    }
  },
  methods: {
    fnList() {
      delete this.body.num;
      this.$router.push({path: '../..//', query: this.body});
    },
    fnGetView() {
      this.$axios.get('http://localhost:3000/api/board/' + this.body.num, {params: this.body})
          .then((res) => {
            this.view = res.data.view[0];
            this.subject = this.view.subject;
            this.cont = this.view.cont;
          })
          .catch((err) => {
            console.log(err);
          })
    },
    fnView() {
      this.$router.push({path: './view', "query": this.body});
    },
    fnAddProc() {
      if (!this.subject) {
        alert("제목을 입력해 주세요");
        this.$refs.subject.focus();
        return;
      }

      this.form = {
        board_code: this.board_code,
        subject: this.subject,
        cont: this.cont,
        id: this.id,
        name: this.name,
        see: this.see
      }

      this.$axios.post('http://localhost:3000/api/board', this.form)
          .then((res) => {
            if (res.data.success) {
              alert('등록되었습니다.');
              this.fnList();
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요");
            }
          })
          .catch((err) => {
            console.log(err);
          })

    },
    fnModProc() {
      if (!this.subject) {
        alert("제목을 입력해 주세요");
        this.$refs.subject.focus();
        return;
      }

      this.form = {
        board_code: this.board_code,
        subject: this.subject,
        cont: this.cont,
        id: this.id,
        num: this.num,
        see: this.see
      }

      this.$axios.put('http://localhost:3000/api/board', this.form)
          .then((res) => {
            if (res.data.success) {
              alert('수정되었습니다.');
              this.fnView();
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요");
            }
          })
          .catch((err) => {
            console.log(err);
          })
    }
  },
  created: function () {
    this.isLogin = localStorage.getItem("isLogin") == null ? "false" : "true";
    // console.log(this.isLogin)
    this.id = localStorage.getItem("id") == null ? "Guest" : localStorage.getItem("id");
    this.name = localStorage.getItem("name") == null ? "Guest" : localStorage.getItem("name");
    // console.log(this.name)
  }
}
</script>

<style scoped>
.tbAdd {
  border-top: 1px solid #888;
}

.tbAdd th, .tbAdd td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}

.tbAdd td {
  padding: 10px 10px;
  box-sizing: border-box;
}

.tbAdd td input {
  width: 100%;
  min-height: 30px;
  box-sizing: border-box;
  padding: 0 10px;
}

.tbAdd td textarea {
  width: 100%;
  min-height: 300px;
  padding: 10px;
  box-sizing: border-box;
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