---
{"tags":["Electron"],"aliases":null,"link":null,"up":null,"persona":null,"date_created":"2024-01-08","date_modified":"2024-01-08","dg-publish":true,"permalink":"/atlas/ideas/implementing-full-screen-capture-feature-in-pixel-scriber-using-electron/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-01-08T23:51:23.193+09:00","updated":"2024-03-16T19:21:11.453+09:00"}
---

# PixelScriber - 전체 화면 캡처 기능 구현
- [[Atlas/MAPS/Electron\|Electron]]에서 화면 캡처의 고화질과 원본 사이즈를 얻으려면 `desktopCapturer.getSources` 메서드를 호출할 때 옵션을 조정해야 한다
	- 기본적으로 `desktopCapturer.getSources`는 썸네일 이미지를 반환한다
		- 이는 일반적으로 **원본 화면 해상도보다 낮은 해상도를 가집니다**.
- 원본 해상도의 이미지를 얻기 위해서는 `thumbnailSize` 옵션을 화면의 해상도에 맞게 조정해야 합니다.
	- `const primaryDisplay = screen.getPrimaryDisplay();`

## `ipcMain` 이벤트 핸들러 수정

`ipcMain.on("capture-screen", async (event) => { … });` 부분에서 `thumbnailSize` 옵션을 화면 해상도에 맞게 설정합니다. 
예를 들어, 전체 화면 해상도를 얻으려면 `screen` 모듈을 사용하여 현재 화면의 해상도를 얻고, 그 값을 `thumbnailSize`로 설정합니다.

```javascript
ipcMain.on("capture-screen", async (event) => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.size;

  const sources = await desktopCapturer.getSources({
    types: ["screen"],
    thumbnailSize: { width, height } // 화면 해상도에 맞게 설정
  });

  const source = sources[0];
  event.sender.send("screen-captured", source.thumbnail.toDataURL());
});
```

## 주의사항
- 이 방법은 시스템의 메모리와 CPU 사용량을 증가시킬 수 있으므로, 성능에 영향을 줄 수 있습니다.
- 화면 캡처의 크기가 커질수록 이미지를 처리하고 전송하는 데 더 많은 시간이 소요될 수 있습니다.
- `desktopCapturer.getSources`를 호출할 때 `thumbnailSize`를 너무 크게 설정하면 메모리 문제가 발생할 수 있으니 주의해야 합니다.

