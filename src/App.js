import { useState } from 'react';
import './App.css';

function App() {
  return (
    <>
      <Calculator />
    </>
  );
}

function Calculator() {
  const [result, setResult] = useState('0');
  const [equation, setEquation] = useState('');
  const [curSign, setCurSign] = useState(null);

  const handleAddInput = (inputValue) => {
    if (result === '0') {
      setResult(inputValue);
    } else if (result !== '0') {
      setResult((prevNum) => prevNum + inputValue);
    }
  };

  const handleClearResult = () => {
    if (result) {
      setResult('0');
      setEquation('');
      setCurSign(null);
    }
  };

  const handleUpdateEquation = (inputSign) => {
    if (result !== '0') {
      setCurSign(inputSign);
      setEquation((prevEqua) => prevEqua + ' ' + result + ' ' + inputSign);
      setResult('0');
    }
  };

  const handleShowResult = () => {
    if (!curSign && result === '0') {
      console.log('Hello');
      setResult('0');
      return;
    }

    let finalResult = 0;
    if (result !== '0') {
      finalResult = eval(equation + ' ' + result);
    } else {
      finalResult = eval(equation.split(' ').slice(0, -1));
      finalResult = finalResult.join('');
    }
    setCurSign(null);
    setResult(JSON.stringify(finalResult));
    setEquation('');
  };

  const handleSwapSign = () => {
    if (result !== '0') {
      setResult((result) => JSON.stringify(Number(result) * -1));
    }
  };

  const handleDeleteNum = () => {
    if (result !== '0') {
      if (result.length === 1) {
        setResult('0');
      } else {
        setResult((result) => result.slice(0, -1));
      }
    }
  };

  const handleAddDecimal = () => {
    if (!result.includes('.')) {
      setResult((result) => result + '.');
    }
  };

  return (
    <div className='cal-container'>
      <Result result={result} equation={equation} curSign={curSign} />
      <ButtonContainer
        onClearResult={handleClearResult}
        onAddInput={handleAddInput}
        onUpdateSign={handleUpdateEquation}
        onShowResult={handleShowResult}
        onSwapSign={handleSwapSign}
        onDeleteNum={handleDeleteNum}
        onAddDecimal={handleAddDecimal}
      />
    </div>
  );
}

function Result({ result, equation, curSign }) {
  return (
    <div className='result-container'>
      <h6 className='equation'>{equation}</h6>
      <div className='bottom-result'>
        <span className='cur-sign'>{curSign}</span>
        <h1 className='final-result'>{result}</h1>
      </div>
    </div>
  );
}

function ButtonContainer({
  onClearResult,
  onAddInput,
  onUpdateSign,
  onShowResult,
  onSwapSign,
  onDeleteNum,
  onAddDecimal,
}) {
  return (
    <div className='btn-container'>
      <ClearBtn onClearResult={onClearResult} />
      <ActionBtn value={'±'} onSwapSign={onSwapSign} />
      {/* <ActionBtn value={'%'} /> */}
      <SignBtn value={'%'} onUpdateSign={onUpdateSign} />
      <SignBtn value={'/'} onUpdateSign={onUpdateSign} />
      <NumBtn value={7} onAddInput={onAddInput} />
      <NumBtn value={8} onAddInput={onAddInput} />
      <NumBtn value={9} onAddInput={onAddInput} />
      <SignBtn value={'*'} onUpdateSign={onUpdateSign} />
      <NumBtn value={4} onAddInput={onAddInput} />
      <NumBtn value={5} onAddInput={onAddInput} />
      <NumBtn value={6} onAddInput={onAddInput} />
      <SignBtn value={'-'} onUpdateSign={onUpdateSign} />
      <NumBtn value={1} onAddInput={onAddInput} />
      <NumBtn value={2} onAddInput={onAddInput} />
      <NumBtn value={3} onAddInput={onAddInput} />
      <SignBtn value={'+'} onUpdateSign={onUpdateSign} />
      <NumBtn value={0} onAddInput={onAddInput} />
      <ActionBtn value={'.'} onAddDecimal={onAddDecimal} />
      <DeletBtn onDeleteNum={onDeleteNum} />
      <ActionBtn value={'='} onShowResult={onShowResult} />
    </div>
  );
}

function NumBtn({ value, onAddInput }) {
  return (
    <div className='btn btn-num' onClick={() => onAddInput(JSON.stringify(value))}>
      {value}
    </div>
  );
}

function SignBtn({ value, onUpdateSign }) {
  return (
    <div className='btn btn-sign' onClick={() => onUpdateSign(value)}>
      {value}
    </div>
  );
}

function ClearBtn({ onClearResult }) {
  return (
    <div className='btn btn-clear' onClick={() => onClearResult()}>
      C
    </div>
  );
}

function DeletBtn({ onDeleteNum }) {
  return (
    <div className='btn btn-delete' onClick={() => onDeleteNum()}>
      &lArr;
    </div>
  );
}

function ActionBtn({ value, onShowResult, onSwapSign, onAddDecimal }) {
  const handleReturnAction = () => {
    if (value === '=') {
      onShowResult();
    } else if (value === '±') {
      onSwapSign();
    } else if (value === '.') {
      onAddDecimal();
    } else {
      console.log('invalid action');
    }
  };

  return (
    <div className='btn btn-action' onClick={() => handleReturnAction()}>
      {value}
    </div>
  );
}

export default App;
