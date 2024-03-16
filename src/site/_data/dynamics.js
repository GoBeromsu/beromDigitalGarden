const fsFileTree = require("fs-file-tree");

const BASE_PATH = "src/site/_includes/components/user";
const STYLE_PATH = "src/site/styles/user";
const NAMESPACES = ["index", "notes", "common"];
const SLOTS = ["head", "header", "beforeContent", "afterContent", "footer"];
const FILE_TREE_NAMESPACE = "filetree";
const FILE_TREE_SLOTS = ["beforeTitle", "afterTitle"];
const SIDEBAR_NAMESPACE = "sidebar";
const SIDEBAR_SLOTS = ["top", "bottom"];
const STYLES_NAMESPACE = "styles";

/**
 * 네임스페이스와 슬롯을 기반으로 컴포넌트 경로를 생성합니다.
 *
 * @param {string} namespace - 컴포넌트 경로를 위한 네임스페이스입니다.
 * @param {Array<string>} slots - 컴포넌트 경로를 생성할 슬롯입니다.
 * @returns {Promise<Object>} - 생성된 컴포넌트 경로를 포함하는 객체를 반환하는 프로미스입니다.
 */
const generateComponentPaths = async (namespace, slots) => {
  const data = {};
  for (let index = 0; index < slots.length; index++) {
    const slot = slots[index];
    try {
      const tree = await fsFileTree(`${BASE_PATH}/${namespace}/${slot}`);
      let comps = Object.keys(tree)
        .filter((p) => p.indexOf(".njk") != -1)
        .map((p) => `components/user/${namespace}/${slot}/${p}`);
      comps.sort();
      data[slot] = comps;
    } catch {
      data[slot] = [];
    }
  }
  return data;
};

/**
 * 스타일 경로를 생성하는 함수입니다.
 * @returns {Promise<string[]>} 스타일 경로 배열을 반환합니다.
 */
const generateStylesPaths = async () => {
  try {
    const tree = await fsFileTree(`${STYLE_PATH}`);
    let comps = Object.keys(tree).map((p) =>
      `/styles/user/${p}`.replace(".scss", ".css")
    );
    comps.sort();
    return comps;
  } catch {
    return [];
  }
};
// 모듈을 비동기 함수로 내보냅니다.
module.exports = async () => {
  // 빈 객체를 생성합니다.
  const data = {};

  // NAMESPACES 배열의 모든 요소에 대해 반복합니다.
  for (let index = 0; index < NAMESPACES.length; index++) {
    // 현재 네임스페이스를 가져옵니다.
    const ns = NAMESPACES[index];

    // generateComponentPaths 함수를 비동기적으로 호출하고,
    // 결과를 data 객체의 해당 네임스페이스 속성에 할당합니다.
    data[ns] = await generateComponentPaths(ns, SLOTS);
  }

  // FILE_TREE_NAMESPACE, SIDEBAR_NAMESPACE, STYLES_NAMESPACE에 대해서도
  // 같은 작업을 수행합니다.
  data[FILE_TREE_NAMESPACE] = await generateComponentPaths(
    FILE_TREE_NAMESPACE,
    FILE_TREE_SLOTS
  );
  data[SIDEBAR_NAMESPACE] = await generateComponentPaths(
    SIDEBAR_NAMESPACE,
    SIDEBAR_SLOTS
  );
  data[STYLES_NAMESPACE] = await generateStylesPaths();

  // 최종적으로 data 객체를 반환합니다.
  return data;
};
