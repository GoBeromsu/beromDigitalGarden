---
{"tags":["네트워크통신","CS/네트워크","CS/네트워크","ta"],"aliases":null,"link":null,"up":"[[2024 데이터 통신 TA]]","persona":"[[🔥 Programming && Develop]]","index":null,"related":null,"date_created":"2024-03-26","date_modified":"2024-03-26","dg-publish":true,"permalink":"/encounters/traceroute/","dgPassFrontmatter":true,"noteIcon":"1","created":"2024-03-26T12:27:57.203+09:00","updated":"2024-03-26T13:07:33.303+09:00"}
---

# Traceroute 실습 방법

## 질문
- trace-route를 하면 거쳐간 라우터들이 나올텐데 평균과 표준 편차를 어떻게 구하는가?
- trace-route를 하면 응답 시간 만료가 뜨는 라우터가 있는데 왜 그런 것인가?
## 문제
하루 중 다른 세 번의 시간에 같은 대륙에 있는 출발지와 목적지 사이에서 Trace-route를 실행하라

1. 각 3 번의 시간에 왕복 지연의 평균과 표준 편차를 구하라
2. 각 3번의 시간 경로상에 있는 라우터를 구하라 경로 변화가 있었는가?
## Traceroute 실습 도메인
traceroute 실습을 위해 사용할 수 있는 몇 가지 공개적으로 접근 가능한 대상 주소가 있습니다. 이러한 주소들은 대부분 대학교, 공공 기관, 또는 큰 기업들이 운영하는 서버 주소입니다. 실습 목적으로 이들 주소를 사용할 때는 네트워크 부하를 고려하여 적절한 시간 간격을 두고 실행하는 것이 좋습니다.

- 실습용 주소
	- Google Public DNS: 8.8.8.8 - Google이 제공하는 공개 DNS 서버로, 전 세계 어디서나 접근 가능합니다.
	- Cloudflare DNS: 1.1.1.1 - Cloudflare에서 제공하는 또 다른 공개 DNS 서비스입니다.

실습을 진행할 때, 특정 목적지에 대한 traceroute 결과는 그 목적지의 네트워크 구성, 경로, 그리고 보안 정책에 따라 크게 다를 수 있습니다. 또한, 각 목적지는 시간에 따라 그 응답이 달라질 수 있으니, 다양한 주소를 사용해 보면서 결과를 비교해보는 것이 좋습니다.

### 실습 시 몇 가지 주의사항을 기억해야 합니다:

네트워크 트래픽을 생성하는 도구를 사용할 때는 항상 적절한 시간 간격을 두고 사용해야 합니다. 지나치게 자주 또는 대량으로 traceroute를 실행하면 네트워크 공격으로 간주될 수 있습니다.
사용하는 목적지의 네트워크 정책이나 트래픽 관리 정책에 따라 traceroute 요청이 차단되거나 제한될 수 있습니다.

## 과제 예시: Google Public DNS (`8.8.8.8`)에 대한 Traceroute 실행 결과
아래 예시는 각 3번의 시간에 대해 traceroute를 실행하여 얻은 왕복 지연 시간(RTT)의 평균과 표준 편차를 계산하는 방법을 보여줍니다. 이를 통해 네트워크의 성능 변화와 안정성을 평가할 수 있습니다.

아침, 점심, 저녁에 각각 traceroute를 실행하여 얻은 결과입니다.

### 아침 실행 결과

1. 홉: 2.818 ms, 3.107 ms, 2.328 ms
2. 홉: 2.708 ms, 9.119 ms, 5.575 ms
3. 홉: 3.700 ms, 3.163 ms, 5.147 ms

### 점심 실행 결과

1. 홉: 3.000 ms, 2.900 ms, 3.100 ms
2. 홉: 10.718 ms, 7.119 ms, 6.575 ms
3. 홉: 4.700 ms, 4.163 ms, 6.147 ms

### 저녁 실행 결과

1. 홉: 3.218 ms, 3.207 ms, 3.328 ms
2. 홉: 11.708 ms, 8.119 ms, 7.575 ms
3. 홉: 5.700 ms, 5.163 ms, 7.147 ms

### 계산 방법

1. 각 홉별로 각 시간대의 RTT 평균을 계산합니다.
2. 각 홉별로 표준 편차를 계산합니다.

#### 아침 평균 및 표준 편차 계산 예시

- **1번 홉**의 평균 RTT: (2.818 + 3.107 + 2.328) / 3 = 2.751 ms
- **1번 홉**의 표준 편차: 각 측정값에서 평균을 빼서 제곱한 후, 평균을 내고 제곱근을 취합니다.

#### 계산 과정
1. 평균 RTT와 표준 편차를 각 홉과 시간대별로 계산합니다.
2. 이를 통해 네트워크의 시간대별 성능 변화와 안정성을 평가할 수 있습니다.

이 예시는 아침 시간대의 1번 홉에 대한 계산 방법을 보여줍니다. 점심과 저녁 시간대, 그리고 다른 홉에 대해서도 동일한 방법으로 계산을 진행합니다. 이러한 분석을 통해 네트워크 경로의 성능 변화와 안정성을 평가할 수 있으며, 특정 시간대에 네트워크 지연이 발생하는 원인을 파악할 수 있습니다.

## 궁금증 : * * * 은 왜 뜨는걸까요?

### ICMP 메시지 무시
일부 라우터나 방화벽은 보안상의 이유로 ICMP(Internet Control Message Protocol) 메시지를 무시하거나 차단합니다. Trace-route는 ICMP 메시지를 사용하여 경로상의 각 노드(라우터)에서 응답을 받으므로, 이러한 메시지가 무시되면 해당 라우터는 응답을 보내지 않습니다.

### 패킷 필터링 또는 차단
네트워크 상의 특정 지점에서 트래픽을 필터링하거나 차단하여 Trace-route 패킷이 목적지까지 도달하지 못하게 하는 경우가 있습니다. 이러한 필터링이나 차단은 보안 정책, 네트워크 관리, 또는 스팸 및 공격 방지를 위해 수행될 수 있습니다.

### 네트워크 문제
때때로 네트워크 오류나 구성 문제로 인해 패킷이 손실되거나 목적지에 도달하지 못하는 경우가 있습니다. 이는 일시적인 네트워크 문제, 오버로드된 라우터, 또는 물리적 연결의 문제일 수 있습니다.

### TTL(Time To Live) 값 소진
패킷의 TTL 값이 해당 라우터에 도달하기 전에 0이 되어 패킷이 폐기되는 경우입니다. 이는 주로 네트워크 루프나 잘못된 라우팅 구성 때문에 발생할 수 있습니다. 그러나, 이 경우에는 보통 명시적인 ICMP 오류 메시지가 발생하므로, * * * 결과와는 직접적인 관련이 적을 수 있습니다.

### `* * *` 는 Trace-route가 해당 홉에서 응답을 받지 못했다는 것을 의미합니다
이러한 응답 미수신은 여러 다른 이유로 인해 발생할 수 있으며, 반드시 네트워크에 심각한 문제가 있음을 의미하지는 않습니다. 때때로, 목적지 서버까지의 전체 경로가 `* * *` 로 표시되더라도, 마지막 목적지에서는 정상적인 응답이 돌아올 수 있습니다.