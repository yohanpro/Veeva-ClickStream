const survey1 = new SurveyClickStream(
  "안녕하세요?",
  "인사",
  "Hi!",
  "survey1",
  "text",
  "create"
);

const survey2 = new SurveyClickStream(
  "오늘 날씨는 어떻습니까?",
  "오늘 날씨 질문",
  "Very good",
  "survey2",
  "text",
  "create"
);
const survey3 = new SurveyClickStream(
  "Number 선택",
  "Num",
  "3",
  "survey3",
  "picklist",
  "create"
);
const surveyArr = [survey1, survey2, survey3];

const submit = () => {
  submitClickStream(surveyArr);
};
