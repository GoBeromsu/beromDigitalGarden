---
{"tags":null,"aliases":null,"link":null,"up":null,"persona":null,"index":null,"date_created":"2024-01-11","date_modified":"2024-01-11","dg-publish":true,"permalink":"/atlas/ideas/electron-window-capture-method-making-the-application-appear-as-a-window/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-01-11T19:57:15.399+09:00","updated":"2024-03-16T19:19:28.445+09:00"}
---

# [[Atlas/MAPS/Electron\|Electron]] 윈도우 캡처 방법 : 애플리케이션이 윈도우로 여겨지는 듯
Electron에서 `desktopCapturer` 모듈을 사용하여 특정 윈도우를 캡처하려면, 캡처 타입을 `window`로 설정하고 원하는 윈도우를 식별하여 캡처해야 합니다. 다음은 이를 수행하기 위한 기본적인 절차입니다.

## 캡처 타입 'window' 설정

1. **`desktopCapturer.getSources` 호출 변경**: 캡처 타입을 `window`로 설정합니다. 이렇게 하면 열려 있는 모든 윈도우의 목록을 가져올 수 있습니다.

    ```javascript
    const sources = await desktopCapturer.getSources({ types: ['window'] });
    ```

2. **원하는 윈도우 찾기**: 반환된 소스 목록에서 캡처하고자 하는 윈도우를 찾습니다. 이는 윈도우의 타이틀(예: "Obsidian")을 기반으로 할 수 있습니다.

    ```javascript
    const obsidianWindow = sources.find(source => source.name === "Obsidian");
    ```

3. **윈도우 캡처**: 찾은 윈도우의 썸네일 이미지를 사용하여 캡처할 수 있습니다.

    ```javascript
    if (obsidianWindow) {
      event.sender.send("window-captured", obsidianWindow.thumbnail.toDataURL());
    } else {
      console.error("원하는 윈도우를 찾을 수 없습니다.");
    }
    ```

## 예시: 특정 윈도우 캡처하기

```javascript
ipcMain.on("capture-window", async (event, windowName) => {
  const sources = await desktopCapturer.getSources({ types: ['window'] });
  const targetWindow = sources.find(source => source.name === windowName);

  if (targetWindow) {
    event.sender.send("window-captured", targetWindow.thumbnail.toDataURL());
  } else {
    console.error(`${windowName} 윈도우를 찾을 수 없습니다.`);
  }
});
```

## 주의사항

- `desktopCapturer.getSources`는 열려 있는 모든 윈도우를 반환합니다. 따라서 원하는 윈도우를 식별하기 위한 명확한 기준이 필요합니다.
- 윈도우의 타이틀이 동적으로 변경될 수 있으므로, 식별 방법을 신중히 선택해야 합니다.
- 화면 캡처 기능은 사용자의 운영 체제 및 권한 설정에 따라 제한될 수 있습니다.