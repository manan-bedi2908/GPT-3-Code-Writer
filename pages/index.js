import Head from 'next/head';
import Image from 'next/image';
import githubLogo from '../assets/github-logo.png';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>AI Code Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Code Generator</h1>
          </div>
          <div className="header-subtitle">
            <h2>Generate Code whatever you want in any language</h2>
          </div>
        </div>
        <div className="prompt-container">
        <textarea
          className="prompt-box"
          placeholder="Enter the name of the program you want to generate along with language"
          value={userInput}
          onChange={onUserChangedText}
        />;
        <div className="prompt-buttons">
        <a
            className={isGenerating ? 'generate-button loading' : 'generate-button'}
            onClick={callGenerateEndpoint}
          >
            <div className="generate">
            {isGenerating ? <span class="loader"></span> : <p>Generate</p>}
            </div>
          </a>
        </div>  
        {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Output</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://github.com/manan-bedi2908"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={githubLogo} alt="GitHub logo" />
            <p>Developed by Manan Bedi</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
