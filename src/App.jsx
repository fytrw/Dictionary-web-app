import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Main from './components/Main'
import Error from './components/Error'
import './style.css'
import { useState, useEffect } from 'react'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontStyle, setFontStyle] = useState('Sans Serif');
  //searching
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);
  // here we set the CSS variables
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--color-text', '#FFFFFF');
      document.documentElement.style.setProperty('--bg-color', '#050505');
      document.documentElement.style.setProperty('--hint-text-color', '#A445ED');
      document.documentElement.style.setProperty('--color-second-text', '#757575');
      document.documentElement.style.setProperty('--error-text-color', '#FF5252');
      document.documentElement.style.setProperty('--search-bar-color', '#1F1F1F');
      document.documentElement.style.setProperty('--box-shadow-color', 'rgba(164, 69, 237, 0.6)');
    } else {
      document.documentElement.style.setProperty('--color-text', '#2D2D2D');
      document.documentElement.style.setProperty('--bg-color', '#FFFFFF');
      document.documentElement.style.setProperty('--hint-text-color', '#A445ED');
      document.documentElement.style.setProperty('--color-second-text', '#757575');
      document.documentElement.style.setProperty('--error-text-color', '#FF5252');
      document.documentElement.style.setProperty('--search-bar-color', '#F4F4F4');
      document.documentElement.style.setProperty('--box-shadow-color', 'rgba(0, 0, 0, 0.2)');
    }
  }, [isDarkMode]); // this effect will run when isDarkMode changes

    // here we set the font style
    useEffect(() => {
      if (fontStyle === 'Sans Serif') {
        document.documentElement.style.setProperty('--font-family', 'Inter, sans-serif');
      } else if (fontStyle === 'Serif') {
        document.documentElement.style.setProperty('--font-family', 'Lora, serif');
      } else if (fontStyle === 'Mono') {
        document.documentElement.style.setProperty('--font-family', 'Inconsolata, monospace');
      }
    }, [fontStyle]); // this effect will run when fontStyle changes

    useEffect(() => {
      if (searchTerm !== '') {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setSearchResult(data);
            console.log(data);
            setError(false);
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            setError(true);
          });
      }
    }, [searchTerm]);
    let displayedResult = null;
  if(error) {
    displayedResult = <Error />
  } else if (searchResult) {
    displayedResult = <Main searchResult={searchResult} setSearchTerm={setSearchTerm} setInputValue={setInputValue}/>
  }
  return (
      <div className="wrapper">
        <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} fontStyle={fontStyle} setFontStyle={setFontStyle}/>
        <SearchBar inputValue={inputValue} setInputValue={setInputValue} setSearchTerm={setSearchTerm}/>
        {displayedResult}
      </div>
  )
}

export default App
