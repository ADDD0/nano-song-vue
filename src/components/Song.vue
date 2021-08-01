<template>
  <van-row>
    <!--弹唱日期-->
    <van-col span="3">{{ performanceDate }}</van-col>
    <!--歌名-->
    <van-col span="6">{{ songName }}</van-col>
    <!--翻唱歌手列表-->
    <van-col span="3">
      <van-tag
        type="primary"
        size="large"
        plain
        v-for="(singer, index) in coverSingers"
        :key="index"
      >
        {{ singer.singerName }}
      </van-tag>
    </van-col>
    <!--tag列表-->
    <van-col span="6">tags</van-col>
    <!--播放器-->
    <van-col span="5">
      <audio
        controls
        type="audio/mpeg"
        :src="'http://localhost:78/' + songPath"
        style="width: 100%"
      />
    </van-col>
    <!--删除按钮-->
    <!--todo 增加确认弹窗-->
    <van-col span="1">
      <van-button type="danger" size="mini" @click="onClickDeleteSong">
        删除
      </van-button>
    </van-col>
  </van-row>
</template>

<script>
import SongApi from "../api/song.api";

export default {
  name: "Song",
  props: ["performanceDate", "songName", "coverSingers", "songPath", "song"],
  methods: {
    async onClickDeleteSong() {
      await SongApi.deleteSong(this.song.songId);
    },
  },
};
</script>

<style scoped></style>
