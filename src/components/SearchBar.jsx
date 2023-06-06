import { useState, useRef } from 'react';
import { ReactComponent as SearchLoop } from '../assets/images/icon-search.svg';

function SearchBar({inputValue, setInputValue, setSearchTerm}){
    const [emptyInput, setEmptyInput] = useState(false);
    const inputRef = useRef(); // Create a ref for the input field

    const handleSubmit = (event) => {
        event.preventDefault();
        if(inputValue === '') {
            setEmptyInput(true);
        } else {
            setEmptyInput(false);
            setSearchTerm(inputValue);
            inputRef.current.blur(); // Remove focus from the input field
        }
    }

    return(
        <form className={emptyInput ? 'search-bar error-empty' : 'search-bar'} onSubmit={handleSubmit} >
            <input ref={inputRef} type="text" value={inputValue} onChange={e => {setInputValue(e.target.value)}}/>
            <button className="search-loop">
                <SearchLoop />
            </button>
            {emptyInput && <p className="error-empty-text">Whoops, can’t be empty…</p>}
        </form>
    )
}

export default SearchBar;

