---
{"tags":["JavaScript"],"aliases":null,"link":null,"up":null,"persona":null,"index":null,"related":null,"date_created":"2024-03-17","date_modified":"2024-03-17","dg-publish":true,"permalink":"/efforts/notes/digital-craft/javascript-convention-rule/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-03-17T14:31:51.741+09:00","updated":"2024-03-17T14:32:27.848+09:00"}
---

# Javascript Convention Rule

## 네이밍 기본 🏠

- **단일 글자**로 이름을 짓지 않고 이름을 통해 쓰임새를 알 수 있도록 한다.

    ```javascript
    // bad 
    function q() { 
      // … 
    } 

    // good 
    function query() { 
      // … 
    }
    ```

- 이름의 맨 앞이나 맨 뒤쪽에 **밑줄( \_ )**을 사용하지 않는다.

    ```javascript
    // bad 
    this.__firstName__ = 'Panda'; 
    this.firstName_ = 'Panda'; 
    this._firstName = 'Panda'; 
    
    // good
     this.firstName = 'Panda';
```

- **this**를 변수의 값으로 사용하지 않는다. 필요하다면 **화살표 함수(Arrow Function)**이나 **바인딩**을 사용하라.

```javascript
// bad
function foo() {
  const self = this;
  return function () {
   console.log(self); };
}

// good
function bar() {
  return () => {
   console.log(this);
  };
}
```

- 가독성을 위해 약어는 **모두 대문자** 혹은 **모두 소문자**로 표기한다.

```javascript
// bad
import SmsContainer from './containers/SmsContainer';

// bad
const HttpRequests = [ // … ];

// good
import SMSContainer from './containers/SMSContainer';

// good
const HTTPRequests = [ // … ];

// also good
const httpRequests = [ // … ];

// best import TextMessageContainer from './containers/TextMessageContainer';

// best const requests = [ // … ];
```

- export되는 파일 내의 모든 상수는 **모두 대문자**로 표기한다.

```javascript
// bad
const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';

// bad
export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';

// bad
export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';

// ---
// allowed but does not supply semantic value
export const apiKey = 'SOMEKEY'; 

// better in most cases
export const API_KEY = 'SOMEKEY'; 

// ---
// bad - unnecessarily uppercases key while adding no semantic value
export const MAPPING = { KEY: 'value' };

// good 
export const MAPPING = { key: 'value' };
```

- 이름에 복수형을 표기하지 않는다.

```javascript
    //bad 
    let delivery_notes = ["one", "two"]; 
    
    // good 
    let delivery_note_list = ["one", "two"];
```

- 줄일말을 사용하지 않는다.

```javascript
    //bad 
    let del_note = 1; 
    
    // good 
    let delivery_note = 1;
```

## 파일 및 패키지 🎁

- 파일의 이름은 소문자로 표기한다.

```javascript
    // bad 
    LonDon.png 
    HELLOWORLD.pdf APP.js
    
     // good 
     london.png helloworld.pdf app.js

```

- 패키지의 이름은 **lowerCamelCase**로 표기한다.

```javascript
   // bad my.examplecode.deepspace my.example_code.deep_space 
   
   // good my.exampleCode.deepSpace
```

- 파일의 이름은 **default export의 이름**과 일치해야한다.

```javascript
// file 1 contents
class CheckBox {
  // …
} 
export default CheckBox;

// file 2 contents
export default function fortyTwo() { return 42; } 

// file 3 contents
export default function insideDirectory() {}

// in some other file

// bad import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename 
import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export 
import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export 

// bad import CheckBox from './check_box'; // PascalCase import/export, snake_case filename 
import forty_two from './forty_two'; // snake_case import/filename, camelCase export 
import inside_directory from './inside_directory'; // snake_case import, camelCase export 
import index from './inside_directory/index'; // requiring the index file explicitly 
import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly 

// good import CheckBox from './CheckBox'; // PascalCase export/import/filename 
import fortyTwo from './fortyTwo'; // camelCase export/import/filename 
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index" 

// ^ supports both insideDirectory.js and insideDirectory/index.js

```

## 변수 🌓

- 변수의 이름은 **lowerCamelCase**로 표기한다. 단, export되는 파일 내의 상수는 예외.

- 변수의 이름은 **알파벳**으로 시작해야한다.

```javascript
    // bad let 123Number = 123; let HELLO_WORLD = "Hello World"; 
    // good let number = 369; let helloString = "Hello World";
```

## 함수 📤

- 함수는 **lowerCamelCase**로 표기한다.

```javascript
    // bad function MyFunction() {…} 
    // good function myFunction() {…}
```

- 함수의 이름은 동사 또는 동사구문으로 표기한다.

```javascript
    // bad function whereIsCamera() { … } 
    // good function findCamera() { … } 
    function getFoo() { … } // getter 
    function setBar() { … } // setter 
    function hasCoo() { … } // booleans
```

- 함수를 default export할 때는 **camelCase**로 표기한다. 단, 함수의 이름이 파일의 이름과 구분되어야 한다.

```javascript
function makeStyleGuide() {
  // …
} 

export default makeStyleGuide;
```

- 함수 라이브러리를 export할 때는 **PascalCase**로 표기한다.

- 함수의 파라미터는 **lowerCamelCase**로 표기한다. 단, 한글자의 파라미터는 public 메소드에서는 사용하지 않는다.

```javascript
// bad function someFunction(SOMEVALUE, SOMEARRAY) { … }

// good function someFunction(someValue, someArray) { … }
```

- 템플릿 함수의 파라미터는 모두 간결해야하고 **한글자** 또는 **한단어**여야 한다. 또, **모두 대문자**로 표기한다.


## 객체 🎍

- 객체의 이름은 **lowerCamelCase**로 표기한다.

```javascript
    // bad const OBJEcttsssss = {}; const this_is_my_object = {}; 
    function c() {} 
    
    // good const thisIsMyObject = {}; function thisIsMyFunction() {}
```

- 객체를 export할 때는 **PascalCase**로 표기한다.

```javascript
const AirbnbStyleGuide = { es6: { }, }; 
export default AirbnbStyleGuide;
```

## 클래스 📇

- 클래스나 생성자의 이름은 **PascalCase**로 표기한다.

```javascript
// bad 
function user(options) {
  this.name = options.name; 
} 

const bad = new user({ name: 'nope', });

// good class User
{ constructor(options) {
  this.name = options.name; }
}
  
const good = new User({ name: 'yup', });
```

- 클래스의 이름은 **명사** 또는 **명사구문**으로 표기한다. 또한, 인터페이스의 경우 명사 대신 **형용사** 또는 **형용사구문**으로 표기할 수 있다.

- 클래스를 export할 때는 **[[+ Encounters/PascalCase\|PascalCase]]** 로 표기한다.