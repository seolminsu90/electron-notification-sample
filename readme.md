## Electron Notification Sample App


#### Start

```bash
yarn install

# dev run
yarn start 

yarn package

# install build file generate => /out
yarn make 
```

#### 콘솔 한글 깨짐 시

```shell
chcp 65001
yarn start # dev run
```

#### preload 관련

ipcRenderer과 같이 electron 전용 기능을 사용할 때, 직접 Fronend에서 사용해도 되지만, 테스트나 디버깅 시 require가 없다고 뜨는 경우도 있고 (html로 테스트 할떄) preload를 이용하여 전역 객체에 API를 지정해놓으면 활용하기 편해진다. preload.js 참조