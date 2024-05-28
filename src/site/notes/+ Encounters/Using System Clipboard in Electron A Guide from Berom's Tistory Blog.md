---
{"aliases":null,"link":null,"up":null,"persona":null,"index":null,"related":null,"tistoryBlogName":"berom","tistoryTitle":"Electron에서 시스템 클립보드 사용하기","tistoryTags":"electron","tistoryVisibility":"3","tistoryCategory":"1071006","tistorySkipModal":true,"tistoryPostId":"573","tistoryPostUrl":"https://berom.tistory.com/573","tags":["Electron"],"dg-publish":true,"date_created":"2024-02-09","date_modified":"2024-04-14","permalink":"/encounters/using-system-clipboard-in-electron-a-guide-from-berom-s-tistory-blog/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-02-09T14:06:11.074+09:00","updated":"2024-04-14T10:57:15.286+09:00"}
---

# Electron에서 시스템 클립보드 사용하기

Electron 애플리케이션 개발 시, 시스템 클립보드와의 상호작용은 사용자 경험을 크게 향상시킬 수 있는 중요한 기능입니다. Electron은 `clipboard` 모듈을 통해 이러한 상호작용을 용이하게 만들어 줍니다. 이 문서에서는 Electron의 `clipboard` 모듈을 사용하여 텍스트 데이터를 복사하고 붙여넣기하는 기본적인 방법을 설명합니다.

## 클립보드 모듈 개요

Electron의 `clipboard` 모듈은 시스템 클립보드와의 상호작용을 위한 API를 제공합니다. 이 모듈을 사용하면 텍스트 데이터를 클립보드에 복사하거나 클립보드에서 텍스트 데이터를 읽어올 수 있습니다.

## 텍스트 복사하기

클립보드에 텍스트를 복사하는 것은 `clipboard.writeText(text)` 메서드를 호출함으로써 간단히 수행할 수 있습니다. 이 메서드에는 클립보드에 복사하고자 하는 텍스트 문자열을 인자로 전달합니다.

```javascript
const { clipboard } = require('electron');

function copyText(text) {
  clipboard.writeText(text);
  console.log('텍스트가 클립보드에 복사되었습니다.');
}
```

위 함수는 지정된 텍스트를 시스템 클립보드에 복사합니다. 이 텍스트는 사용자가 다른 애플리케이션에서 붙여넣기를 수행할 때까지 클립보드에 저장됩니다.

## 텍스트 붙여넣기

Electron 애플리케이션에서 클립보드의 내용을 프로그래매틱하게 붙여넣는 것은 직접적으로 수행되지 않습니다. 대신, 클립보드에 저장된 내용을 읽어와 애플리케이션에서 사용할 수 있습니다. 이는 `clipboard.readText()` 메서드를 사용하여 수행할 수 있습니다.

```javascript
const { clipboard } = require('electron');

function pasteText() {
  const text = clipboard.readText();
  console.log(`클립보드에서 읽은 텍스트: ${text}`);
  return text;
}
```

위 함수는 클립보드에 현재 저장된 텍스트를 읽어와 반환합니다. 이 텍스트는 애플리케이션 내에서 다양한 용도로 사용될 수 있습니다.

## 보안 고려사항

`clipboard` 모듈은 Electron의 메인 프로세스와 렌더러 프로세스 모두에서 사용할 수 있습니다. 하지만, 렌더러 프로세스에서 직접 `require('electron').clipboard`를 사용하는 것은 보안상의 위험이 있을 수 있습니다. 따라서, `contextBridge`와 `preload` 스크립트를 통해 안전하게 클립보드 기능을 렌더러 프로세스에 노출시키는 것이 권장됩니다.

## 결론

Electron의 `clipboard` 모듈을 사용하면, 시스템 클립보드와의 상호작용을 쉽게 구현할 수 있습니다. 이를 통해 사용자는 애플리케이션 간에 데이터를 효율적으로 복사하고 붙여넣을 수 있게 되며, 개발자는 사용자 경험을 향상시킬 수 있는 강력한 기능을 애플리케이션에 추가할 수 있습니다.