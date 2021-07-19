import { axios } from "@/main";
import { Toast } from "vant";

// 通过弹唱日期查询歌曲及相关信息
const queryPerformanceDate = async (performanceDate) => {
  return await new Promise((resolve) => {
    axios({
      method: "post",
      url: "/querySong/performanceDate",
      data: {
        performanceDate: performanceDate,
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

// 通过歌曲集合id查询歌曲及相关信息
const querySongCollectionId = async (songCollectionId) => {
  return await new Promise((resolve) => {
    axios({
      method: "post",
      url: "/querySong/songCollectionId",
      data: {
        songCollectionId: songCollectionId,
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
  queryPerformanceDate,
  querySongCollectionId,
};
