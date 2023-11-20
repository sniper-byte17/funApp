import react, {useState, useEffect, useContext} from 'react';
import questions from '../lib/questions';
import {useRouter} from 'next/router';
import { SearchResultContext } from '../lib/context';

const useQuestionnaire = () => {
    const [answers, setAnswers] = useState({
      gender: [],
      ethnicity: [],
      age: [],
      contentCategory: []
    });
    const [currentStep, setCurrentStep] = useState(0);
    const [isFinalQuestion, setIsFinalQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);    
    const [hasSelectedAnswer, setHasSelectedAnswer] = useState(false);
    const [lockCount, setLockCount] = useState(0);
    const router = useRouter();
    const {setResults} = useContext(SearchResultContext);

    const storeAnswer = (e, i) => {
      const name = e.target.getAttribute('data-expectedData');
      const value = e.target.getAttribute('data-dataValue');
      const currAnswers = {...answers};

      currAnswers[name] = [...currAnswers[name], value];
      setAnswers(prevState => ({
        ...prevState,
        [name]: currAnswers[name]
      }));
      setHasSelectedAnswer(true);
    }

    useEffect(() => {
      // console.log(answers);
    }, [answers])

    const removeAnswer = (e) => {
      const name = e.target.getAttribute('data-expectedData');
      const currAnswers = {...answers};
      if(answers[name].length === 0) {
        hasSelectedAnswer(false);
      }
      // console.log(currAnswers[name]);
      let filteredAnswers = [];
      if(currAnswers[name]) {
        filteredAnswers = currAnswers[name].filter(answer => answer !== e.target.value);
      }

      setAnswers(prevState => ({
        ...prevState,
        [name]: filteredAnswers
      }));
    }

    const handleNext = (e) => {
      // console.log(answers);
      setCurrentQuestion(currQues => currQues + 1);
      setCurrentStep(currentStep => {
        if(!hasSelectedAnswer) {
          return currentStep + 1;
        }
        if(hasSelectedAnswer) {
          return currentStep;
        } 
      });
      setHasSelectedAnswer(false);
    }
    const handlePrevious = () => {
      setCurrentQuestion(currQues => currQues - 1);
      setCurrentStep(currentStep => {
        if(currentStep < 0) return 0;
        if(currentQuestion === 1) return 0;
        return currentStep - 1;
      });
      setHasSelectedAnswer(false);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("<HOSTED_URL>/api/v1/profile/searchResult", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
      })
      .then( res => res.json())
      .then( data => {
        setResults(data.data);
      })
      .catch( err => console.log(err));
      console.log(answers);
      router.push('/Search');
    }

    useEffect(() => {
        if(currentQuestion === questions.length - 1) {
          setIsFinalQuestion(true);
        } else if(currentQuestion !== questions.length - 1) {
          setIsFinalQuestion(false);
        }
      }, [currentQuestion]);

    useEffect(() => {
      // console.log(hasSelectedAnswer);
    }, [hasSelectedAnswer]);
    return {
        answers,
        storeAnswer,
        removeAnswer,
        handleNext,
        handlePrevious,
        currentQuestion,
        questions,
        isFinalQuestion,
        handleSubmit,
        hasSelectedAnswer, setHasSelectedAnswer,
        currentStep
    }
}

export default useQuestionnaire;