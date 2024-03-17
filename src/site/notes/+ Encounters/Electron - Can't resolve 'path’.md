---
{"tags":null,"aliases":null,"link":null,"up":null,"persona":null,"index":null,"date_created":"2024-01-26","date_modified":"2024-01-29","dg-publish":true,"permalink":"/encounters/electron-can-t-resolve-path/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-01-26T17:57:36.007+09:00","updated":"2024-03-16T19:38:31.979+09:00"}
---

# Electron - Can't Resolve 'path’
## 문제
- Electorn에서 Can’tResolve path 에러가 갑자기 발생했다, 리액트로 마이그래션 하던 중에 일어난 문제였다

## 해결 방법

- yarn add path-browserify @types/path-browserify
- [[Efforts/Notes/DigitalCraft/Modification of Enabling Full Screen Capture through Dragging\|Modification of Enabling Full Screen Capture through Dragging]]


```js
resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253
      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),
      fallback: { // not present by default
        path: require.resolve("path-browserify"),

      },
```
## Thinking
- [[Calendar/Daily Notes/2024-01-29\|2024-01-29]] 15:53 근데 근본적으로 일렉트론 프로세스에 대해서 이해를 하면 해결 할 수 있다는데? electron api를 렌더러 프로세스에서 직접 접근을 할 수가 없데
