import { axios } from "../main";
import { Toast } from "vant";

// 新增歌曲集合
const addSongCollection = async (songTitle, chineseTitle, englishTitle) => {
  return await new Promise(() => {
    axios({
      method: "post",
      url: "/songCollection/add",
      data: {
        songTitle: songTitle,
        chineseTitle: chineseTitle,
        englishTitle: englishTitle,
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

// 删除歌曲集合
const deleteSongCollection = async (songCollectionId) => {
  return await new Promise(() => {
    axios({
      method: "post",
      url: "/songCollection/delete",
      data: {
        songCollectionId: songCollectionId,
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
  addSongCollection,
  deleteSongCollection,
};
