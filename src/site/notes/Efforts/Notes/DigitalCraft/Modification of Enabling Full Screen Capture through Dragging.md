---
{"aliases":"J - 드래그로 화면 전체 캡처하도록 수정","persona":null,"tags":null,"link":null,"date_created":"2024-01-26","date_modified":"2024-02-05","status":"done","dg-publish":true,"index":["[[🏷 Project_Notes]]"],"up":"[[TextShot]]","permalink":"/efforts/notes/digital-craft/modification-of-enabling-full-screen-capture-through-dragging/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-01-26T18:09:43.751+09:00","updated":"2024-03-16T19:47:52.212+09:00"}
---

# J - 드래그로 화면 전체 캡처하도록 수정
## 드래그 화면 전체 화면으로 수정

1. **투명 창 생성**: Electron의 `BrowserWindow`를 사용하여 전체 화면을 덮는 투명한 창을 생성합니다.
2. **영역 선택**: 마우스 이벤트를 사용하여 사용자가 선택한 영역을 추적합니다.
3. **선택된 영역 정보 전송**: 선택된 영역의 좌표와 크기를 메인 프로세스로 전송합니다.

### [[Calendar/Daily Notes/2024-02-04\|2024-02-04]]
- 메인 화면과 투명 창을 분리해야 함
- 레퍼런스
	- 전체 화면 캡처하는 방법 레퍼런스 찾아 볼 것
### [[Calendar/Daily Notes/2024-02-05\|2024-02-05]]
- 리팩토링 진행함
- API 이름을 상수로 변경하는 것은 매우 좋은 접근 방법입니다. 상수를 사용함으로써 여러 장점을 얻을 수 있습니다:

1. **오타 방지**: 문자열 리터럴을 직접 입력하는 경우 오타가 발생할 가능성이 있습니다. 상수를 사용하면 이러한 실수를 줄일 수 있습니다.
2. **중앙 관리**: 모든 API 이름이 한 곳에서 관리되므로, 변경 사항이 있을 때 한 곳만 수정하면 됩니다. 이는 유지 보수성을 크게 향상시킵니다.
3. **명확한 의미 전달**: 상수의 이름을 통해 API의 목적이나 행위를 더 명확하게 전달할 수 있으며, 코드의 가독성을 향상시킵니다.


#### 상수 정의
API 이름을 저장할 상수를 정의하는 파일(예: `constants.js` 또는 `eventNames.ts` 등)을 만듭니다. TypeScript를 사용하는 경우, 이 파일에서 상수의 타입도 지정할 수 있습니다.

```javascript
// constants.js 또는 eventNames.ts
\
export const PROCESS_SELECTED_AREA = "processSelectedArea";
```

#### 상수 사용

이제 이 상수들을 메인 프로세스와 프리로드 스크립트 양쪽에서 모두 임포트하여 사용합니다.

**메인 프로세스 (`main.js` 또는 `main.ts`):**

```javascript
import { ipcMain } from 'electron';
import { START_CAPTURE_SCREEN, PROCESS_SELECTED_AREA } from './constants';

ipcMain.on(START_CAPTURE_SCREEN, async (event) => {
  // 전체 화면 캡처 시작 로직
});

ipcMain.on(PROCESS_SELECTED_AREA, async (event, captureArea) => {
  // 선택된 캡처 영역 처리 로직
});
```

**프리로드 스크립트 (`preload.js` 또는 `preload.ts`):**

```javascript
const { contextBridge, ipcRenderer } = require('electron');
import { START_CAPTURE_SCREEN, PROCESS_SELECTED_AREA } from './constants';

contextBridge.exposeInMainWorld('api', {
  startCaptureScreen: () => ipcRenderer.send(START_CAPTURE_SCREEN),
  processSelectedArea: (captureArea) => ipcRenderer.send(PROCESS_SELECTED_AREA, captureArea),
});
``` 
## [[Calendar/Daily Notes/2024-02-06\|2024-02-06]]
- Electron API 리팩토링
- 캡처 시작시, 새로 뜨는 윈도우에 버퍼 전송해서 띄우기

# 로직
- 윈도우
	- main window
	- capture window
1. 화면 캡처 버튼 클릭
	- Full Screen 버퍼 저장
	- capture winodw로 이미지 버퍼 전송
2. 모니터 전체 화면에 Full Screen 버퍼 이미지 띄움
	- 캡처를 위한 모든 모니터의 화면을 전체 화면으로 띄움
3. 원하는 영역을 드래그 앤 드롭
	1. 드래그 좌표들을 main 프로세스로 던짐
	2. 메인 프로세스에서는 저장 된 Full Screen Buffer에서 좌표 크기만큼 자름
	- **제대로 좌표가 캡처 되는지 확인 필요**
	- 이제 여기에서 OCR 시작하면 됨

# 버그
## 화면 캡처 할 때 일렉트론 앱 어플리케이션 내에서만 캡처 됨
- 아마 같은 비율로 앱 안으로 캡처 화면을 모두 가져와서 거기서 자르는 느낌임
- 그냥 크게 브라우저를 뿌리고 투명하게 하는 것은 어떠한가?

# 레퍼런스
