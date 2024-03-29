---
{"tags":null,"aliases":null,"link":null,"up":"[[Udemy - GPT-4의 무한한 창의성 끌어내기]]","persona":null,"index":null,"related":null,"date_created":"2024-03-29","date_modified":"2024-03-29","dg-publish":true,"permalink":"/encounters/udemy-gpt-4/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-03-29T17:43:56.446+09:00","updated":"2024-03-29T18:09:34.122+09:00"}
---

# 유데미(Udemy) GPT-4의 무한한 창의성 끌어내기
![](https://i.imgur.com/gVUUC97.png)

평소 ChatGPT에 대한 관심이 있어서 [[Atlas/MAPS/LLM\|LLM]] 강의를 찾아보거나 유튜브로 ChatGPT api를 활용한 사례들을 따라하기도 하였습니다. 또는 옵시디언 플러그인들이 ChatGPT와 결합시켜서 사용 할 수 있는 부분들이 있어서 Opean AI를 애용하고 있었습니다. 그러던 중 글또에서 진행하는 Udemy 이벤트에 OpenAPI 마스터하기라는 강의가 있어서 수강하게 되었습니다

강좌는 제목 그대로, Open API를 포함한 다양한 API 사용법을 단계별로 알려주었습니다. 개발 지식이 없는 사람도 쉽게 따라 할 수 있고, 개발 지식이 있는 사람이라면 API의 상세 스펙 등과 그 원리까지 알려주기 때문에 모두에게 유익하다고 생각합니다

개인적으로 갈증이 해결 되었던 부분들은 파라미터들이 어떤 원리로 작동하고, 구동 되는지 아는 것이었습니다. 혼자서 찾아서 공부를 할 때에는 ~한 기능을 하는 파라미터입니다, api를 가져다가 사용하면 이렇게 작동이 됩니다를 단편적으로 알아서 모호한 부분들이 있었는데 베이직한 것부터 다시 잡고 갈 수 있었어서 만족했던 강의입니다

또한, [[Atlas/MAPS/LLM\|LLM]]을 사용하면서 겪었던 답변의 일관성과 명확성 유지의 어려움, 의도한 대로 답변이 나오지 않는 문제들에 대한 해결 방법도 배울 수 있었습니다. OpenAI의 API 업데이트로 인해 생기는 변동 사항에 대처하는 방법을 실습을 통해 배우며, '왜 갑자기 안 되지?'라는 의문을 해결할 수 있었던 점도 큰 만족으로 남았습니다.
## 배운 내용: 프롬프트 엔지니어링

### 프롬프트 엔지니어링이란?

- 입력 및 출력 지침을 포함하는 프롬프트 디자인을 제공하여, 사용자가 원하는 결과를 얻을 수 있도록 하는 기술입니다.
- 정확하고 명확한 지침의 제공은 결과의 일관성과 명확성을 높이는 데 핵심적인 역할을 합니다.
- 예를 들어, 지정된 텍스트에서 장소 이름을 추출하거나, 특정 형식으로 데이터를 출력하도록 요청하는 등의 작업을 포함합니다.

### 배운 주요 개념들

- **토큰 사용법**: GPT는 '토큰'이라는 시스템을 사용하여 입력을 처리하며, 이러한 토큰의 관리는 비용 계산에 중요합니다.
- **출력 형식 지정**: 원하는 정보를 특정 형식(예: JSON 배열)으로 얻는 방법을 배웠습니다.
- **프롬프트 변형**: 입력 텍스트를 다른 언어로 변환하거나, 다른 인칭이나 시제로 바꾸는 방법을 배웠습니다.
### 프롬프팅 기술
#### Zero-shot 프롬프팅

Zero-shot 프롬프팅은 특정 작업을 수행하도록 모델을 요청할 때, 그 작업에 대한 예제 없이 직접 요청을 하는 방식입니다. 즉, 아무런 예시를 제공하지 않고 모델에게 바로 문제를 제시합니다. 이 방식은 모델이 다양한 종류의 지식을 이미 학습했다고 가정하고, 그 학습된 지식을 바탕으로 새로운 문제를 해결할 수 있을 것으로 기대할 때 사용됩니다.

#### Few-shot 프롬프팅

Few-shot 프롬프팅은 작업을 수행하기 전에, 모델이 학습할 수 있도록 관련 예제 몇 개를 제공하는 방식입니다. 이는 모델에게 작업에 대한 컨텍스트와 기대하는 출력 형태를 사전에 알려주어, 모델이 보다 정확한 결과를 도출할 수 있도록 돕습니다. 예시를 통해 모델이 '학습'하는 것은 아니지만, 주어진 예시를 참고하여 작업을 수행하는 데 도움을 받습니다.

```
Extract keywords from the corresponding texts below.
Text 1: Stripe provides APIs that web developers can use to integrate payment processing into their websites and mobile applications.
Keywords 1: Stripe, payment processing, APIs, web developers, websites, mobile applications
##
Text 2: OpenAI has trained cutting-edge language models that are very good at understanding and generating text. Our API provides access to these models and can be used to solve virtually any task that involves processing language.
Keywords 2: OpenAI, language models, text processing, API.
##
Text 3: {text}
Keywords 3:
```

Few-shot 프롬프팅에서는 위와 같이 특정 작업에 대한 예시들을 제공함으로써, 모델이 해당 작업을 이해하고 적절한 방식으로 처리할 수 있도록 안내합니다. 여기서는 '키워드 추출' 작업에 대한 두 가지 예시를 제공하고, 세 번째 텍스트에 대해 모델이 동일한 작업을 수행하도록 요청하고 있습니다.

- **Zero-shot 프롬프팅**: 예제 없이 직접 요청
- **Few-shot 프롬프팅**: 관련 예제 제공을 통한 요청

Few-shot 프롬프팅에서 제공되는 예제의 수에 따라, 한 개의 예제만 제공되면 'One-shot 프롬프팅', 여러 개 제공되면 'Few-shot 프롬프팅'으로 구분됩니다. 이러한 방식은 모델이 주어진 문제를 이해하고, 기대하는 출력을 생성하는 데 도움을 줍니다.
## 마치며
이 강의는 ChatGPT와 같은 LLM을 활용하고자 하는 모든 분들에게 추천합니다. 개인적으로는 프롬프트 엔지니어링에 대해 배우면서, 명확한 지침이 결과에 미치는 영향을 깊게 이해할 수 있었습니다. 유데미를 통해 이러한 가치 있는 지식을 습득할 수 있어 감사하게 생각합니다


해당 콘텐츠는 유데미로부터 강의 쿠폰을 제공받아 작성되었습니다.