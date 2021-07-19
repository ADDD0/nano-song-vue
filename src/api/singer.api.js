import { axios } from "../main";
import { Toast } from "vant";

// 新增歌手
const addSinger = async (singerName) => {
  return await new Promise(() => {
    axios({
      method: "post",
      url: "/singer/add",
      data: {
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
        console.log(err.response);
        // 失败信息弹窗
        Toast(err.response.data);
      });
  });
};

export default {
  addSinger,
};
