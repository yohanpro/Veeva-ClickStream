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
   * @param {String} qusetionTitle clicksteam에 들어갈 question
   * @param {String} description clicksteam에 들어갈 description
   * @param {String} answer answer
   * @param {String} id 고유값, update하기 위해 사용
   * @param {String} action update or Create
   */
  constructor(qusetionTitle, description, answer, id, action) {
    this.clickStreamObject = {};
    this.clickStreamObject.Question_vod__c = qusetionTitle; //서베이 질문
    this.clickStreamObject.Track_Element_Description_vod__c = description;
    this.clickStreamObject.Answer_vod__c = answer;
    this.clickStreamObject.Track_Element_Id_vod__c = id; //updateRecord에서 처리할 id
    this.clickStreamObject.Usage_Start_Time_vod__c = new Date();
    this.action = action;
  }

  submitSurveyResult() {
    return new Promise((res, rej) => {
      let result = "";
      if (this.isAnswerEmpty(this.clickStreamObject.Answer_vod__c)) {
        return console.log("답변없음"); //만약 답변이 비어있다면 그대로 return 해준다.
      }
      if (!isVeevaEnvironment()) {
        //개발환경이라면 여기서 내보내고 종료
        console.log(this.clickStreamObject);
        return res(result);
      }
      switch (this.action) {
        case "create":
          com.veeva.clm.createRecord(
            "Call_Clickstream_vod__c",
            this.clickStreamObject,
            function(result) {
              res(result);
            }
          );
          break;
        case "update":
          com.veeva.clm.updateRecord(
            "Call_Clickstream_vod__c",
            this.clickStreamObject.Track_Element_Id_vod__c,
            this.clickStreamObject,
            function(result) {
              res(result);
            }
          );
        default:
          result = "type 확인필요";
          return rej(result);
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
  try {
    for (let i = 0; i < surveyArr.length; i++) {
      await surveyArr[i].submitSurveyResult();
    }
  } catch (error) {
    console.log(error);
  }
};
