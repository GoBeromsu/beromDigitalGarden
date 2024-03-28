---
{"tags":["생각","programming"],"aliases":null,"link":null,"up":null,"persona":"[[🔥 Programming && Develop]]","index":null,"related":["[[@노수지]]"],"date_created":"2024-03-28","date_modified":"2024-03-28","dg-publish":true,"permalink":"/atlas/ideas/make-deterministic-functions/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-03-28T10:16:16.816+09:00","updated":"2024-03-28T10:26:19.213+09:00"}
---

# 알고리즘에 대한 생각 프로그래밍의 복잡성 탐구

![](https://i.imgur.com/zQKCD9T.png)

비결정적 알고리즘이란 주어진 입력에 대해 여러 가능한 결과를 가질 수 있는 알고리즘을 말합니다. 비결정적 함수는 동일한 입력에 대해 항상 동일한 출력을 반환하지 않습니다. 이러한 특성 때문에 코드의 복잡성이 증가하고, 디버깅이 어려워집니다.

따라서 깨끗한 코드를 작성하려면 **결정적인 함수**를 만들어야 합니다. 결정적인 함수란 주어진 입력에 대해 항상 동일한 출력을 반환하는 함수를 의미합니다. 이렇게 하면 코드의 복잡성을 줄이고, 예측 가능하며 재사용 가능한 코드를 작성할 수 있습니다.

함수에서 비결정적 요소를 제거하는 방법 중 하나는 부작용(side effect)을 최소화하는 것입니다. 함수 내에서 외부 상태를 변경하지 않고, 오직 입력에만 의존하여 결과를 반환하도록 만드는 것입니다. 이렇게 하면 같은 입력 값이 주어지면 항상 같은 결과가 반환되므로 결정적입니다.

또 다른 방법은 비즈니스 로직과 유저 인터페이스(UI), 데이터베이스와 같은 입출력(IO) 처리 로직을 분리하는 것입니다. IO 처리는 종종 비결정적인 요소를 도입하므로, 이를 분리하면 비즈니스 로직을 결정적으로 만들 수 있습니다.

결정적 함수를 만드는 것은 코드를 깨끗하게 유지하고 유지보수성을 높이는 데 중요한 원칙입니다. 이 원칙은 함수형 프로그래밍에서 강조되는 중요한 개념 중 하나이기도 합니다.


## Thinking
- [[Calendar/Daily Notes/2024-03-28\|2024-03-28]] 10:16 수지가 가지고 온 알고리즘, 좋은 코드를 짜는 방법
- [[Calendar/Daily Notes/2024-03-28\|2024-03-28]] 10:16 의사결정 방법
- [[Calendar/Daily Notes/2024-03-28\|2024-03-28]] 10:16 [[Efforts/Notes/수업/비결정적 오토마타? - 필기\|비결정적 오토마타? - 필기]]가 생각난다
- 트리 구조로 코드가 분기를 하면서 나아가는데 이렇게 하지말라는 뜻이다
	- [[Efforts/Notes/수업/함수형 프로그래밍\|함수형 프로그래밍]]과 같이 되는구나
	- 리팩토링을 해야 한다면 Pojo해야 한다고 하셨던 [[Atlas/CRM/@이기원\|@이기원]] 멘토님이 생각난ㄷ
## 레퍼런스
- [Nondeterministic algorithm - Wikipedia](https://en.wikipedia.org/wiki/Nondeterministic_algorithm)
- [Nondeterministic algorithm - Wikipedia](https://en.wikipedia.org/wiki/Nondeterministic_algorithm)

