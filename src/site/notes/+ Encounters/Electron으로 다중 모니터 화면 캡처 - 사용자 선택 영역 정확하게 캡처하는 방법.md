---
{"tags":["Electron"],"date_created":"2024-02-07","date_modified":"2024-02-07","tistoryBlogName":"berom","tistoryTitle":"Electron으로 다중 모니터 화면 캡처 - 사용자 선택 영역 정확하게 캡처하는 방법","tistoryTags":"개발/Electron","tistoryVisibility":"3","tistoryCategory":"1071006","tistorySkipModal":true,"tistoryPostId":"569","tistoryPostUrl":"https://berom.tistory.com/569","dg-publish":true,"permalink":"/encounters/electron/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-02-07T09:10:30.512+09:00","updated":"2024-03-16T19:25:57.429+09:00"}
---

# Electron을 활용한 다중 모니터 화면 캡처 마스터하기

Electron은 웹 기술을 사용하여 크로스 플랫폼 데스크톱 애플리케이션을 개발하는 강력한 도구로, 다중 모니터 화면 캡처와 같은 고급 기능을 구현할 수 있습니다. 이 기능은 생산성 도구 및 그래픽 디자인 소프트웨어와 같이 여러 화면에서의 광범위한 사용자 상호작용이 필요한 애플리케이션에 필수적입니다. 이 블로그에서는 Electron의 `screen` API 및 기타 기술을 활용하여 사용자가 선택한 영역을 정확하게 다중 모니터에서 캡처하는 방법을 탐색하겠습니다.

## 모니터 정보 검색으로 시작하기

Electron의 `screen` API는 연결된 디스플레이와 그 속성을 식별하는 데 중요한 역할을 합니다. `screen.getAllDisplays()` 메서드는 모든 모니터에 대한 자세한 정보가 포함된 배열을 가져옵니다. 이 정보에는 각 모니터의 `bounds`가 포함되어 있으며, 이는 위치 (`x`, `y`)와 크기 (`width`, `height`) 정보를 제공합니다. 이 정보를 사용하면 **각 모니터의 정확한 위치와 크기에 캡처 창을 생성**할 수 있습니다.

```javascript
const { screen } = require('electron');

// 모든 모니터에 대한 정보 검색
const displays = screen.getAllDisplays();
```

## 각 모니터에 대한 캡처 창 생성

각 디스플레이 정보를 반복하면 각 디스플레이의 크기와 위치와 일치하는 캡처 창이 생성됩니다. `BrowserWindow` 생성자의 설정 객체는 각 캡처 창이 해당하는 모니터를 완전히 커버하도록 `x`, `y`, `width`, `height` 속성으로 구성됩니다.

```javascript
const { BrowserWindow } = require('electron');

displays.forEach(display => {
  const captureWindowSettings = {
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // 주의: 실제 사용 시 보안 고려사항을 반드시 고려해야 합니다.
    },
    x: display.bounds.x,
    y: display.bounds.y,
    width: display.bounds.width,
    height: display.bounds.height,
  };

  const captureWindow = new BrowserWindow(captureWindowSettings);
  captureWindow.loadURL('file:///path/to/capture/page.html');
});
```

## 섬네일 이미지 활용

`desktopCapturer.getSources`를 사용하여 캡처할 수 있는 소스의 섬네일을 가져올 때, `thumbnailSize` 옵션을 최대 해상도로 설정합니다. 이렇게 하면 **각 모니터의 실제 해상도에 가까운 섬네일을 얻을 수 있으며**, 이를 사용자에게 표시하기 위해 캡처 창에 보낼 수 있습니다.

```javascript
const { desktopCapturer } = require('electron');

async function getThumbnails() {
  const sources = await desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: { width: maxWidth, height: maxHeight },
  });

  return sources.map(source => source.thumbnail);
}
```

## 캡처 완료 처리

사용자가 캡처 영역을 선택하면 해당 영역 정보와 캡처 창의 ID가 주 프로세스로 전송됩니다. 주 프로세스는 이 정보를 사용하여 선택한 영역의 이미지를 처리하고 필요한 작업(예: 이미지 저장, OCR 처리)을 수행합니다.

```javascript
//

 렌더러 프로세스에서
const { ipcRenderer } = require('electron');

function sendCaptureAreaInfo(captureArea, windowId) {
  ipcRenderer.send('capture-area-info', { captureArea, windowId });
}

// 메인 프로세스에서
const { ipcMain } = require('electron');

ipcMain.on('capture-area-info', (event, { captureArea, windowId }) => {
  // 캡처 영역 및 창 ID를 기반으로 이미지 처리를 수행합니다.
});
```

## 문제 해결을 위한 추가 제안 사항

사용자 입력 및 모니터 `bounds` 정보를 비교하여 정확한 캡처 영역을 선택하고, 섬네일 해상도를 조정하거나 이미지 처리 로직을 최적화하여 성능을 향상시킬 수 있습니다.

```javascript
// 특정 모니터의 범위 내에 선택한 캡처 영역이 있는지 확인합니다.
function isCaptureAreaWithinDisplay(captureArea, display) {
  // captureArea와 display.bounds를 비교하는 로직을 구현합니다.
}
```

## 결론

주 프로세스에서 로직 처리의 마지막 단계에서는 캡처 영역 및 캡처 창의 ID에 따라 실제 이미지 처리 작업이 수행됩니다. 이 과정은 `sharp`와 같은 라이브러리를 사용하여 섬네일 이미지에서 사용자가 선택한 영역을 추출(자르기)하고 필요한 경우 이미지 내의 텍스트를 인식하기 위한 OCR 처리를 포함합니다. 마지막으로, 처리된 이미지 또는 텍스트 데이터가 사용자에게 결과를 표시하기 위해 주 창으로 다시 전송됩니다.

### 기술적 고려 사항

- **보안**: `nodeIntegration` 및 `contextIsolation`과 같은 설정은 Electron 애플리케이션의 보안에 큰 영향을 미칩니다. `contextIsolation`을 활성화하고 필요한 기능을 안전하게 제공하는 것이 좋습니다.

- **성능**: 이미지 처리 및 OCR 작업은 자원을 많이 사용할 수 있습니다. 응용 프로그램의 성능과 안정성을 유지하기 위해 비동기 처리 및 적절한 오류 처리를 구현해야 합니다.
