const survey1 = new SurveyClickStream(
  "현재 난소암 second line Tx에서는 어떤 치료를 주로 하시나요?",
  "second line tx에서 어떤 치료를 하시나요?",
  "약물치료",
  "survey1",
  "create"
);

const survey2 = new SurveyClickStream(
  "오늘 날씨는 어떻습니까?",
  "오늘 날씨 질문",
  "허리케인",
  "survey2",
  "update"
);

const surveyArr = [survey1, survey2];
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", () => {
  /*
      클릭했을 때 만약 Veeva가 아닐 경우라면(개발단계라면) 그냥 넘어가고
      Veeva이고 답변들이 들어가 있다면 각각 인스턴스마다 clickStream을 만들어서 보내준다.
      */
  submitClickStream(surveyArr)
    .then()
    .catch(e => console.log(e));
});
