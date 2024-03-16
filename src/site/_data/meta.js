// 환경 변수를 로드합니다.
require("dotenv").config();
// glob 모듈을 가져옵니다.
const { globSync } = require("glob");

// 모듈을 내보냅니다.
module.exports = async (data) => {
  // 환경 변수에서 기본 URL을 가져옵니다.
  let baseUrl = process.env.SITE_BASE_URL || "";
  // URL이 http로 시작하지 않으면 https://를 추가합니다.
  if (baseUrl && !baseUrl.startsWith("http")) {
    baseUrl = "https://" + baseUrl;
  }

  // 테마 스타일 파일을 찾습니다.
  let themeStyle = globSync("src/site/styles/_theme.*.css")[0] || "";
  // 테마 스타일 파일 경로에서 'site' 이후의 부분만 가져옵니다.
  if (themeStyle) {
    themeStyle = themeStyle.split("site")[1];
  }

  // body에 추가할 클래스를 저장할 배열을 생성합니다.
  let bodyClasses = [];
  // 노트 아이콘 설정을 저장할 객체를 생성합니다.
  let noteIconsSettings = {
    filetree: false,
    links: false,
    title: false,
    default: process.env.NOTE_ICON_DEFAULT,
  };

  // 스타일 설정을 가져옵니다.
  const styleSettingsCss = process.env.STYLE_SETTINGS_CSS || "";
  const styleSettingsBodyClasses =
    process.env.STYLE_SETTINGS_BODY_CLASSES || "";

  // 노트 아이콘 설정에 따라 body 클래스를 추가하고 noteIconsSettings를 업데이트합니다.
  // 각 환경 변수가 'true'인 경우에만 해당 작업을 수행합니다.
  if (process.env.NOTE_ICON_TITLE && process.env.NOTE_ICON_TITLE == "true") {
    bodyClasses.push("title-note-icon");
    noteIconsSettings.title = true;
  }
  if (
    process.env.NOTE_ICON_FILETREE &&
    process.env.NOTE_ICON_FILETREE == "true"
  ) {
    bodyClasses.push("filetree-note-icon");
    noteIconsSettings.filetree = true;
  }
  if (
    process.env.NOTE_ICON_INTERNAL_LINKS &&
    process.env.NOTE_ICON_INTERNAL_LINKS == "true"
  ) {
    bodyClasses.push("links-note-icon");
    noteIconsSettings.links = true;
  }
  if (
    process.env.NOTE_ICON_BACK_LINKS &&
    process.env.NOTE_ICON_BACK_LINKS == "true"
  ) {
    bodyClasses.push("backlinks-note-icon");
    noteIconsSettings.backlinks = true;
  }

  // 스타일 설정에 따라 body 클래스를 추가합니다.
  if (styleSettingsCss) {
    bodyClasses.push("css-settings-manager");
  }
  if (styleSettingsBodyClasses) {
    bodyClasses.push(styleSettingsBodyClasses);
  }

  // 타임스탬프 설정을 저장할 객체를 생성합니다.
  let timestampSettings = {
    timestampFormat: process.env.TIMESTAMP_FORMAT || "MMM dd, yyyy h:mm a",
    showCreated: process.env.SHOW_CREATED_TIMESTAMP == "true",
    showUpdated: process.env.SHOW_UPDATED_TIMESTAMP == "true",
  };

  // 메타 데이터를 저장할 객체를 생성합니다.
  const meta = {
    env: process.env.ELEVENTY_ENV,
    theme: process.env.THEME,
    themeStyle,
    bodyClasses: bodyClasses.join(" "),
    noteIconsSettings,
    timestampSettings,
    baseTheme: process.env.BASE_THEME || "dark",
    siteName: process.env.SITE_NAME_HEADER || "Digital Garden",
    mainLanguage: process.env.SITE_MAIN_LANGUAGE || "en",
    siteBaseUrl: baseUrl,
    styleSettingsCss,
    buildDate: new Date(),
  };

  // 메타 데이터 객체를 반환합니다.
  return meta;
};
