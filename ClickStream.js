const isVeevaEnvironment = () => {
  if (
    navigator.userAgent.match(/iPad/i) !== null ||
    navigator.userAgent.match(/iPhone/i) !== null
  ) {
    return true;
  }
  const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
  const firefox = navigator.userAgent.indexOf("Firefox") > -1;
  const safari = navigator.userAgent.indexOf("Safari") > -1;

  if (isChrome || firefox || safari) {
    return false;
  } else {
    return true;
  }
};

class SurveyClickStream {
  /**
   *
   * @param {*} qusetionTitle clicksteam에 들어갈 질문
   * @param {*} description clicksteam에 들어갈 description
   * @param {*} answer answer
   * @param {*} id 고유값, update하기 위해 사용
   * @param {*} type update or Create
   */
  constructor(qusetionTitle, description, answer, id, type) {
    this.clickStreamObject = {};
    this.clickStreamObject.Question_vod__c = qusetionTitle; //서베이 질문
    this.clickStreamObject.Track_Element_Description_vod__c = description;
    this.clickStreamObject.Answer_vod__c = answer;
    this.clickStreamObject.Track_Element_Id_vod__c = id; //updateRecord에서 처리할 id
    this.clickStreamObject.Usage_Start_Time_vod__c = new Date();
    this.type = type;
  }

  submitSurveyResult() {
    return new Promise((res, rej) => {
      if (this.isAnswerEmpty(this.clickStreamObject.Answer_vod__c)) {
        return res(); //만약 답변이 비어있다면 그대로 return 해준다.
      }
      if (isVeevaEnvironment()) {
        //만약에 첫번째로 submit 하는 것이라면! create
        com.veeva.clm.createRecord(
          "Call_Clickstream_vod__c",
          this.clickStreamObject,
          function(result) {
            res(result);
          }
        );
      } else {
        //개발환경이라면 veeva library를 사용할 수 없으므로 로그만 확인
        console.log(this.clickStreamObject);
        res();
      }
    });
  }

  isAnswerEmpty(value) {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  }
}

const submitClickStream = async surveyArr => {
  for (let i = 0; i < surveyArr.length; i++) {
    await surveyArr[i].submitSurveyResult(); //await는 동기적으로 보내준다.
  }
};
