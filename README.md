## 프로젝트 만든 배경

일일이 ClickStream 오브젝트를 생성하고 만들기 번거로움.

Veeva에 ClickStream 데이터를 보낼 때, 배열로 만들고 한꺼번에 넣고 보내게 되면 Salesforce로 값이 들어가지 않음.  
-> 동기적으로 값을 보내야 됨.

## 사용방법

veeva 라이브러리 뒤편에 ClickStream.js 사용.  
local.js에 ClickStream Class 인스턴스를 만들어서 사용.

### Example

```html
<body>
  <script src="veeva-library.js"></script>
  <script src="ClickStream.js"></script>
  <script src="local.js"></script>
</body>
```

```js
const clickstream = new ClickStream(
  "Title",
  "Description",
  "answer",
  "id",
  "type"
);
```

### Create instance

```js
const clickstream = new ClickStream(
  "Title",
  "Description",
  "answer",
  "id",
  "update"
);
```

### Submit

```js
//한 개일 경우
clickstream.submitSurveyResult()
.then(result=>console.log(result));

// 여러개일 경우

const clickStreamArr = [clickstream1,clickstream2,clickstream3,...];
submitClickStream(clickStreamArr)
.then(result=>console.log(result));
```

<li> <strong>qusetionTitle</strong> clicksteam에 들어갈 질문</li>
<li> <strong>Description</strong> Description에 들어갈 질문</li>
<li> <strong>answer</strong> 대답</li>
<li> <strong> id</strong> 고유값, update하기 위해 사용</li>
<li><strong>action </strong>update인지 create인지 확인</li>

## 문제점 의논하고 싶은 점

### ClickStream과 ClickStream_2 중 어떤 방향으로 만드는게 맞을까?

- 문제 1. create와 update를 어떻게 구분할것인가?
  린파자의 경우 -> sessionStorage 사용. 옳은 방법인지는 Veeva Library를 더 찾아봐야 할듯

- 문제 2. 어떻게 답변을 넣어줄 것인가?
  린파자의 경우 ClickStream_2를 참조하면 setSurveyAnswersToClickStream() 메소드가 존재함. <br>
  class의 경우 재사용이 중요한데, 선택을 줄이는 것이 아닌가? 하는 고민

- 문제 3. ClickStream 메소드에는 들어가 있지는 않지만,
  그래도 필요한 함수의 경우 처리는 어떻게 해주어야 하는가?
  ex) submitClickStream, getAnswers,isVeevaEnvironment...

기타 다른 의견을 들어보고 싶어서 만들었습니다.
