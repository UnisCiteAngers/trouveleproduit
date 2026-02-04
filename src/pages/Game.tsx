// src/pages/Game.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useGame } from '../context/GameContext';
import { questions } from '../data/questions';
import { documents } from '../data/documents';
import HeaderGame from '../components/ui/HeaderGame';
import Layout from '../components/ui/Layout';

export default function Game() {
  const navigate = useNavigate();
  const { state, setScore, setCurrentQuestion } = useGame();
  const { currentQuestion, score, team } = state;

  // États locaux
  const [selectedQCU, setSelectedQCU] = useState<number | null>(null);
  const [selectedQCM, setSelectedQCM] = useState<number[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<number | null>(null); // Document choisi
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isDocCorrect, setIsDocCorrect] = useState(false);

  useEffect(() => {
    // Empêcher zoom via clavier (Ctrl + +/-)
    const handleKeyDown = (event: { ctrlKey: any; metaKey: any; key: string; preventDefault: () => void; }) => {
      if (event.ctrlKey || event.metaKey) { // metaKey pour Mac (Command)
        if (event.key === '+' || event.key === '-' || event.key === '=') {
          event.preventDefault();
        }
      }
    };

    // Empêcher zoom via roulette + Ctrl
    const handleWheel = (event: { ctrlKey: any; metaKey: any; preventDefault: () => void; }) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const question = questions[currentQuestion];
  if (!question) {
    navigate('/trouveleproduit/fin');
    return null;
  }

  useEffect(() => {
    if (!team || team.trim() === '') {
      navigate('/', { replace: true });
    }
  }, [team, navigate]);

  /** Vérifie la réponse principale */
  /** Vérifie la réponse principale */
  const checkMainAnswer = (): boolean => {
  // SÉCURITÉ : forcer correct en tableau
  const correctArray = Array.isArray(question.correct) ? question.correct : [];

  if (question.type === 'QCU') {
    return selectedQCU !== null && correctArray.indexOf(selectedQCU) !== -1;
  }

  if (question.type === 'QCM') {
    const correctArray = Array.isArray(question.correct) ? question.correct : [];
    const selectedArr = Array.isArray(selectedQCM) ? selectedQCM : [];

    // Tri pour comparer proprement
    const sortedCorrect = [...correctArray].sort((a, b) => a - b);
    const sortedSelected = [...selectedArr].sort((a, b) => a - b);

    // Doit être EXACTEMENT les mêmes indices
    return (
        sortedSelected.length === sortedCorrect.length &&
        sortedSelected.every((val, i) => val === sortedCorrect[i])
    );
}

  return false;
};

  /** Vérifie le document bonus */
const checkDocBonus = (): boolean => {
  if (!selectedDoc) return false;
  const docArray = Array.isArray(question.correct_doc) ? question.correct_doc : [];
  return docArray.indexOf(selectedDoc) !== -1;
};

  /** Soumission */
  const handleSubmit = () => {
    const mainCorrect = checkMainAnswer();
    const docCorrect = mainCorrect ? checkDocBonus() : false;

    setIsCorrect(mainCorrect);
    setIsDocCorrect(docCorrect);
    setShowResult(true);

    // Score : +1 pour réponse principale, +1 bonus si doc correct
    const bonus = docCorrect ? 1 : 0;
    setScore(score + (mainCorrect ? 1 : 0) + bonus);
  };
  
  useEffect(() => {
  const unloadCallback = (event: { preventDefault: () => void; returnValue: string; }) => {
    event.preventDefault();
    event.returnValue = "";
    return "";
  };

  window.addEventListener("beforeunload", unloadCallback);
  return () => window.removeEventListener("beforeunload", unloadCallback);
}, []);

  /** Question suivante */
  const goNext = () => {
    const next = currentQuestion + 1;
    if (next >= questions.length) {
      navigate('/trouveleproduit/fin');
    } else {
      setCurrentQuestion(next);
      // Reset
      setSelectedQCU(null);
      setSelectedQCM([]);
      setSelectedDoc(null);
      setShowResult(false);
      setIsCorrect(false);
      setIsDocCorrect(false);
    }
  };

  return (
   
    <>
    {/* Div Contenu */}
    <div className="min-h-screen bg-[url('/assets/img/background.JPG')] bg-cover bg-center">
      {/* === HEADER FIXE === */}
      {/* HEADER FIXE */}
      <HeaderGame
        team={team}
        currentQuestion={currentQuestion}
        numQuestion={questions.length}
        score={score} />
      {/* === ESPACE VERTICAL POUR HEADER === */}
      <div className="pt-20"></div>

      {/* === CONTENU PRINCIPAL === */}
      <div className="max-w-none">
        <div className="grid lg:grid-cols-12 gap-6 p-4">
          {/* === ZONE CENTRALE : QUESTION + RÉPONSES (gauche + milieu) === */}
          <div className="lg:col-span-4 space-y-6">
            {/* Bulle de discussion (futur fond) */}
            <div className="relative bg-white from-slate-800/90 to-slate-700/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-slate-600">

              {/* Question */}
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 leading-tight">
                {question.text}
              </h2>
            </div>
            {/* Bouton Valider */}
            {!showResult && (
              <Button
                onClick={handleSubmit}
                disabled={(question.type === 'QCU' && selectedQCU === null) ||
                  (question.type === 'QCM' && selectedQCM.length === 0)}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                Valider la réponse
              </Button>
            )}
            {/* === RÉSULTAT APRÈS SOUMISSION === */}
            {showResult && (
              <div className="mt-8 max-w-7xl mx-auto relative">
                <Card className="bg-slate-800/90 p-6 md:p-8 space-y-5 absolute z-20">
                  <div
                    className={`
                      text-center p-5 rounded-xl text-2xl font-bold
                      ${isCorrect ? 'bg-green-600/90 text-green-100' : 'bg-red-600/90 text-red-100'}
                    `}
                  >
                    {isCorrect ? 'Bonne réponse !' : 'Réponse incorrecte'}
                  </div>

                  {isDocCorrect && (
                    <div className="text-center p-4 bg-green-600/90 text-green-100 rounded-xl font-medium">
                      +1 point bonus pour le document !
                    </div>
                  )}

                  <Button
                    onClick={goNext}
                    className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  >
                    {currentQuestion + 1 === questions.length ? 'Voir les résultats' : 'Question suivante'}
                  </Button>
                </Card>
              </div>
            )}
          </div>
          {/* Div fantome*/}
          <div className="lg:col-span-4 mt-6 w-full flex flex-col items-center relative bottom-0"> {/* Conteneur global pleine largeur, flex column pour coller les éléments */}
          </div>

          {/* === PANNEAU DROIT : RÉPONSES & DOCUMENT (bonus) === */}
          <div className="lg:col-span-4">
            {/* QCU */}
            {question.type === 'QCU' && (
              <select
                value={selectedQCU ?? ''}
                onChange={(e) => setSelectedQCU(Number(e.target.value))}
                disabled={showResult}
                className="w-full p-4 text-lg rounded-xl bg-slate-700/80 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option value="" disabled>Choisissez une réponse...</option>
                {question.options.map((opt, idx) => (
                  <option key={idx} value={idx} className="py-2">
                    {idx + 1}. {opt}
                  </option>
                ))}
              </select>
            )}

            {/* QCM */}
            {question.type === 'QCM' && (
              <div className="space-y-3">
                {question.options.map((opt, idx) => {
                  const correctArray = Array.isArray(question.correct) ? question.correct : [];
                  const isChecked = Array.isArray(selectedQCM) ? selectedQCM.indexOf(idx) !== -1 : false;
                  const isCorrectAnswer = correctArray.indexOf(idx) !== -1;
                  const showCorrect = showResult && isCorrectAnswer;
                  const showWrong = showResult && isChecked && !isCorrectAnswer;

                  return (
                    <label
                      key={idx}
                      className={`
                            flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all select-none text-lg
                            ${showResult
                          ? showCorrect
                            ? 'bg-green-600/90 text-white font-medium shadow-lg'
                            : showWrong
                              ? 'bg-red-600/90 text-white font-medium shadow-lg'
                              : 'bg-slate-700/70 text-slate-300'
                          : isChecked
                            ? 'bg-blue-600/90 text-white shadow-md'
                            : 'bg-slate-700/70 hover:bg-slate-600/80 text-slate-200 border border-slate-600'}
                            ${showResult ? 'cursor-default' : ''}
                          `}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        disabled={showResult}
                        onChange={() => {
                          setSelectedQCM(prev => {
                            const arr = Array.isArray(prev) ? prev : [];
                            return arr.indexOf(idx) !== -1
                              ? arr.filter(i => i !== idx)
                              : [...arr, idx];
                          });
                        } }
                        className="w-6 h-6 text-blue-500 rounded focus:ring-2 focus:ring-blue-400" />
                      <span>{idx + 1}. {opt}</span>
                    </label>
                  );
                })}
              </div>
            )}
            <br></br>
            <br></br>
            <Card className="h-full bg-slate-800/90 border-slate-700 p-6 space-y-5 shadow-xl">
              <h3 className="text-lg font-bold text-blue-400 flex items-center gap-2">
                Document de référence
              </h3>
              <p className="text-sm text-slate-300">Choisissez le bon document pour +1 point bonus</p>

              <select
                value={selectedDoc ?? ''}
                onChange={(e) => setSelectedDoc(Number(e.target.value))}
                disabled={showResult}
                className="w-full p-3 rounded-lg bg-slate-700/80 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" disabled>Choisissez un document...</option>
                {documents.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.id} - {doc.text || '(sans titre)'}
                  </option>
                ))}
              </select>

              {showResult && selectedDoc !== null && (
                <div
                  className={`
                    p-3 rounded-lg text-center font-medium text-sm
                    ${isDocCorrect ? 'bg-green-600/90 text-green-100' : 'bg-red-600/90 text-red-100'}
                  `}
                >
                  {isDocCorrect ? '+1 point bonus !' : 'Document incorrect'}
                </div>
              )}
            </Card>
          </div>
        </div>
        {/* === DIV IMAGE : ADAPTATIVE MOBILE / DESKTOP === */}
<div className="w-full">
  {/* VERSION MOBILE : empilé normalement (pas de superposition) */}
  <div className="block relative md:hidden">
    {/* Personnage */}
    <div className="flex justify-center py-4">
      <img
        src={question.img}
        alt="Personnage"
        className="relative z-10 w-auto max-w-[80%] h-auto object-contain drop-shadow-2xl"
      />
    </div>
  </div>

  {/* VERSION DESKTOP/TABLETTE : superposition fixe en bas */}
  <div className="hidden md:block fixed inset-x-0 bottom-0 z-10 pointer-events-none">
    <div className="relative w-full h-full flex justify-center">
      {/* Personnage centré et superposé */}
      <img
        src={question.img}
        alt="Personnage"
        className="relative z-10 w-auto max-w-[60%] lg:max-w-[50%] h-auto object-contain drop-shadow-2xl pointer-events-none"
        style={{ 
          transform: 'translateY(-20%)',
          maxHeight: '75vh'
        }}
      />
      {/* Table en bas */}
      <img
        src="assets/img/table.PNG"
        alt="Bureau"
        className="absolute bottom-0 left-0 w-full h-auto z-20 pointer-events-none"
      />
    </div>
  </div>
</div>
      </div>
    </div><Layout /></>
  );
}