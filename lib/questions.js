const questions = [
    {
      question: 'What are you searching for?',
      title: 'What are you searching for?',
      options: [
        {
          src: '/male.png',
          value: 'Male',
          class: 'gender-male-class',
          data: 'male'
        },
        {
          src: '/female.png',
          value: 'Female',
          class: 'gender-female-class',
          data: 'female'
        },
        {
          src: '/male-to-female.png',
          value: 'Transgender Male to Female',
          class: 'gender-male-female-class',
          data: 'transgenderMaleToFemale'
        },
        {
          src: '/female-to-male.png',
          value: 'Transgender Female to Male',
          class: 'gender-female-male-class',
          data: 'transgenderFemaleToMale'
        },
        {
          src: '/non-binary.png',
          value: 'Non Binary',
          class: 'gender-non-binary-class',
          data: 'nonBinary'
        }
      ],
      id: 'a',
      expectedData: 'gender',
    },
    {
      question: 'What age range?',
      title: 'Age Group',
      options: [
        {
          src: '',
          value: '18-25',
          data: '18-25'
        },
        {
          src: '',
          value: '26-30',
          data: '26-30'
        },
        {
          src: '',
          value: '31-35',
          data: '31-35'
        },
        {
          src: '',
          value: '36-40',
          data: '36-40'
        },
        {
          src: '',
          value: '41-50',
          data: '41-50'
        },
        {
          src: '',
          value: '50+',
          data: '50+'
        }
      ],
      id: 'b',
      expectedData: 'age',
    },
    {
      question: 'What ethnicity',
      title: 'Pick Your Favorite Region',
      options: [
        {
          src: '',
          value: 'White/Caucasian',
          data: 'white/caucasion'
        },
        {
          src: '',
          value: 'Asian',
          data: 'asian'
        },
        {
          src: '',
          value: 'Ebony',
          data: 'ebony'
        },
        {
          src: '',
          value: 'Hispanic',
          data: 'hispanic'
        },
        {
          src: '',
          value: 'Indian',
          data: 'indian'
        },
        {
          src: '',
          value: 'Other',
          data: 'other'
        }
      ],
      id: 'c',
      expectedData: 'ethnicity',
    },
    {
      question: 'What type of content are you after?',
      title: 'Content Type',
      options: [
        {
          src: '',
          value: 'Solo',
          data: 'solo'
        },
        {
          src: '',
          value: 'B/G',
          data: 'b/g'
        },
        {
          src: '',
          value: 'Kink',
          data: 'kink'
        },
        {
          src: '',
          value: 'Feet',
          data: 'feet'
        },
        {
          src: '',
          value: 'BBW',
          data: 'bbw'
        },
        {
          src: '',
          value: 'Fetish',
          data: 'fetish'
        },
        {
          src: '',
          value: 'Gay/Lesbian',
          data: 'gay/lesbian'
        },
        {
          src: '',
          value: 'Public',
          data: 'public'
        },
        {
          src: '',
          value: 'Toys',
          data: 'toys'
        },
        {
          src: '',
          value: 'Celebrity',
          data: 'celebrity'
        },
      ],
      id: 'd',
      expectedData: 'contentCategory',
    },
];

export default questions;