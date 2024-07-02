import './App.css';
import { useState } from "react";
import usePasswordGenerator from './hooks/use-password-generator';
import PasswordStrengthIndicator from './components/StrengthChecker';
import Button from './components/Button';

function App() {

  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false}
  ]);
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    },1000);
  };

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">

      {/* Password Text and Copy button*/}
      {password && (<div className='header'>
        <div className="title">{password}</div>
        <Button 
            text={copied ? "Copied" : "copy"} 
            customClass="copyBtn" 
            onClick={handleCopy}
        />
      </div>
      )}

      {/* choose Character Length */}
      <div className='charlength'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input
           type='range'
           min='4'
           max='20'
           value = {length}
           onChange = {(e) => setLength(e.target.value)}
        />
      </div>

      {/* Checkboxed */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <div key={index}>
              <input 
                  type="checkbox" 
                  onChange={() => handleCheckboxChange(index)}
                  checked={checkbox.state}
              />
              <label>{checkbox.title}</label>
            </div>
          );
        })}
      </div>

      {/* Strength */}
      <PasswordStrengthIndicator password={password}/>

      {/* Error Handling */}
      {errorMessage && (<div className='errorMessage'>
        {errorMessage}
        </div>
      )}

      {/* Generate Button */}
      <Button 
            text= "Generate Password" 
            customClass= "generateBtn" 
            onClick={() => generatePassword(checkboxData, length)}
        />
    </div>
  );
}

export default App;
