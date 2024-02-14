import { useState } from 'react';
import './App.css'

function App() {
  return (
    <div>
      <ParagraphGenerator />
    </div>
  );
}

function ParagraphGenerator() {
  const [words] = useState([
    "Lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
    "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
    "et", "dolore", "magna", "aliqua"
  ]);
  const [generatedParagraphs, setGeneratedParagraphs] = useState([]);

  function generateParagraph(number) {
    let paragraph = '';
    for (let i = 0; i < number; i++) {
      paragraph += words[Math.floor(words.length * Math.random())] + ' ';
    }
    return paragraph;
  }

  function GenerateParagraph() {
    const numberOfWords = parseInt(document.getElementById('number-input').value);
    const paragraphs = [];
    for (let i = 0; i < numberOfWords; i += 150) {
      const paragraph = generateParagraph(Math.min(150, numberOfWords - i));
      paragraphs.push(paragraph);
    }
    setGeneratedParagraphs(paragraphs);
  }

  return (
    <div className='app-container'>
      <h1>Paragraph Generator</h1>
      <div className='text-container'>
        <input id='number-input' type='number' placeholder='Enter Number of Words'></input>
        <button onClick={GenerateParagraph}>Generate</button>
     </div>
     <div>
        {generatedParagraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
     </div>
    </div>
  );
}

export default App;
