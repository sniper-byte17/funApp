import Question from './Question';

const QuestionnaireForm = ({currentQuestion, storeAnswer, questions, lockAnswer}) => {
    
    return  (
            questions[currentQuestion - 1] ?
            <Question
                key={questions[currentQuestion - 1].id}
                question={questions[currentQuestion - 1].question}
                options={questions[currentQuestion - 1].options}
                expectedData={questions[currentQuestion - 1].expectedData}
                title={questions[currentQuestion - 1].title}
                handleChoiceLock={lockAnswer}
                currentQuestion={currentQuestion} />
            : null
    )  
}

export default QuestionnaireForm;