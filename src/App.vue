<template>
  <!--导航栏-->
  <header>
    <!--todo 配置手机对应页面-->
    <!--todo van-sticky顶层粘滞吸附-->
    <div class="header-container">
      <nav>
        <a href="./">牵丝蝠の精神食粮/nano病缓解站</a>
      </nav>
      <nav>
        <a title="my-song-list" href="#">我的歌单</a>
        <a title="history-record" href="#">历史弹唱记录</a>
        <a title="import-song" href="./import">后端管理</a>
      </nav>
    </div>
  </header>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 2.8rem;
  background-color: rgba(0, 0, 0, 0.3);
  transition: height 0.3s ease;
  -webkit-box-pack: start;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  position: sticky;
  top: 0;

  .header-container {
    display: flex;
    justify-content: space-between;

    nav {
      a {
      }
    }
  }
}
</style>
