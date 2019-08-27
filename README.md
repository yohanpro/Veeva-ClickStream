## 프로젝트 만든 배경

일일이 ClickStream 오브젝트를 생성하고 만들기 번거로움.

Veeva에 ClickStream 데이터를 보낼 때, 배열로 만들고 한꺼번에 넣고 보내게 되면 Salesforce로 값이 들어가지 않음.  
-> 동기적으로 값을 보내야 됨.

## 사용방법

veeva 라이브러리 뒤편에 ClickStream.js 사용.  
local.js에 ClickStream Class 인스턴스를 만들어서 사용.

<span style="color:red; font-weight:bold; font-size:1.4rem;">Example</span>

```html
<body>
  <script src="veeva-library.js"></script>
  <script src="ClickStream.js"></script>
  <script src="local.js"></script>
</body>
```

```js
const clickstream = new ClickStream("Title", "Description", "id", "text");

const btnSubmit = document.getElementById("btn");

btnSubmit.addEventListener("click", () => clickstream.submit("create"));
```

### Create instance

```js
const clickstream = new ClickStream("Title", "Description", "id", "text");
```

<li> <strong style="color:red;">qusetionTitle</strong> clicksteam에 들어갈 질문</li>
<li> <strong style="color:red;">Description</strong> Description에 들어갈 질문</li>
<li> <strong style="color:red;"> id</strong> 고유값, update하기 위해 사용</li>
<li><strong style="color:red;">type </strong>clickstream 타입이 text인지 picklist인지 slide인지 타입</li>

### submit

```js

const btn
clickstream.submit("create");
```

### update

```js
clickstream.submit("update");
```

### 배열로 보내기

```js
clickStreamArr = [clickstream1, clickstream2, clickstream3, clickstream4];
clickStreamArr.submit("create");
```
