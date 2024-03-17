---
{"aliases":null,"up":null,"persona":null,"index":null,"tags":["electron","webdevelopment","crossplatform","desktopapplications","technologyinnovation"],"link":["https://velog.io/@ckstn0777/Main-Process-API-App%EA%B3%BC-BrowserWindow"],"date_created":"2024-01-29","date_modified":"2024-02-22","tistoryBlogName":"berom","tistoryTitle":"Electron 애플리케이션의 구조와 동작 원리","tistoryTags":"글감,electron,webdevelopment,crossplatform,desktopapplications,technologyinnovation","tistoryVisibility":"3","tistoryCategory":"1071006","tistorySkipModal":true,"tistoryPostId":"563","tistoryPostUrl":"https://berom.tistory.com/563","dg-publish":true,"permalink":"/atlas/sources/web/electron/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-01-29T21:10:59.642+09:00","updated":"2024-03-16T19:43:17.185+09:00"}
---

# Electron 애플리케이션의 구조와 동작 원리
## Intro
2024년, 웹 기술의 활용 범위가 데스크탑 애플리케이션 개발까지 확장되었습니다. 이 중심에 있는 Electron은 웹 개발자들이 크로스 플랫폼 데스크탑 애플리케이션을 개발할 수 있는 새로운 기회를 제공하고 있습니다.

Electron의 기본 철학은 명확하며 실용적입니다. [Electron 10주년 기념 글](https://www.electronjs.org/blog/10-years-of-electron)에 따르면, Electron은 웹 개발자들이 데스크탑 애플리케이션을 더욱 쉽고 효율적으로 개발할 수 있도록 설계된 라이브러리입니다.

Electron의 주요 특징은 크로스 플랫폼 지원입니다. Windows, Mac, Linux 등 다양한 운영 체제에서 원활하게 동작하는 애플리케이션을 개발할 수 있습니다. 또한, 웹 기술(HTML, CSS, JavaScript)을 사용함으로써, 웹 개발자들은 기존에 익숙한 환경에서 데스크탑 애플리케이션 개발로 영역을 확장할 수 있게 되었습니다.

본 글에서는 Electron의 기본 구조에 대해 살펴보겠습니다.

## Electron의 주요 구성 요소

![](https://i.imgur.com/tarAodj.png)

웹 개발을 할 때, 우리는 주로 프론트엔드와 백엔드라는 두 가지 주요 영역으로 나누어 생각합니다. 프론트엔드는 사용자가 직접 상호작용하는 웹 사이트의 부분이고, 백엔드는 서버, 데이터베이스와 같이 사용자 눈에 보이지 않는 부분에서 동작하는 로직을 말합니다. Electron은 이 두 영역을 모두 포괄하는 웹 기술 기반의 도구입니다.

Electron의 핵심 구성요소로는 Chromium과 Node.js가 있습니다. Chromium은 웹 페이지를 렌더링하는 엔진으로, Electron에서는 이를 사용하여 프론트엔드 인터페이스를 구현합니다. 즉, 웹 브라우저에서 볼 수 있는 모든 시각적 요소들을 만들고 조작하는 데 사용됩니다.

반면, Node.js는 백엔드 개발에 주로 사용되는 환경으로, 파일 시스템 접근, 네트워킹 등 서버 측 로직을 처리하는 데 필요한 기능을 제공합니다. Electron 내에서 Node.js를 통해 개발자는 사용자의 컴퓨터와 상호작용하는 데스크탑 애플리케이션을 만들 수 있습니다.

이 두 구성요소의 결합은 개발자들이 웹 기술(HTML, CSS, JavaScript)을 사용하여 크로스 플랫폼 데스크탑 애플리케이션을 쉽게 개발할 수 있게 해줍니다. 즉, Electron을 사용하면, **웹 개발자들은 별도의 네이티브 애플리케이션 개발 언어를 배우지 않고도, 단일 코드베이스로 Windows, macOS, Linux 등 다양한 운영 체제에서 실행되는 애플리케이션을 만들 수 있습니다**. 이는 크로스 플랫폼 개발의 장벽을 대폭 낮추어 줍니다.

### Chromium
Chromium은 구글에 의해 개발된 오픈 소스 웹 브라우저 프로젝트입니다. Electron은 이 Chromium을 내장하여 웹 콘텐츠를 렌더링하는데 사용합니다. 개발자들은 HTML, CSS, JavaScript 등의 웹 기술을 사용하여 사용자 인터페이스를 구현할 수 있게 됩니다. 즉, 웹 브라우저에서 작동하는 것처럼 보이는 사용자 인터페이스를 만들 수 있습니다.
### Node.js
Node.js는 Electron에서 백엔드 기능을 제공합니다. JavaScript를 사용하여 파일 시스템 접근, 네트워킹, 그리고 다양한 OS 수준의 기능들을 구현할 수 있게 해주며, Electron 애플리케이션 내에서 JavaScript 코드를 실행하고, 시스템 리소스에 접근할 수 있는 능력을 제공합니다

## Electron 애플리케이션의 작동 원리


![다이어그램](https://www.electronjs.org/assets/images/chrome-processes-0506d3984ec81aa39985a95e7a29fbb8.png)

Electron 애플리케이션은 메인 프로세스와 렌더러 프로세스 간의 효율적인 상호 작용에 의해 동작합니다. 이 구조는 웹 기술을 기반으로 하여 Chromium과 Node.js의 조합을 통해 데스크톱 애플리케이션을 개발하는 강력한 플랫폼을 제공합니다.

### 왜 단일 프로세스가 아닌가요?
웹 브라우저는 웹 컨텐츠를 표시하는 주요 기능 외에도 여러 창을 관리하고 타사 확장 기능을 로드하는 등 다양한 부가적인 역할을 수행합니다. 하나의 단일 프로세스를 사용하는 경우 각 탭을 열 때 오버헤드가 적지만, **한 웹사이트가 충돌하거나 멈출 경우 전체 브라우저에 영향을 미칠 수 있습니다**.

### 다중 프로세스 모델
이러한 문제를 해결하기 위해 Chrome 팀은 각 탭이 자체 프로세스에서 렌더링되도록 결정했으며, 이로써 웹 페이지의 버그나 악의적인 코드가 애플리케이션 전체에 미치는 영향을 제한할 수 있었습니다. 한 개의 브라우저 프로세스가 이러한 프로세스들과 애플리케이션의 전체 라이프 사이클을 제어합니다.

Electron 애플리케이션도 이러한 다중 프로세스 모델을 사용하며, 앱 개발자로서 메인 프로세스와 렌더러 프로세스 두 가지 유형의 프로세스를 제어할 수 있습니다. 이는 앞서 언급한 Chrome의 브라우저와 렌더러 프로세스와 유사한 구조를 가지고 있습니다.
### Main Process
메인 프로세스는 Electron 앱의 '뇌'로서, GUI 표시, 애플리케이션 이벤트 관리, 글로벌 단축키 등록, 네이티브 메뉴와 대화 상자 생성 등 애플리케이션의 주요 기능을 처리합니다

메인 프로세스는 애플리케이션의 진입점이 되는 `package.json`의 메인 스크립트로 정의됩니다. 이 프로세스는 운영 체제의 네이티브 GUI 기능과 직접 상호 작용하여 애플리케이션의 창(웹 페이지들을 표시하는 `BrowserWindow 인스턴스`)을 생성합니다. 메인 프로세스는 Electron 애플리케이션에 **단 하나만 존재**하며, **모든 렌더러 프로세스를 관리**하는 핵심 역할을 수행합니다. GUI 관련 작업은 이 메인 프로세스를 통해 이루어져야 하며, 직접 웹 페이지에서는 수행될 수 없습니다

#### 메인 프로세스에서 수행할 수 있는 기본 작업들과 관련 코드 예시

- **애플리케이션 창 생성**: Electron 앱은 `BrowserWindow` 클래스를 사용하여 새로운 창을 생성합니다.
	- 이는 메인 프로세스에서 수행되며, 각 창은 독립적인 렌더러 프로세스에서 웹 페이지를 로드합니다.

```javascript
// 메인 스크립트에서 Electron 모듈을 불러옵니다.
const { app, BrowserWindow } = require('electron');

// 새로운 브라우저 창을 생성하는 함수를 정의합니다.
function createWindow() {
  // BrowserWindow 인스턴스를 생성합니다.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // 창에 표시할 HTML 파일을 지정합니다.
  win.loadFile('index.html');
}

// Electron이 초기화를 완료하고 창을 생성할 준비가 되면 createWindow 함수를 호출합니다.
app.whenReady().then(createWindow);
```

- **애플리케이션 이벤트 관리**: Electron은 다양한 애플리케이션 이벤트를 관리할 수 있도록 합니다.
	- 예를 들어, 모든 창이 닫힐 때 애플리케이션을 종료하도록 설정할 수 있습니다.

```javascript
// 모든 창이 닫힐 때 애플리케이션을 종료합니다.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

- **네이티브 메뉴 및 대화 상자 생성**
	- Electron은 네이티브 메뉴와 대화 상자를 생성하는 기능을 제공합니다.
	- 이러한 기능들은 메인 프로세스에서 구현되어야 합니다.

```javascript
const { Menu } = require('electron');

// 애플리케이션 메뉴를 정의합니다.
const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  }
];

// 정의한 메뉴 템플릿으로 메뉴 객체를 생성하고, 애플리케이션 메뉴로 설정합니다.
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
```

### Renderer Process
Electron의 렌더러 프로세스는 애플리케이션 UI를 구현하는 곳입니다.즉 렌더러 프로세스는 Electron 애플리케이션의 '화면' 역할을 합니다. Chromium 기반으로 동작하며, 각 `BrowserWindow` 인스턴스가 생성할 때마다 별도의 렌더러 프로세스가 실행됩니다. 이 프로세스에서는 HTML, CSS, JavaScript 같은 웹 기술을 사용해 사용자 인터페이스를 구성하고, 메인 프로세스와는 독립적으로 동작합니다.

또한, 메인 프로세스와의 통신을 통해 애플리케이션의 다양한 기능을 구현할 수 있습니다. IPC를 사용하여 비동기적 또는 동기적으로 메인 프로세스와 데이터를 교환하며, 이를 통해 렌더러 프로세스가 메인 프로세스에 작업을 요청하거나 데이터를 전달받을 수 있습니다

#### 렌더러 프로세스에서 수행할 수 있는 기본 작업과 관련 코드 예시
- **HTML 파일 렌더링**:
	- 렌더러 프로세스는 `BrowserWindow`에서 로드되는 HTML 파일을 렌더링합니다.
	- 이 파일 내에서 JavaScript를 통해 DOM 조작이나 이벤트 핸들링 등의 작업을 수행할 수 있습니다.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Electron App</title>
</head>
<body>
  <h1>Hello, Electron!</h1>
  <button id="clickMe">Click me</button>
  <script src="renderer.js"></script>
</body>
</html>
```

- **IPC를 통한 메인 프로세스와의 통신**:
	- 렌더러 프로세스에서 메인 프로세스로 메시지를 보내거나, 메인 프로세스에서 보낸 메시지를 받기 위해 IPC를 사용할 수 있습니다.
	- 이를 통해 렌더러 프로세스가 네이티브 기능을 요청하거나, 메인 프로세스의 데이터를 요청할 수 있습니다.

```javascript
// renderer.js
const { ipcRenderer } = require('electron');

// 메인 프로세스로 메시지 보내기
ipcRenderer.send('channel1', 'Hello from Renderer Process');

// 메인 프로세스에서 보낸 메시지 수신
ipcRenderer.on('channel2', (event, arg) => {
  console.log(arg); // "Hello from Main Process"
});
```

## 프로세스 간 통신
Electron에서 메인 프로세스와 렌더러 프로세스 간의 통신은 주로 IPC(Inter-Process Communication) 모듈을 사용하여 이루어집니다. 이 통신 메커니즘은 애플리케이션의 다른 부분들이 서로 정보를 주고받을 수 있게 해주며, 비동기 및 동기 방식을 모두 지원합니다.

프로세스 간 통신은 Electron 애플리케이션의 구조와 기능성을 풍부하게 만드는 핵심 요소입니다. 비동기 IPC를 우선적으로 사용하고, 필요한 경우에만 동기 통신을 사용하며, `remote` 모듈의 사용을 최소화하는 것이 좋습니다. 이러한 접근 방식은 애플리케이션의 성능과 사용자 경험을 최적화하는 데 도움이 됩니다.
### 비동기 IPC
비동기 IPC는 ipcMain과 ipcRenderer 모듈을 사용하여 구현됩니다. 메인 프로세스에서는 `ipcMain`을 사용하여 렌더러 프로세스로부터 메시지를 수신하고, 렌더러 프로세스에서는 `ipcRenderer`를 사용하여 메인 프로세스로 메시지를 전송합니다.
```javascript
// 메인 프로세스에서
const { ipcMain } = require('electron');
ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg); // "ping" 메시지 출력
  event.reply('asynchronous-reply', 'pong');
});

// 렌더러 프로세스에서
const { ipcRenderer } = require('electron');
ipcRenderer.send('asynchronous-message', 'ping');
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg); // "pong" 메시지 출력
});
```

### 동기 IPC
동기 IPC에서는 렌더러 프로세스가 메인 프로세스로부터 응답을 받을 때까지 기다립니다. 이는 `ipcRenderer.sendSync` 메서드를 사용하여 구현되며, 사용 시 주의가 필요합니다. 동기 메시지 전송은 렌더러 프로세스의 작업을 일시 중지시킬 수 있기 때문에 애플리케이션의 반응성에 영향을 줄 수 있습니다.

#### `remote` 모듈의 사용
`remote` 모듈은 렌더러 프로세스에서 메인 프로세스의 기능을 직접 호출할 수 있게 해주지만, 이는 **내부적으로 동기 IPC를 사용하여 구현**됩니다. 따라서 `remote` 모듈의 사용은 메인 프로세스의 성능 저하를 일으킬 수 있으며, Electron 9 이후 버전에서는 보안상의 이유로 기본적으로 비활성화되어 있습니다. 필요한 경우에만 `remote` 모듈을 활성화하고 신중하게 사용해야 합니다.

## Electron의 장점과 단점
Electron을 사용함으로써 얻을 수 있는 이점과, 대표적인 단점이나 고려해야 할 점들에 대해 설명할 수 있습니다. 예를 들어, 사용 편의성과 크로스 플랫폼 지원은 장점이지만, 성능이나 메모리 사용량이 단점일 수 있습니다.

### 장점

1. **크로스 플랫폼 지원**:
	- Electron은 Windows, macOS, Linux 등 다양한 운영 체제에서 실행될 수 있는 애플리케이션을 만들 수 있게 해줍니다. 이는 개발 시간과 자원을 절약할 수 있게 합니다​​.
2. **웹 기술 사용**
	- Electron은 개발자가 기존에 알고 있는 HTML, CSS, JavaScript를 사용하여 애플리케이션을 개발할 수 있도록 해주어, 새로운 기술 학습에 대한 부담을 줄여줍니다​[](https://chat.openai.com/)​.
3. **빠른 개발 속도 및 비용 절감**
	- 단일 코드베이스를 통해 개발할 수 있어 개발 속도가 빨라지고, 이는 비용 절감으로 이어집니다​​.
4. **다양한 라이브러리 및 프레임워크와의 호환성**
	- Node.js, Angular, Vue.js, React 등 다양한 JavaScript 라이브러리 및 프레임워크와 호환됩니다​​.
### 단점

1. **과도한 자원 사용**
	- Electron 애플리케이션은 자체적으로 Chromium 브라우저를 내장하고 있어 메모리와 시스템 자원을 상당량 사용할 수 있습니다.
2. **애플리케이션 크기**
      - Chromium과 Node.js를 내장하고 있기 때문에 애플리케이션의 최종 배포 크기가 커질 수 있습니다.
3. **플랫폼별 요구 사항**
	- Electron 애플리케이션은 기본적으로 모든 플랫폼에서 동일하게 작동하지만, 플랫폼별 고유한 디자인이나 기능을 요구하는 경우 추가 작업이 필요할 수 있습니다.
