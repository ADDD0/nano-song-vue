<template>
  <van-row>
    <van-col span="6" :onclick="onClickSongCollection">{{ songTitle }}</van-col>
    <van-col span="4">
      <van-tag
        type="primary"
        size="large"
        plain
        v-for="(singer, index) in originalSingers"
        :key="index"
      >
        {{ singer.singerName }}
      </van-tag>
    </van-col>
    <van-col span="13">{{ tags }}</van-col>
    <!--删除按钮-->
    <!--todo 增加确认弹窗-->
    <van-col span="1">
      <van-button
        type="danger"
        size="mini"
        @click="onClickDeleteSongCollection"
      >
        删除
      </van-button>
    </van-col>
  </van-row>
</template>

<script>
import QuerySongApi from "../api/querySong.api";
import SongCollectionApi from "@/api/songCollection.api";

export default {
  name: "SongCollection",
  props: ["songTitle", "originalSingers", "tags", "songCollection"],
  methods: {
    async onClickSongCollection() {
      // 将查询到的值传递给父组件并调用相应方法
      this.$emit(
        "updateSongs",
        await QuerySongApi.querySongCollectionId(
          this.songCollection.songCollectionId
        )
      );
    },
    async onClickDeleteSongCollection() {
      await SongCollectionApi.deleteSongCollection(
        this.songCollection.songCollectionId
      );
    },
  },
};
</script>

<style scoped></style>
