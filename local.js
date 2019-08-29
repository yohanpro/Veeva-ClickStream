const survey1 = new SurveyClickStream(
  "안녕하세요?",
  "인사",
  "",
  "survey1",
  "create"
);

const survey2 = new SurveyClickStream(
  "오늘 날씨는 어떻습니까?",
  "오늘 날씨 질문",
  "",
  "survey2",
  "create"
);
const survey3 = new SurveyClickStream(
  "Number 선택",
  "Num",
  "",
  "survey2",
  "create"
);

const surveyArr = [survey1, survey2, survey3];
const btnSubmit = document.getElementById("btn-submit");

const submit = () => {
  submitClickStream(surveyArr)
    .then(submit => console.log(submit))
    .catch(e => console.log(e));
};

/**
 * 문제 1. create와 update를 어떻게 구분할것인가?
 * 린파자의 경우 -> sessionStorage 사용
 *
 * 문제 2. 어떻게 답변을 넣어줄 것인가?
 * 린파자의 경우
 * class의 경우 재사용이 중요한데, 선택을 줄이는 것이 아닌가?
 *
 * 문제 3. ClickStream 메소드에는 들어가 있지는 않지만,
 * 그래도 필요한 함수의 경우 처리?
 *
 * ex) submitClickStream, getAnswers
 */
