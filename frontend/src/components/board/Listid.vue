<template>
  <div>
    <h2>{{ id }} 게시글</h2>
    <div class="searchWrap">
      <input type="text" v-model="keyword" @keyup.enter="fnSearch" placeholder="검색어를 입력해주세요."><a href="javascript:;" @click="fnSearch"
                                                                       class="btnSearch btn" >검색</a><br>
      <span>정렬 기준 : </span>
      <select v-model="standard">
        <option value="day">작성시간</option>
        <option value="views">조회수</option>
        <option value="like">추천수</option>
      </select>
    </div>
    <div class="listWrap">
      <table class="tbList">
        <colgroup>
          <col width="6%"/>
          <col width="*"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="15%"/>
          <col width="10%"/>
        </colgroup>
        <tr>
          <th>no</th>
          <th>제목</th>
          <th>작성자</th>
          <th>아이디</th>
          <th>날짜</th>
          <th>조회수</th>
        </tr>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{ no - idx }}</td>
          <td class="txt_left"><a href="javascript:;" @click="fnView(`${row.num}`)">{{ row.subject }}</a></td>
          <td>{{ row.name }}</td>
          <td><a href="javascript:;" v-on:click="FnList(`` + row.id)">{{ row.id }}</a></td>
          <td>{{ row.regdate.substring(0, 10) }}</td>
          <td>{{ row.views }}</td>
        </tr>
        <tr v-if="list.length == 0">
          <td colspan="4">데이터가 없습니다.</td>
        </tr>
      </table>
    </div>

    <div class="pagination" v-if="paging.totalCount > 0">
      <a href="javascript:;" @click="fnPage(1)" class="first">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"
         class="prev">&lt;</a>
      <template v-for=" (n,index) in paginavigation()">
        <template v-if="paging.page == n">
          <strong :key="index">{{ n }}</strong>
        </template>
        <template v-else>
          <a href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
        </template>
      </template>
      <a href="javascript:;" v-if="paging.total_page > paging.end_page" @click="fnPage(`${paging.end_page+1}`)"
         class="next">&gt;</a>
      <a href="javascript:;" @click="fnPage(`${paging.total_page}`)" class="last">&gt;&gt;</a>
    </div>

    <div class="btnRightWrap">
      <a @click="fnAdd" class="btn">등록</a>
    </div>
  </div>
</template>

<script>
export default {
  data() { //변수생성
    return {
      body: '',
      board_code: 'board_list',
      list: '',
      no: '',
      paging: '',
      start_page: '',
      views: '',
      page: this.$route.query.page ? this.$route.query.page : 1,
      keyword: this.$route.query.keyword,
      isLogin: '',
      name: 'Guest',
      standard: 'day',
      level: '',
      id: this.$route.query.id,
      day: '',

      paginavigation: function () {
        var pageNumber = [];
        var start_page = this.paging.start_page;
        var end_page = this.paging.end_page;
        for (var i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    FnList(id) {
      this.body = {
        id: id
      }
      this.$router.push({path: '/board/user/view', query: this.body});
    },
    fnGetList() {
      this.body = {
        day: this.day,
        board_code: this.board_code,
        keyword: this.keyword,
        page: this.page,
        standard: this.standard,
        id: this.id,
        search: 'id',
        isLogin: this.isLogin
      }
      this.$axios.get('http://localhost:3000/api/board', {params: this.body})
          .then((res) => {
            if (res.data.success) {
              this.list = res.data.list;
              this.paging = res.data.paging;
              this.no = this.paging.totalCount - ((this.paging.page - 1) * this.paging.ipp);
              this.level = res.data.level;
            } else {
              alert("실행중 실패했습니다.\n다시 이용해 주세요.");
            }
          })
          .catch((err) => {
            console.log(err);
          })
    },
    fnView(num) {
      this.body.num = num;
      this.$router.push({path: '/board/view', query: this.body});
    },
    fnAdd() {
      this.$router.push("/board/write");
    },
    getList() {
      this.$axios.get("http://localhost:3000/api/board")
          .then((res) => {
            console.log(res);
          })
          .then((err) => {
            console.log(err);
          })
    }
    , fnSearch() {
      this.paging.page = 1;
      this.fnGetList();
    }
    , fnPage(n) {
      if (this.page != n) {
        this.page = n;
        this.fnGetList();
      }
    }
  },
  created: function () {
    this.isLogin = localStorage.getItem("isLogin") == null ? "false" : "true";
    this.name = localStorage.getItem("name") == null ? "Guest" : localStorage.getItem("name");
  },
  watch: {
    standard() {
      this.fnGetList()
    }
  }
}
</script>

<style scoped>
.searchWrap {
  border: 1px solid #888;
  border-radius: 5px;
  text-align: center;
  padding: 20px 0;
  margin-bottom: 40px;
}

.searchWrap input {
  width: 60%;
  height: 36px;
  border-radius: 3px;
  padding: 0 10px;
  border: 1px solid #888;
}

.searchWrap .btnSearch {
  display: inline-block;
  margin-left: 10px;
}

.tbList th {
  border-top: 1px solid #888;
}

.tbList th, .tbList td {
  border-bottom: 1px solid #eee;
  padding: 5px 0;
}

.tbList td.txt_left {
  text-align: left;
  text-align: center;
}

.btnRightWrap {
  text-align: right;
  margin: 10px 0 0 0;
}

.pagination {
  margin: 20px 0 0 0;
  text-align: center;
}

.first, .prev, .next, .last {
  border: 1px solid #666;
  margin: 0 5px;
}

.pagination span {
  display: inline-block;
  padding: 0 5px;
  color: #333;
}

.pagination a, strong {
  text-decoration: none;
  display: inline-block;
  padding: 5px;
  color: #666;
  border: 1px solid;
}

.listWrap a:link {
  color: black;
  text-decoration: none;
}

.listWrap a:visited {
  color: black;
  text-decoration: none;
}

.listWrap a:hover {
  color: blue;
  text-decoration: underline;
}

</style>