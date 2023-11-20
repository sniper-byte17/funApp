import react from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

export default function Search ({}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit handnled');
    }

    return (
        <form onSubmit={handleSubmit} className="search">
            <div className="search__box">
                <label htmlFor="search">Search</label>
                <input type="text" id="search" name="search" />
                <FontAwesomeIcon icon={faCheckSquare} size="sm" className="search__box-icon"/>
            </div>
            <div className="search__button">
                <label htmlFor="submit">Submit</label>
                <input type="submit" value="Search" />
            </div>
        </form>
    )
} 