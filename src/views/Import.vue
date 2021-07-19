<template>
  <van-row class="main-container">
    <!--搜索栏-->
    <van-row class="search-bar-container">
      <!--todo 搜索栏下方提供部分可选tag-->
      <!--查询关键字 原曲名 歌手-->
      <van-field
        class="search-bar"
        center
        v-model="queryContent"
        placeholder="请输入你要查询的内容"
      >
        <template #label>
          <van-dropdown-menu>
            <!--todo 格式设置-->
            <van-dropdown-item
              v-model="currentQueryType"
              :options="queryOptions"
            />
          </van-dropdown-menu>
        </template>
        <template #button>
          <van-button
            icon="search"
            size="normal"
            type="primary"
            @click="onClickQueryContent"
            >搜索
          </van-button>
        </template>
      </van-field>
    </van-row>
    <!--后台操作-->
    <van-row class="manage-container">
      <!--操作栏-->
      <van-col class="operation-side-bar-container" span="6">
        <!--新增歌手-->
        <van-form class="add-singer" @submit="onClickAddSinger">
          <van-field
            v-model="singer.singerName"
            label="歌手姓名"
            placeholder="要新增的歌手姓名"
            required
            :rules="[{ required: true, message: '请填写歌手姓名' }]"
          />
          <van-button
            round
            block
            text="新增歌手（精确）"
            type="primary"
            native-type="submit"
            style="margin: 16px auto"
          />
        </van-form>
        <!--新增歌曲集合-->
        <van-form class="add-song-collection" @submit="onClickAddCollection">
          <van-field
            v-model="songCollection.songTitle"
            label="歌曲集合"
            placeholder="新增歌曲集合名"
            required
            :rules="[{ required: true, message: '请填写歌名' }]"
          />
          <!--新增原曲中文名 可选-->
          <!--todo 正则匹配 只能为中文-->
          <van-field
            v-model="songCollection.chineseTitle"
            label="中文名"
            placeholder="新增歌曲集合中文名"
          />
          <!--新增原曲英文名 可选-->
          <!--todo 正则匹配 只能为英文-->
          <van-field
            v-model="songCollection.englishTitle"
            label="英文名"
            placeholder="新增歌曲集合英文名"
          />
          <van-button
            round
            block
            text="新增歌曲集合（精确）"
            type="primary"
            native-type="submit"
            style="margin: 16px auto"
          />
        </van-form>
        <!--todo 歌曲关联歌手-->
        <!--歌曲集合关联歌手-->
        <van-form
          class="bind-cover-singer"
          @submit="onClickBindSongCollectionAndSinger"
        >
          <van-field
            v-model="songCollection.songTitle"
            label="歌曲集合"
            placeholder="要设定的歌曲集合名"
            required
            :rules="[{ required: true, message: '请设定歌曲' }]"
          />
          <van-field
            v-model="singer.singerName"
            label="歌手姓名"
            placeholder="要设定的歌手姓名"
            required
            :rules="[{ required: true, message: '请设定歌手' }]"
          />
          <van-button
            round
            block
            type="primary"
            native-type="submit"
            text="设定歌曲集合+原唱（精确）"
            style="margin: 16px auto"
          />
        </van-form>
        <!--导入歌曲-->
        <van-form class="import-song" @submit="onClickUploadSong">
          <!--todo 下拉列表选择歌曲集合-->
          <van-field
            v-model="songCollection.songTitle"
            label="歌曲集合"
            placeholder="要上传到的歌曲集合"
            required
            :rules="[{ required: true, message: '你要上传到的歌曲集合' }]"
          />
          <!--选择弹唱日期-->
          <van-cell
            title="点击选择弹唱日期"
            is-link
            :value="song.performanceDate"
            @click="showCalender = true"
          />
          <van-calendar
            v-model:show="showCalender"
            :min-date="new Date(2020, 8, 1)"
            :show-confirm="false"
            @confirm="onConfirmPerformanceDate"
          />
          <!--上传歌曲-->
          <van-uploader
            :before-read="beforeRead"
            :after-read="afterRead"
            max-count="1"
            accept="audio/*"
          >
            <van-button
              icon="plus"
              type="primary"
              text="选择单曲"
              style="margin: 16px auto"
            />
            {{ file.name }} {{ file.size }}
          </van-uploader>
          <van-button
            round
            block
            type="primary"
            text="确定导入（精确）"
            native-type="submit"
          />
        </van-form>
      </van-col>
      <!--查询结果展示-->
      <van-col class="show-search-result-container" span="18">
        <!--歌曲集合查询-->
        <van-row class="filter-table">
          <!--todo 点击可排序-->
          <van-col span="6">歌名</van-col>
          <van-col span="4">原唱</van-col>
          <van-col span="14">Tags</van-col>
        </van-row>
        <!--todo 所有展示标签均可点击 要给用户此可点击的印象 可通过布局、鼠标图标变换等方法-->
        <song-collection
          :song-title="resultSongCollection.songCollection.songTitle"
          :original-singers="resultSongCollection.singerArrayList"
          :tags="test"
          :song-collection="resultSongCollection.songCollection"
          v-for="(resultSongCollection, index) in resultSongCollections"
          :key="index"
          @updateSongs="updateResultSongs"
        />
        <!--歌曲查询-->
        <van-row class="filter-table">
          <!--todo 点击可排序-->
          <van-col span="4">日期</van-col>
          <van-col span="4">歌名</van-col>
          <van-col span="4">翻唱</van-col>
          <van-col span="6">Tags</van-col>
          <van-col span="6"></van-col>
        </van-row>
        <!--todo 不可同时播放-->
        <song
          :performance-date="resultSong.song.performanceDate"
          :song-name="resultSong.song.songName"
          :cover-singers="resultSong.singerArrayList"
          :song-path="resultSong.song.path"
          :song="resultSong.song"
          v-for="(resultSong, index) in resultSongs"
          :key="index"
        />
      </van-col>
    </van-row>
  </van-row>
</template>

<script>
import { Toast } from "vant";
import Song from "@/components/Song";
import SongCollection from "@/components/SongCollection";
import Constant from "../constants/import.constant";
import SingerApi from "../api/singer.api";
import SongApi from "../api/song.api";
import SongCollectionApi from "../api/songCollection.api";
import QuerySongCollectionApi from "../api/querySongCollection.api";
import OriginalSingerApi from "../api/originalSinger.api";

export default {
  name: "Import",
  components: { SongCollection, Song },
  data() {
    return {
      // 查询内容
      queryContent: null,
      // 当前查询类型
      currentQueryType: Constant.QUERY_OPTIONS.SONG_TITLE,
      // 查询选项
      queryOptions: [
        { text: "歌曲标题", value: Constant.QUERY_OPTIONS.SONG_TITLE },
        { text: "歌手", value: Constant.QUERY_OPTIONS.SINGER_NAME },
        // { text: "日期", value: Constant.QUERY_OPTIONS.PERFORMANCE_DATE },
      ],
      // 歌手
      singer: {
        singerName: null,
      },
      // 歌曲集合
      songCollection: {
        songTitle: null,
        chineseTitle: null,
        englishTitle: null,
      },
      // 查询到的歌曲集合
      // todo 未查询到时进行特殊说明
      resultSongCollections: [],
      // 查询到的单曲
      // todo 未查询到时进行特殊说明
      resultSongs: [],
      // 单曲
      song: {
        songName: null,
        performanceDate: null,
      },
      // 原唱歌手列表
      originalSingerList: [],
      // 翻唱歌手列表
      coverSingerList: [],
      // 歌曲文件内容
      file: {
        content: null,
        name: null,
        type: null,
        size: null,
      },
      // 设置日历组件是否跳出
      showCalender: false,
      // 展示歌曲列表
      showSongList: [],
    };
  },

  methods: {
    async onClickQueryContent() {
      switch (this.currentQueryType) {
        // 查询歌曲标题
        case Constant.QUERY_OPTIONS.SONG_TITLE:
          this.resultSongCollections = await QuerySongCollectionApi.querySongTitle(
            this.queryContent
          );
          break;
        // 查询歌手
        case Constant.QUERY_OPTIONS.SINGER_NAME:
          this.resultSongCollections = await QuerySongCollectionApi.querySingerName(
            this.queryContent
          );
          break;
        // 查询弹唱日期
        case Constant.QUERY_OPTIONS.PERFORMANCE_DATE:
          // this.resultSongs
          break;
        default:
      }
    },

    async onClickAddSinger() {
      // 新增歌手
      await SingerApi.addSinger(this.singer.singerName);
    },

    async onClickAddCollection() {
      // 新增歌曲集合
      await SongCollectionApi.addSongCollection(
        this.songCollection.songTitle,
        this.songCollection.chineseTitle,
        this.songCollection.englishTitle
      );
    },

    async onClickBindSongCollectionAndSinger() {
      // 绑定歌曲集合与歌手
      await OriginalSingerApi.bindSongCollectionAndSinger(
        this.songCollection.songTitle,
        this.singer.singerName
      );
    },

    async onClickUploadSong() {
      // 上传单曲
      await SongApi.importSong(
        this.file.name,
        this.song.performanceDate,
        this.file.content,
        this.songCollection.songTitle
      );
    },

    async updateResultSongs(resultSongs) {
      this.resultSongs = resultSongs;
    },

    onConfirmPerformanceDate(value) {
      this.showCalender = false;
      this.song.performanceDate = value.toLocaleDateString();
    },

    beforeRead(file) {
      // 检查文件类型
      if (file.type !== "audio/wav" && file.type !== "audio/mpeg") {
        Toast("请上传标准音乐格式文件");
        return false;
      }
      return true;
    },

    afterRead(event) {
      // 分析并获取文件相关信息
      this.file.content = event.content;
      this.file.name = event.file.name;
      this.file.type = event.file.type;
      // todo 文件大小设定+kb
      this.file.size = (event.file.size / 1024 / 1024).toFixed(2) + "MB";
    },
  },
};
</script>

<style lang="scss">
.main-container {
  width: 100%;
  .search-bar-container {
    font-size: 1.6rem;
    position: relative;
    width: 930px;
    background-color: blanchedalmond;
    border-radius: 12px;
    padding: 0.5em 0;
    margin: 2em auto;
    box-shadow: 0 1px 12px bisque;
    text-align: center;
    .search-bar {
    }
  }
  .manage-container {
    position: relative;
    text-align: center;
    width: 100%;
    .operation-side-bar-container {
      position: relative;
      background-color: #ebedf0;
      padding: 1em;
      .add-singer {
      }
      .add-song-collection {
      }
      .bind-cover-singer {
      }
      .import-song {
      }
    }
    .show-search-result-container {
      position: relative;
      background-color: #c8c9cc;
      padding: 1em;
      .filter-table {
        display: flex;
        background-color: cornsilk;
      }
    }
  }
}
</style>
