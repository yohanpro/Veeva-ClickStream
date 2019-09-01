const q1 = document.querySelector("#question-1");
const q2 = document.querySelector("#question-2");
const q3 = document.querySelector("#question-3");

const survey1 = new SurveyClickStream(
  "안녕하세요?",
  "인사",
  `d`,
  "survey1",
  "create"
);

const survey2 = new SurveyClickStream(
  "오늘 날씨는 어떻습니까?",
  "오늘 날씨 질문",
  `${q1.value}`,
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

const submit = () => {
  submitClickStream(surveyArr)
    .then(submit => console.log(submit))
    .catch(e => console.log(e));
};
