<template>
  <div class="root">
    <!--todo 展示所有歌曲集合+关联歌手 懒加载-->
    <!--搜索栏-->
    <div class="search-bar-container">
      <van-search v-model="value" placeholder="请输入关键词"></van-search>
    </div>
    <!--当前展示歌单-->
    <div class="current-song-list-container">
      <van-image
        width="90%"
        height="100%"
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <!--当前展示歌单所有歌名-->
      <van-list class="play-list-container">
        <van-cell
          class="list-item-container"
          icon="location-o"
          title-class="song-detail-container"
        >
          <template #title>
            <span>歌名</span>
            <van-tag round type="danger">标签1</van-tag>
            <van-tag round type="success">原唱</van-tag>
          </template>
        </van-cell>
        <van-cell
          class="list-item-container"
          icon="location-o"
          title-class="song-detail-container"
        >
          <template class="song-detail-container" #title>
            <span>歌名</span>
            <van-tag round type="danger">标签1</van-tag>
            <van-tag round type="success">原唱</van-tag>
            <van-tag round type="warning">完成度</van-tag>
          </template>
        </van-cell>
      </van-list>
    </div>
    <!--切换歌单按钮-->
    <div>
      <van-button icon="" type="primary">换一批</van-button>
    </div>
    <!--随机推荐歌单列表-->
    <div class="song-list-container">
      <!--推荐歌单封面-->
      <div class="song-list-cover">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <!--歌单描述-->
      <div class="song-list-description">歌单描述</div>
    </div>
    <div class="song-list-container">
      <div class="song-list-cover">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="song-list-description">歌单描述</div>
    </div>
    <div class="song-list-container">
      <div class="song-list-cover">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="song-list-description">歌单描述</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.root,
body,
html {
  height: 100%;
  overflow-y: auto;
}

html {
  display: block;
  background-color: #ffffff;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  vertical-align: baseline;
}

nav {
  display: inline-flex;
  flex: 1;
  -webkit-box-flex: 1;
  -webkit-box-align: center;
  justify-content: space-around;
  align-items: center;
  max-width: 20rem;
  height: 2.8rem;
  font-family: "Microsoft YaHei UI", monospace;
}

a {
  color: #fff;
}

.search-bar-container {
  display: block;
  font-size: 1.6rem;
  position: relative;
  width: 930px;
  background-color: pink;
  border-radius: 12px;
  padding: 0.5em 0;
  margin: 2em auto;
  box-shadow: 0 1px 12px #ceb;
  text-align: center;
}

.current-song-list-container {
  display: block;
  background-color: grey;
  width: 60%;
  position: relative;
  padding: 0;
  margin: 2em auto;
}

.song-list-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 8px #bdc;
  padding: 1em;
  width: 300px;
  text-align: left;
  display: inline-block;
  position: relative;
  margin: 1em;
}

.play-list-container {
  display: flex;
  flex-direction: column;
  width: 90%;
  position: relative;
  padding: 1em;
  margin: 1em auto;
  justify-content: space-around;
}

.list-item-container {
  display: flex;
  justify-content: flex-start;
}

.song-detail-container {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
}

.song {
  height: 5rem;
}
</style>
