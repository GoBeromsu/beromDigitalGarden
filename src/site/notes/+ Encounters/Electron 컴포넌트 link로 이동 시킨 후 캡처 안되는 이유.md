---
{"tags":["Electron"],"date_created":"2024-02-09","date_modified":"2024-02-09","tistoryBlogName":"berom","tistoryTitle":"Electron 컴포넌트 link로 이동 시킨 후 캡처 안되는 이유","tistoryTags":"Electron","tistoryVisibility":"3","tistoryCategory":"1069684","tistorySkipModal":true,"tistoryPostId":"574","tistoryPostUrl":"https://berom.tistory.com/574","dg-publish":true,"permalink":"/encounters/electron-link/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-02-09T14:09:19.577+09:00","updated":"2024-03-16T19:20:25.245+09:00"}
---

# 앱 전체를 아우르는 화면 캡처: Recoil 상태 관리의 힘

현대의 웹 애플리케이션 개발에서 상태 관리는 사용자 경험(UX)을 향상시키고, 앱의 동작을 예측 가능하게 만드는 중요한 역할을 합니다. 특히, [[Atlas/MAPS/⚙️ React\|⚙️ React]]와 같은 모던 프런트엔드 라이브러리/프레임워크를 사용하는 경우, 전역 상태 관리는 앱의 다양한 부분에서 데이터를 쉽게 공유하고 업데이트할 수 있게 해줍니다. 본 블로그에서는 React 애플리케이션 내에서 전역적으로 화면 캡처 기능을 구현하기 위해 Recoil 상태 관리 라이브러리가 어떻게 필요했는지 탐구합니다.

## 상태 관리의 필요성
캡처 기능이 전역적으로 작동하려면, 어플리케이션의 모든 컴포넌트가 캡처된 데이터에 접근할 수 있어야 합니다.
왜냐하면, 캡처 기능은 전역적으로 어떤 뷰를 보여주든 단축키를 눌렀을 때 캡처가 되어야하는데 되어야 하기 때문입니다. 이를 고려하지 않고 같은 윈도우니까 되겠지했는데 당연히 되지 않았습니다

1. **캡처된 이미지 데이터의 전역 관리**: 사용자가 애플리케이션의 어느 위치에서든 캡처 요청을 할 수 있고, 캡처 결과를 전역적으로 액세스 가능해야 합니다.
2. **비동기적인 데이터 처리**: Electron의 메인 프로세스에서 캡처 작업이 비동기적으로 수행되므로, 이에 대응할 수 있는 상태 관리가 필요합니다.
3. **상태의 실시간 업데이트**: 캡처 작업의 결과는 애플리케이션의 여러 부분에서 실시간으로 반영되어야 합니다.

## 그래서, Recoil을 사용했습니다

Recoil은 React 애플리케이션을 위한 상태 관리 라이브러리로, 가볍고 상태 관리를 단순화합니다. 전역 캡처 기능 구현에 Recoil이 필요했던 이유는 다음과 같습니다:

1. **Atom을 통한 상태의 전역 관리**: Recoil의 Atom을 사용하면, 캡처된 이미지 데이터를 전역 상태로 저장하고, 애플리케이션의 어느 컴포넌트에서든 이 상태에 접근할 수 있습니다.
2. **Selector를 통한 비동기 작업 처리**: Recoil Selector는 비동기 로직을 캡슐화하여, 캡처 요청의 결과를 처리하고 상태를 업데이트하는 데 이상적인 메커니즘을 제공합니다.
3. **최상위 컴포넌트에서의 상태 관리**: `App.tsx`가 최상위 컴포넌트로서, `RecoilRoot`를 통해 전역 상태를 관리함으로써, 애플리케이션 전체에서 캡처 상태를 일관되게 유지할 수 있습니다.

### Recoil을 선택한 이유

이러한 과제를 해결하기 위해, Recoil 상태 관리 라이브러리를 선택했습니다. Recoil은 React 애플리케이션을 위해 설계된 상태 관리 라이브러리로, 전역 상태를 쉽고 효율적으로 관리할 수 있는 간결하면서도 강력한 기능을 제공합니다.

### 1. Atom을 통한 상태의 전역 관리

```tsx
// state/captureAtom.ts
import { atom } from "recoil";

export const ocrTextState = atom({
  key: "ocrTextState",
  default: "",
});

export const gptResponseState = atom({
  key: "gptResponseState",
  default: "",
});

export const imageDataState = atom({
  key: "imageDataState",
  default: "",
});
```

Recoil의 `atom`을 사용하여 캡처된 이미지, OCR 텍스트, GPT 응답 데이터를 전역 상태로 관리합니다. 이를 통해 애플리케이션 내 어디서든 이 상태들에 접근할 수 있습니다.

### 2. 전역 이벤트 리스너 설정

```tsx
// App.tsx
useEffect(() => {
  window.electronAPI.on('captureCompleted', handleCaptureCompleted);

  return () => {
    window.electronAPI.off('captureCompleted', handleCaptureCompleted);
  };
}, []);
```

`App.tsx` 컴포넌트에서 전역 이벤트 리스너를 설정하여 Electron의 캡처 완료 이벤트를 수신합니다. 이를 통해 캡처 기능이 전역적으로 일관되게 작동하도록 합니다.

### 3. 캡처 데이터 활용

```tsx
// Clipboard.tsx
useEffect(() => {
  window?.electronAPI?.on(onOCRrecognized, handleOCRRecognition);
  window?.electronAPI?.on(onGPTResponsed, handleGPTResponse);
  window?.electronAPI?.on(onCapturedImage, handleImageCapture);

  return () => {
    window?.electronAPI?.off(onOCRrecognized, handleOCRRecognition);
    window?.electronAPI?.off(onGPTResponsed, handleGPTResponse);
    window?.electronAPI?.off(onCapturedImage, handleImageCapture);
  };
}, []);
```

캡처 버튼 클릭 이벤트와 같은 사용자 인터랙션을 통해 캡처 요청을 전송하고, 캡처된 데이터를 실시간으로 화면에 반영합니다.

## 결론

Recoil을 사용함으로써, 전역적으로 캡처 기능을 효율적으로 구현할 수 있었습니다. 애플리케이션의 모든 컴포넌트에서 캡처 데이터에 쉽게 접근하고, 사용자 인터랙션에 실시간으로 반응할 수 있는 구조를 마련했습니다.