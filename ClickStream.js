const TOUCH = com.inno.veeva.touchEvent; //touchEvent

class SurveyClickStream {
  /**
   *
   * @param {*} qusetionTitle clicksteam에 들어갈 질문
   * @param {*} id 고유값, update하기 위해 사용
   * @param {*} questionBtnArr question 3번과 같이 객관식 질문이 있는 항목에 대해 btnArr을 넣어줌. 기본은 null
   * @param {*} type clickstream 타입이 text인지 picklist인지 slide인지 타입 구분
   */
  constructor(qusetionTitle, id, questionBtnArr = null, type) {
    this.clickStreamObject = {};
    this.clickStreamObject.Question_vod__c = qusetionTitle; //서베이 질문
    this.clickStreamObject.Track_Element_Description_vod__c = qusetionTitle;
    this.clickStreamObject.Answer_vod__c = null;
    this.clickStreamObject.Track_Element_Id_vod__c = id; //updateRecord에서 처리할 id
    this.id = id; //Text에서 value값을 가져오기 위한 ID
    this.questionBtnArr = questionBtnArr;
    this.currentAnswer = null;
    this.type = type;
    this.events();
  }
  events() {
    if (this.questionBtnArr === null) {
      //객관식이 아니면 이벤트를 붙여줄 필요없음.
      return;
    }
    //각각의 버튼들에 대해 이벤트들을 붙여준다.
    for (let i = 0; i < this.questionBtnArr.length; i++) {
      $(this.questionBtnArr[i]).on(TOUCH, () => {
        this.setPickListSurveyAnswer(this.questionBtnArr[i]);
      });
    }
  }
  setPickListSurveyAnswer(clickedBtn) {
    //클릭한 버튼에게 Survey Answer를 달아준다.
    this.questionBtnArr.forEach(
      el =>
        el === clickedBtn
          ? $(el).addClass("active")
          : $(el).removeClass("active") //만약 클릭한 버튼이 아니라면 active 클래스를 제거해준다.
    );
    this.currentAnswer = $(clickedBtn).data("answer");
  }

  setSurveyAnswersToClickStream() {
    return new Promise((res, rej) => {
      switch (this.type) {
        case "picklist":
          this.clickStreamObject.Answer_vod__c = this.currentAnswer;
          break;
        case "text":
          const docId = $(`#${this.id}`);
          const value = docId.val();
          this.clickStreamObject.Answer_vod__c = value;
          break;
        case "slide":
          const slideValue = $(".rangeslider__handle").data("value");
          this.clickStreamObject.Answer_vod__c = slideValue;
          break;
        default:
          break;
      }
      res();
    });
  }

  submitSurveyResult() {
    return new Promise((res, rej) => {
      if (
        this.clickStreamObject.Answer_vod__c === null ||
        this.clickStreamObject.Answer_vod__c === undefined ||
        this.clickStreamObject.Answer_vod__c === ""
      ) {
        return res(); //만약 답변이 비어있다면 그대로 return 해준다.
      }
      if (com.inno.veeva.isVeevaEnvironment()) {
        //만약에 첫번째로 submit 하는 것이라면! create
        if (!sessionStorage.getItem("isSubmitted")) {
          this.clickStreamObject.Usage_Start_Time_vod__c = new Date();
          com.veeva.clm.createRecord(
            "Call_Clickstream_vod__c",
            this.clickStreamObject,
            function(result) {
              res(result);
            }
          );
        } else {
          //만약에 이미 submit한 상태라면 update
          this.clickStreamObject.Usage_Start_Time_vod__c = new Date();
          com.veeva.clm.updateRecord(
            "Call_Clickstream_vod__c",
            this.clickStreamObject.Track_Element_Id_vod__c,
            this.clickStreamObject,
            function(result) {
              res(result);
            }
          );
        }
      } else {
        if (!sessionStorage.getItem("isSubmitted")) {
          console.log("아직 없음");
        }
        console.log(this.clickStreamObject);
        res();
      }
    });
  }
}

const getAnswers = async surveyArr => {
  for (let i = 0; i < surveyArr.length; i++) {
    await surveyArr[i].setSurveyAnswersToClickStream();
  }
};
const submit = async surveyArr => {
  for (let i = 0; i < surveyArr.length; i++) {
    await surveyArr[i].submitSurveyResult(); //await는 동기적으로 보내준다.
  }
};
$("#btn-submit").on(TOUCH, async () => {
  /*
    클릭했을 때 만약 Veeva가 아닐 경우라면(개발단계라면) 그냥 넘어가고
    Veeva이고 답변들이 들어가 있다면 각각 인스턴스마다 clickStream을 만들어서 보내준다.
    */

  await getAnswers(surveyArr);
  await submit(surveyArr)
    .then(msg => {
      if (!com.inno.veeva.isVeevaEnvironment()) {
        console.log("비바아님");
        return com.inno.veeva.goToNextSlide();
      } else {
        com.inno.veeva.goToNextSlide();
      }
      sessionStorage.setItem("isSubmitted", true);
    })
    .catch(e => console.log(e));
});

const survey3_btnArr = [
  "#survey-3_answer-1",
  "#survey-3_answer-2",
  "#survey-3_answer-3"
];

const survey1 = new SurveyClickStream(
  "현재 난소암 second line Tx에서는 어떤 치료를 주로 하시나요?",
  "second-survey-1",
  null,
  "text"
);
const survey2 = new SurveyClickStream(
  "Second line 이후의 Maintain 치료 환자의 비율은 어떻게 되시는지요?",
  "second-survey-2",
  null,
  "slide"
);
const survey3 = new SurveyClickStream(
  "현재 난소암 second line 이후의 maintain은 주로 어떤 치료를 하시는 지요?",
  "second-survey-3",
  survey3_btnArr,
  "picklist"
);
const survey4 = new SurveyClickStream(
  "Second line 이후의 BRCAm환자 요법 치료(PARPi)는 얼마나 하시는 지요?",
  "second-survey-4",
  null,
  "text"
);

const surveyArr = [survey1, survey2, survey3, survey4];

$("#quiz-slider").rangeslider({
  polyfill: false,
  rangeClass: "rangeslider",
  horizontalClass: "rangeslider--horizontal",
  fillClass: "rangeslider__fill",
  handleClass: "rangeslider__handle",

  /*
    설명 : slider Handle을 움직이게 되면 핸들 왼쪽에 pseudo class로 가상의 div가 생김.
    그 가상의 div content값은 = data-value값. (styles.css의 311번째 라인)  
    sliderHandle에 attr을 줌으로써 속성값에 value를 넣어줌.
    -> 가상의 div content로 값이 들어감
    */
  onInit: function() {
    //서베이 제출하고 뒤로가기 했을 경우 슬라이더가 채워진 상태 그대로 남아있어서 초기화
    $(".rangeslider__handle").css("left", "0");
    $(".rangeslider__fill").css("width", "0");
  },
  onSlideEnd: function(position, value) {
    $(".rangeslider--horizontal .rangeslider__handle").addClass("slideAction");
    $(".rangeslider--horizontal .rangeslider__handle.slideAction").attr(
      "data-value",
      `${value}%`
    );
  }
});
