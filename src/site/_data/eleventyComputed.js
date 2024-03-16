const { getGraph } = require("../../helpers/linkUtils");
const { getFileTree } = require("../../helpers/filetreeUtils");
const { userComputed } = require("../../helpers/userUtils");

module.exports = {
  // getGraph 함수를 사용하여 그래프를 생성합니다.
  graph: (data) => getGraph(data),
  // getFileTree 함수를 사용하여 파일 트리를 생성합니다.
  filetree: (data) => getFileTree(data),
  // userComputed 함수를 사용하여 사용자 계산 값을 생성합니다.
  userComputed: (data) => userComputed(data),
};
