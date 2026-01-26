// src/data/questions.ts
export type Question = {
    id: number;
    text: string;
    type: 'QCU' | 'QCM';
    options: string[];
    correct: number[]; // A lire en commençant par 0, première option = 0, deuxième option = 1 ect..
    correct_doc : number[];
    img: string;
  };
  
export const questions: Question[] = [
    {
      id: 1,
      text: "« Bonjour, j’ai eu dernièrement un accident et depuis je suis KO. »",
      type: 'QCU',
      options: [
        "Alcool",
        "Tabac",
        "Cannabis",
        "Cocaïne",
        "Sucre",
        "Café",
        "Protoxyde d'azote",
        "Ecstasy",
        "Codéïne",
      ],
      correct: [8],
      correct_doc: [2],
      img: "assets/img/leo.PNG"
    },
    {
        id: 2,
        text: "« Bonjour, je ne sais pas trop lire ce papier d’analyse sanguine vous pourriez m’aider s’il vous plait ? d’ailleurs auriez-vous un petit truc a grignoté ? »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [4],
        correct_doc: [1],
        
        img: "assets/img/guy.PNG"
      },{
        id: 3,
        text: "« Bonjour, je ne sais plus où je suis, j’ai la tête qui tourne tellement… »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [6],
        correct_doc: [4,6],
        
        img: "assets/img/sarah.PNG"
      },{
        id: 4,
        text: "« J’arrive pas à dormir, et j’ai pleins de proche qui me font des réflexion sur mon comportement. Il parait que je suis 'agressif'….pfff »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [0],
        correct_doc: [2,3],
        
        img: "assets/img/igor.PNG"
      },{
        id: 5,
        text: "« Bonjour, je ne comprends pas je suis normal et pourtant j’ai du mal à m’endormir le soir. »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [5],
        correct_doc: [5,7],
        
        img: "assets/img/alex.PNG"
      },{
        id: 6,
        text: "« Meuf, j’ai telllement la dalle t’a des gâteaux ou autre ? »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [2],
        correct_doc:[1,6],
        
        img: "assets/img/ema.PNG"
      },{
        id: 7,
        text: "« Bonjour, j’ai besoin d’aide j’essaie d’arrêter et je vais souvent voir un groupe de parole. »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [7],
        correct_doc: [4,5],
        
        img: "assets/img/jeann.PNG"
      },{
        id: 8,
        text: "« Bonjour, j’ai rdv avec le dentiste dans 2h et j’aimerais aussi faire une pause entre temps dehors, vous pensez que ça peut le faire ? »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [1],
        correct_doc: [1,2],
        
        img: "assets/img/paul.PNG"
      },{
        id: 9,
        text: "« Bonjour, j’ai trop soif vous auriez un distributeur de boisson ?  »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [2],
        correct_doc: [5],
        
        img: "assets/img/remi.PNG"
      },{
        id: 10,
        text: "« Bonjour, je dois passer ici car je n’arrête pas d’avoir des problèmes avec la justice. Je passe au tribunal dans 1 semaine. »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [0],
        correct_doc: [6],
        img: "assets/img/jeanb.PNG"
      },{
        id: 11,
        text: "« Bonjour, j’aurais besoin de renseignements car je tombe malade rapidement et je tousse tout le temps. »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [1],
        correct_doc: [2,7],
        
        img: "assets/img/anna.PNG"
      },{
        id: 12,
        text: "« Bonjour, j’ai un peu honte, je consomme une drogue excitante pour tenir le rythme au travail. »",
        type: 'QCU',
        options: [
          "Alcool",
          "Tabac",
          "Cannabis",
          "Cocaïne",
          "Sucre",
          "Café",
          "Protoxyde d'azote",
          "Ecstasy",
          "Codéïne",
        ],
        correct: [3],
        correct_doc: [4,5],
        
        img: "assets/img/jack.PNG"
      }
  ];