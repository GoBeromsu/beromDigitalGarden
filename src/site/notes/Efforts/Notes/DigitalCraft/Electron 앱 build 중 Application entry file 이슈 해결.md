---
{"tags":["digitalCrafts"],"aliases":null,"link":null,"up":null,"persona":null,"index":null,"date_created":"2024-02-09","date_modified":"2024-02-09","dg-publish":true,"permalink":"/efforts/notes/digital-craft/electron-build-application-entry-file/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-02-09T16:19:51.158+09:00","updated":"2024-03-16T19:20:09.008+09:00"}
---

# Application Entry File "build/main/main.js" in the

- [node.js - Application entry file does not exist in Electron Builder - Stack Overflow](https://stackoverflow.com/questions/48891142/application-entry-file-does-not-exist-in-electron-builder)
	- 여기 도움 받아서 해결

```json
{
  "name": "PixelScribe",
  "version": "1.0.0",
  "main": "dist/main/main.js",
  "license": "MIT",
  "author": "berom",
  "homepage": "./",
  "_moduleAliases": {
    "@main": "dist/main",
    "@render": "dist/render",
    "@common": "dist/common"
  },
  "scripts": {
    "dev": "concurrently --prefix none \"yarn react:start\" \"wait-on http://localhost:3000 && yarn electron:start\"",
    "react:start": "react-scripts start",
    "electron:start": "nodemon",
    "build": "react-scripts build",
    "electron-pack": "electron-builder",
    "preelectron-pack": "yarn build"
  },
  "electronWebpack": {
    "main": {
      "src": "src/main"
    },
    "renderer": {
      "src": "src/ui"
    }
  },
  "build": {
    "appId": "com.pixel-scribe",
    "extraMetadata": {
      "main": "dist/main/main.js"
    },
    "directories": {
      "buildResources": "assets",
      "output": "dist"
    },
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "mac": {
      "target": [
        "dmg",
        "zip"
      ]
    }
  },
  "devDependencies": {
    "@types/electron": "^1.6.10",
    "@types/node": "^20.11.5",
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3",
    "electron": "^28.2.0",
    "electron-builder": "^24.9.1",
    "module-alias": "^2.2.3",
    "nodemon": "^3.0.2",
    "wait-on": "^7.2.0"
  },
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.9",
    "@mui/material": "^5.15.9",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/path-browserify": "^1.0.2",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.18",
    "@types/react-router-dom": "^5.3.3",
    "electron-is-dev": "^3.0.1",
    "path-browserify": "^1.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "react-scripts": "5.0.1",
    "recoil": "^0.7.7",
    "screenshot-desktop": "^1.15.0",
    "sh": "^0.0.3",
    "sharp": "^0.33.2",
    "tesseract.js": "^5.0.4",
    "tsconfig-paths": "^4.0.0",
    "typescript": "^5.3.3"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Electron 앱을 빌드하는 과정에서 `electron-builder`가 응용 프로그램 진입 파일(`build/electron.js`)을 올바르게 찾지 못하는 문제가 발생하는 것 같습니다. 이 문제를 해결하기 위해, `electron-builder`의 구성을 조정하고 `package.json` 파일에서 빌드 관련 설정을 업데이트해야 합니다. 기존의 설명과 예시 코드를 기반으로 몇 가지 해결 방안을 제시하겠습니다.

## package.json 설정 업데이트

Electron 프로젝트의 `package.json` 파일에서 `build` 섹션을 업데이트하여, `electron-builder`에게 올바른 진입 파일 위치와 빌드 리소스를 지정해야 합니다. 또한, 개발 환경과 프로덕션 환경에서의 진입 파일 경로를 구분해야 할 수도 있습니다.

### 1. `main` 속성 수정

`package.json`에서 `main` 속성이 개발 환경에서 사용할 Electron 메인 파일을 가리키도록 설정되어 있어야 합니다. 빌드 과정에서는 `electron-builder`의 `extraMetadata` 설정을 통해 이 경로를 재정의할 수 있습니다.

```json
{
  "main": "public/electron.js",
  "build": {
    "appId": "com.example.yourapp",
    "extraMetadata": {
      "main": "build/electron.js"
    },
    "directories": {
      "buildResources": "assets",
      "output": "dist"
    },
    "files": [
      "build/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "mac": {
      "target": ["dmg", "zip"],
      "icon": "assets/icons/mac/icon.icns"
    }
  }
}
```
## 해결 방법
### 2. `electron-builder` 구성 수정

`electron-builder`는 `package.json`의 `build` 섹션에서 구성을 읽어옵니다. `files` 배열 내에 포함될 파일과 디렉터리를 명확히 지정하고, 필요한 리소스가 모두 포함되도록 해야 합니다. 위의 설정 예시에서는 `build` 디렉터리 내의 모든 파일, `node_modules`, 그리고 `package.json` 파일이 빌드에 포함됩니다.

### 3. `electron-pack` 스크립트 수정

`electron-builder`를 실행할 때 사용할 npm 스크립트를 `package.json`에 추가하거나 수정합니다. `electron-builder` 명령어에 옵션을 추가하여 진입 파일을 명시적으로 지정할 필요가 있습니다. 다음 예시와 같이 `electron-pack` 스크립트를 수정하세요.

```json
"scripts": {
  "start": "electron .",
  "build": "react-scripts build",
  "electron-pack": "electron-builder",
  "preelectron-pack": "npm run build"
}
```

## 문제 해결 후 단계

위의 설정을 적용한 후, 애플리케이션을 다시 빌드해보세요.

```bash
npm run electron-pack
```

또는

```bash
yarn electron-pack
```

이 과정을 통해 `electron-builder`가 올바르게 애플리케이션을 패키징하고, `dist` 디렉터리에 macOS용 앱을 생성해야 합니다. 만약 여전히 문제가 발생한다면, 설정 파일과 진입 파일의 경로를 다시 한번 확인하고, 필요하다면 Electron과 `electron-builder`의 문서를 참조하거나 커뮤니티에 도움을 요청하세요.

## 작동하는 package.json 
- "build": "tsc",
	- 위의 설정이 안되어서 그런 듯
	- 내부적으로 electron 실행하면 build를 하는건가?


``` 
{
  "name": "PixelScribe",
  "version": "1.0.0",
  "main": "dist/main/main.js",
  "license": "MIT",
  "author": "berom",
  "homepage": "./",
  "_moduleAliases": {
    "@main": "dist/main",
    "@ui": "dist/ui",
    "@common": "dist/common"
  },
  "scripts": {
    "build": "tsc",
    "dev": "concurrently --prefix none \"yarn react:start\" \"wait-on http://localhost:3000 && yarn electron:start\"",
    "react:start": "react-scripts start",
    "electron:start": "nodemon",
    "build": "react-scripts build",
    "electron-pack": "electron-builder",
    "preelectron-pack": "yarn build"
  },
  "electronWebpack": {
    "main": {
      "src": "src/main"
    },
    "renderer": {
      "src": "src/ui"
    }
  },
  "build": {
    "appId": "com.pixel-scribe",
    "extraMetadata": {
      "main": "dist/main/main.js"
    },
    "directories": {
      "buildResources": "assets",
      "output": "dist"
    },
    "files": [
      "dist/**/*",
      "node_modules/**/*",
      "package.json"
    ],
    "mac": {
      "target": [
        "dmg",
        "zip"
      ]
    }
  },
  "devDependencies": {
    "@types/electron": "^1.6.10",
    "@types/node": "^20.11.5",
    "concurrently": "^8.2.2",
    "cross-env": "^7.0.3",
    "electron": "^28.2.0",
    "electron-builder": "^24.9.1",
    "module-alias": "^2.2.3",
    "nodemon": "^3.0.2",
    "wait-on": "^7.2.0"
  },
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.9",
    "@mui/material": "^5.15.9",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/path-browserify": "^1.0.2",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.18",
    "@types/react-router-dom": "^5.3.3",
    "electron-is-dev": "^3.0.1",
    "path-browserify": "^1.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "react-scripts": "5.0.1",
    "recoil": "^0.7.7",
    "screenshot-desktop": "^1.15.0",
    "sh": "^0.0.3",
    "sharp": "^0.33.2",
    "tesseract.js": "^5.0.4",
    "tsconfig-paths": "^4.0.0",
    "typescript": "^5.3.3"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
## Thinking
- [[Calendar/Daily Notes/2024-02-09\|2024-02-09]] 16:33 이거 티스토리에 출간하셈
