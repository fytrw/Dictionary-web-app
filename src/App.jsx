import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Main from './components/Main'
import Error from './components/Error'
import './style.css'
import { useState, useEffect } from 'react'

// Custom hook for setting CSS variables
const useUpdateCSSVariables = (isDarkMode, fontStyle) => {
  useEffect(() => {
    const styles = isDarkMode ? {
      '--color-text': '#FFFFFF',
      '--bg-color': '#050505',
      '--hint-text-color': '#A445ED',
      '--color-second-text': '#757575',
      '--error-text-color': '#FF5252',
      '--search-bar-color': '#1F1F1F',
      '--box-shadow-color': 'rgba(164, 69, 237, 0.6)',
    } : {
      '--color-text': '#2D2D2D',
      '--bg-color': '#FFFFFF',
      '--hint-text-color': '#A445ED',
      '--color-second-text': '#757575',
      '--error-text-color': '#FF5252',
      '--search-bar-color': '#F4F4F4',
      '--box-shadow-color': 'rgba(0, 0, 0, 0.2)',
    };

    const fonts = {
      'Sans Serif': 'Inter, sans-serif',
      'Serif': 'Lora, serif',
      'Mono': 'Inconsolata, monospace',
    };

    Object.entries(styles).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    document.documentElement.style.setProperty('--font-family', fonts[fontStyle]);
  }, [isDarkMode, fontStyle]);
};

// Async function for fetching search results
const fetchSearchResults = async (searchTerm, setSearchResult, setError) => {
  if (!searchTerm) return;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setSearchResult(data);
    setError(false);
  } catch (error) {
    setError(true);
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontStyle, setFontStyle] = useState('Sans Serif');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState(false);

  // Use custom hook for setting CSS variables
  useUpdateCSSVariables(isDarkMode, fontStyle);

  // Fetch search results when searchTerm changes
  useEffect(() => {
    fetchSearchResults(searchTerm, setSearchResult, setError);
  }, [searchTerm]);

  let displayedResult = error ? <Error /> : (searchResult && <Main searchResult={searchResult} setSearchTerm={setSearchTerm} setInputValue={setInputValue}/>);

  return (
    <div className="wrapper">
      <Header darkMode={isDarkMode} setDarkMode={setIsDarkMode} fontStyle={fontStyle} setFontStyle={setFontStyle}/>
      <SearchBar inputValue={inputValue} setInputValue={setInputValue} setSearchTerm={setSearchTerm}/>
      {displayedResult}
    </div>
  )
}

export default App

