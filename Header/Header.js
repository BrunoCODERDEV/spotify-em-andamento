
import React from 'react';
import './Header.css';
import smallRight from '../assets/icons/small-right.png';
import smallLeft from '../assets/icons/small-left.png';
import search from '../assets/icons/search.png';
import { useEffect, useState } from "react"

const Header = ({onSearchResults}) => { 
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        if (searchTerm === '') {
            onSearchResults([]);
            return;
        };

        fetch(`http://localhost:3000/artists?name_like=${searchTerm}`)
            .then((response) => response.json())
            .then((results) => {
                
                onSearchResults(results);
            })
            .catch((error) => console.error("erro na api:", error));
    }, [searchTerm]);
    return (
        <nav className="header__navigation">
            <div className="navigation">
                <button className="arrow-left">
                    <img src={smallLeft} alt="Seta esquerda" />
                </button>
                <button className="arrow-right">
                    <img src={smallRight} alt="Seta direita" />
                </button>
            </div>
            <div className="header__search">
                <img src={search} alt="Buscar"/>
                <input 
                    id="search-input" 
                    maxLength="800" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    spellCheck="false"
                    placeholder="O que você quer ouvir?"
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    value={searchTerm}
                />
            </div>
            <div className="header__login">
                <button className="subscribe">Inscreva-se</button>
                <button className="login">Entrar</button>
            </div>
        </nav>
    )
};

export default Header;
