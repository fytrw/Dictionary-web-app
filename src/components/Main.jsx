import { ReactComponent as Listen } from '../assets/images/icon-play.svg'
import {ReactComponent as NewWindow} from '../assets/images/icon-new-window.svg'
import {useEffect, useState} from 'react'

function Main({searchResult, setSearchTerm, setInputValue}) {
    const [isHovered, setIsHovered] = useState(false)
    const [soundURL, setSoundURL] = useState(null);

    useEffect(() => {
        const searchSound = (searchResult) => {
            for (let i = 0; i < searchResult[0].phonetics.length; i++) {
                if (searchResult[0].phonetics[i].audio) {
                    setSoundURL(searchResult[0].phonetics[i].audio);
                    return;
                }
            }
            setSoundURL(null);
        }
        searchSound(searchResult);
    }, [searchResult]);

    function playSound() {
        if (soundURL) {
            const audio = new Audio(soundURL);
            audio.play();
        }
    }
    return (
        <main>
            <div className="top">
                <div className="word">
                    <h1 className="naming">{searchResult[0].word}</h1>
                    <p className="spelling">{searchResult[0].phonetic}</p>
                </div>
                <button className="listen" onClick={playSound} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <Listen className={isHovered ? 'hovered' : 'normal'} />
                </button>
            </div>
            {searchResult[0].meanings.map((meaning, index) => (
                <div key={index} className='info-container'>
                    <div className="type">{meaning.partOfSpeech}</div>
                    <div className="explanation">
                        <h1 className="meaning">Meaning</h1>
                        <ul>
                            {meaning.definitions.map((definition, i) => (
                                <li key={i}>{definition.definition}
                                {definition.example && <p className='example'>&quot;{definition.example}&quot;</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {meaning.synonyms.length ? <div className="synonyms">
                        <p className="synonyms-title">Synonyms</p>
                        {meaning.synonyms.map((definition, i) => (
                            <p key={i} onClick={()=> {
                                setSearchTerm(definition)
                                setInputValue(definition)
                            }}className="synonyms-output">{definition}</p>
                        ))}
                    </div> : null}
                </div>
            ))}
            <div className="source">
                <p>Source</p>
                {searchResult[0].sourceUrls.map((source, index) => (
                    <a key={index} href={source} target="_blank" rel="noreferrer">
                        {source}
                        {<NewWindow />}
                    </a>
                ))}
            </div>
        </main>
    )
}

export default Main