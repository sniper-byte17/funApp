import React, { useEffect, useState } from 'react';
import { Steps, Button, message } from 'antd';
import Img from './Img';
import useQuestionnaire from '../hooks/useQuestionnaire';
import Question from '../components/Question';
import { useRouter } from 'next/router';
import ProgressBar from './ProgressBar';

const { Step } = Steps;


const Stepper = () => {
  // const [hasSelectedAnswer, setHasSelectedAnswer] = useState(false);
  const { handleNext, currentStep, storeAnswer, removeAnswer, handleSubmit, currentQuestion, handlePrevious, questions, hasSelectedAnswer, setHasSelectedAnswer } = useQuestionnaire();
  // console.log(`Current question: ${currentQuestion}`);

  const router = useRouter();
  const steps = [
    {
      title: '',
      content: '',
    },
    {
      title: '',
      content: '',
    },
    {
      title: '',
      content: '',
    },
    {
      title: '',
      content: '',
    }
  ];
  console.log(currentQuestion, steps.length);
  const [current, setCurrent] = useState(0);
  const [circle1Class, setCircle1Class] = useState('circle-answering');
  const [circle2Class, setCircle2Class] = useState('');
  const [circle3Class, setCircle3Class] = useState('');
  const [circle4Class, setCircle4Class] = useState('');

  const next = () => {
    setCurrent(current + 1);
    setHasSelectedAnswer(false);
  };

  const prev = () => {
    setCurrent(current - 1);
    setHasSelectedAnswer(false);
  };

  useEffect( () => {
    if(currentQuestion === 0) {      
      setCircle1Class('circle-answering');
      setCircle2Class('');
      setCircle3Class('');
      setCircle4Class('');
    } else if(currentQuestion === 1) {
      setCircle1Class('circle-answered');
      setCircle2Class('circle-answering');
      setCircle3Class('');
      setCircle4Class('');
    } else if (currentQuestion === 2 ) {
      setCircle1Class('circle-answered');
      setCircle2Class('circle-answered');
      setCircle3Class('circle-answering');
      setCircle4Class('');
    } else if (currentQuestion === 3 ) {
      setCircle1Class('circle-answered');
      setCircle2Class('circle-answered');
      setCircle3Class('circle-answered');
      setCircle4Class('circle-answering');
    } 
  }, [currentQuestion])

  return (
    <div className="stepper-wrapper">
      
      <ProgressBar 
        // hidden={current === 1} 
        items={steps.length} 
        currentQuestion={currentQuestion} 
        circle1Class={circle1Class} 
        circle2Class={circle2Class} 
        circle3Class={circle3Class}
        circle4Class={circle4Class}
        hasSelectedAnswer={hasSelectedAnswer} />
      <div className="steps-content">
        <form className="haedar-form-amar">
        {
          questions[currentQuestion] && 
          <Question
            key={questions[currentQuestion].id}
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            expectedData={questions[currentQuestion].expectedData}
            data={questions[currentQuestion].data}
            storeAnswer={storeAnswer}
            removeAnswer={removeAnswer} />
        }
        </form>
      </div>
      <div className="steps-action">
        {currentQuestion > 0 && (
          <Button style={{ margin: '0 8px'}} className='questionnaire-button' onClick={handlePrevious}>
            Back
          </Button>
        )}
        {currentQuestion === steps.length - 1 && (
          <Button 
            type="primary" 
            className={`questionnaire-button ${hasSelectedAnswer ? 'questionnaire-button--locked' : ' '}`} 
            onClick={(e) => {hasSelectedAnswer && handleSubmit(e)}}>
            Submit
          </Button>
        )}
        {currentQuestion < steps.length - 1 && (
          <Button 
            type="primary" 
            className={`questionnaire-button ${hasSelectedAnswer ? 'questionnaire-button--locked' : ' '}`} 
            onClick={() => {hasSelectedAnswer && handleNext()}}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default Stepper;



