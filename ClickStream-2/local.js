const survey1 = new SurveyClickStream(
  "안녕하세요?",
  "인사",
  null,
  "survey1",
  "text",
  "create"
);

const survey2 = new SurveyClickStream(
  "오늘 날씨는 어떻습니까?",
  "오늘 날씨 질문",
  null,
  "survey2",
  "text",
  "create"
);
const survey3 = new SurveyClickStream(
  "Number 선택",
  "Num",
  null,
  "survey3",
  "picklist",
  "create"
);
const surveyArr = [survey1, survey2, survey3];

const submit = async () => {
  await getAnswers(surveyArr);
  await submitClickStream(surveyArr)
    .then(submit => console.log(submit))
    .catch(e => console.log(e));
};
