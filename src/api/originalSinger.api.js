import { axios } from "../main";
import { Toast } from "vant";

// 关联歌曲集合与歌手
const bindSongCollectionAndSinger = async (songTitle, singerName) => {
  return await new Promise(() => {
    axios({
      method: "post",
      url: "/originalSinger/relate",
      data: {
        songTitle: songTitle,
        singerName: singerName,
      },
    })
      .then((responseEntity) => {
        console.log(responseEntity);
        // 访问成功
        if (200 === responseEntity.status) {
          // 成功信息弹窗
          Toast(responseEntity.data);
        }
      })
      .catch((err) => {
        // 输出错误信息
        console.log(err.response);
        // 失败信息弹窗
        Toast(err.response.data);
      });
  });
};

export default {
  bindSongCollectionAndSinger,
};
