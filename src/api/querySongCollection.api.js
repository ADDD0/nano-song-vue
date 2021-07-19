import { axios } from "@/main";
import { Toast } from "vant";

// 通过歌曲标题查询歌曲集合及相关信息
const querySongTitle = async (songTitle) => {
  return await new Promise((resolve) => {
    axios({
      method: "post",
      url: "/querySongCollection/songTitle",
      data: {
        songTitle: songTitle,
      },
    })
      .then((responseEntity) => {
        console.log(responseEntity);
        // 访问成功
        if (200 === responseEntity.status) {
          // 传递查询到的数据
          resolve(responseEntity.data.queryResponseResourceArrayList);
        }
      })
      .catch((err) => {
        console.log(err.response);
        // 失败信息弹窗
        Toast(err.response.data);
      });
  });
};

// 通过歌手姓名查询歌曲集合及相关信息
const querySingerName = async (singerName) => {
  return await new Promise((resolve) => {
    axios({
      method: "post",
      url: "/querySongCollection/singerName",
      data: {
        singerName: singerName,
      },
    })
      .then((responseEntity) => {
        console.log(responseEntity);
        // 访问成功
        if (200 === responseEntity.status) {
          // 传递查询到的数据
          resolve(responseEntity.data.queryResponseResourceArrayList);
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
  querySongTitle,
  querySingerName,
};
