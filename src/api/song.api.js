import { axios } from "../main";
import { Toast } from "vant";

// 上传单曲
// 默认翻唱歌手为 椎名なのは
const importSong = async (
  fileName,
  performanceDate,
  songFileContent,
  songTitle
) => {
  return await new Promise(() => {
    axios({
      method: "post",
      url: "/song/import",
      data: {
        fileName: fileName,
        performanceDate: performanceDate,
        songFileContent: songFileContent,
        songTitle: songTitle,
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
        console.log(err.response);
        // 失败信息弹窗
        Toast(err.response.data);
      });
  });
};

// 删除单曲
const deleteSong = async (songId) => {
  return await new Promise(() => {
    axios({
      method: "post",
      url: "/song/delete",
      data: {
        songId: songId,
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
        console.log(err.response);
        // 失败信息弹窗
        Toast(err.response.data);
      });
  });
};

export default {
  importSong,
  deleteSong,
};
