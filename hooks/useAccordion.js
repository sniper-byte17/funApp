import {useState} from 'react';

export default function useAuth() {
    const [accordion1State, setAccordion1State] = useState(false);
    const [accordion2State, setAccordion2State] = useState(false);
    const [accordion3State, setAccordion3State] = useState(false);
    const [accordion4State, setAccordion4State] = useState(false);

    const handleAccordionClick   = (accordion) => {
        // 0, true. rest false
        if(accordion === 0) {
          setAccordion1State(true);
          setAccordion2State(false);
          setAccordion3State(false);
          setAccordion4State(false);
        } else if(accordion ===1) {
          setAccordion1State(false);
          setAccordion2State(true);
          setAccordion3State(false);
          setAccordion4State(false);
        } else if(accordion === 2) {
          setAccordion1State(false);
          setAccordion2State(false);
          setAccordion3State(true);
          setAccordion4State(false);
        } else if(accordion === 3) {
          setAccordion1State(false);
          setAccordion2State(false);
          setAccordion3State(false);
          setAccordion4State(true);
    
        }
    }

    return {
        accordion1State, accordion2State, accordion3State, accordion4State, handleAccordionClick
    }
}