---
{"dg-publish":true,"permalink":"/encounters/electron-cannot-find-module-module-alias-register/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-02-09T16:21:37.521+09:00","updated":"2024-03-16T19:20:10.409+09:00"}
---

에러 메시지에 따르면, Electron 앱이 `module-alias/register` 모듈을 찾을 수 없는 문제가 발생하고 있습니다. 이는 일반적으로 두 가지 주요 원인으로 인해 발생할 수 있습니다:

1. **모듈이 프로젝트의 `dependencies`에 포함되지 않았거나 제대로 설치되지 않았습니다**: `module-alias`는 실행 시간에 경로 별칭을 등록하여 모듈을 더 쉽게 `require`할 수 있게 해주는 유틸리티입니다. 이 모듈이 `devDependencies`에만 포함되어 있고 `dependencies`에는 포함되지 않았다면, 프로덕션 빌드에서는 포함되지 않을 수 있습니다.

2. **패키징 과정에서 모듈이 제외되었습니다**: Electron 앱을 패키징할 때, `electron-builder`나 다른 패키징 도구의 설정에 따라 일부 노드 모듈이 최종 앱 번들에서 제외될 수 있습니다. 이 경우, `module-alias`가 누락되어 실행 시 해당 모듈을 찾을 수 없게 됩니다.

### 해결 방법

#### 1. `module-alias`를 `dependencies`에 추가

`module-alias`가 실제 앱 실행에 필요한 경우, `devDependencies`가 아닌 `dependencies`에 추가해야 합니다. 다음 명령어를 사용하여 설치하세요:

```bash
npm install module-alias --save
```

또는 `yarn`을 사용하는 경우:

```bash
yarn add module-alias
```

이렇게 하면 `module-alias`가 프로덕션 의존성으로 올바르게 추가되어, 패키징 과정에서 앱과 함께 번들링됩니다.

#### 2. `electron-builder` 설정 검토

`electron-builder`의 `package.json` 내 `build` 설정을 검토하여, `module-alias`가 제외되지 않도록 설정하세요. 필요한 모든 노드 모듈이 포함되도록 `files` 항목을 적절히 구성합니다.

예시:

```json
"build": {
  "files": [
    "dist/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  …
}
```

#### 3. `module-alias` 설정 확인

`module-alias`를 사용하기 위해 프로젝트의 루트에 `_moduleAliases` 설정이 `package.json`에 올바르게 추가되어 있는지 확인하세요. 또한, `module-alias/register`를 앱의 진입점에서 최상단에 `require`하고 있는지 확인합니다.

```json
// package.json
{
  "_moduleAliases": {
    "@root": ".",
    "@src": "dist",
    …
  }
}
```

```javascript
// 앱의 진입 파일 (예: main.js)
require('module-alias/register');
…
```

위 단계를 통해 문제를 해결할 수 있습니다. 변경 사항을 적용한 후 앱을 다시 빌드하고, 문제가 해결되었는지 확인하세요. 만약 여전히 문제가 해결되지 않는다면, `module-alias`의 사용 방법과 `electron-builder`의 문서를 다시 검토하여 설정이 올바른지 확인해 보세요.
## Thinking
- [[Calendar/Daily Notes/2024-02-09\|2024-02-09]] 16:34 이거도 티스토리
