import React, {useContext, useEffect, useState} from 'react';
import { members } from '../lib/Search/SearchResult/Member';
import { SearchResult } from '../lib/Search/SearchResult/SearchResult';
import { SuggestResult } from '../lib/Search/SearchResult/SuggestResult';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContainer from '../lib/AppContainer';
import BodyWrapper from '../lib/BodyWrapper';
import Link from 'next/link';
import { SearchResultContext } from '../lib/context';

export const Search = () => {
    const {results} = useContext(SearchResultContext);
    const [noResults, setNoResults] = useState(false);

    useEffect( () => {
        if(results?.length === 0) {
            setNoResults(true);
        }
    }, [results])
    
    // Render Creator Card(paginated) data

    return (
        <>
        <div className="search">
            <div className="search-results-wrapper">
                <h2 className='search-results'>Search results</h2>
                {
                    noResults && <h2>No creators found with those options. Please try agan with some different ones.</h2>
                }
                {
                    !noResults && results?.map( creator =>{
                        return (
                            <Link key={creator._id} href={`/${creator.username}`} passHref>
                                <a>
                                    <SearchResult data={creator}/>
                                </a>
                            </Link>
                        )
                    })        
                }
            </div>
            <div className="search-suggestions-wrapper">
            <h2 className='search-suggestions'>Promoted Creators</h2>
                {
                    members.map((data)=><SuggestResult key={data.id} data={data}/>)
                }
            </div>
        </div>
        </>
    );
};

export default Search;