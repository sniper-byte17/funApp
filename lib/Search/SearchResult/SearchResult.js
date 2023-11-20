import {BsThreeDotsVertical} from 'react-icons/bs'
import Img from '../../../lib/Img'
import Link from 'next/link'

export const SearchResult=({data})=>{
    const {username, email, bio, proPic, coverPic} = data 
    return(
        <div className="search-result-card">
            <div className="search-result-card__cover" style={{backgroundImage:`url(${coverPic})`}}>
                <span className="search-result-card__cover-icon"><BsThreeDotsVertical color='white' /></span>
            </div>
            <div className="search-result-card__identity">
                <Img src={proPic} alt="" className="search-result-card__dp" />
                <div className="">
                    <p className="search-result-card__identity-name">{username}</p>
                    <p className="search-result-card__identity-username">{email}</p>
                </div>
            </div>
            <div className="search-result-card__more">
                <span className="search-result__more-bio">
                {bio}
                </span>                
                <Link href={`/${username}`} passHref>
                    <a>
                        <button className="search-result__more-button">View profile</button>
                    </a>
                </Link>
            </div>
        </div>
    )
}

