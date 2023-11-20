import { BsThreeDotsVertical } from 'react-icons/bs'
import Img from '../../../lib/Img'
import Link from 'next/link'

export const SuggestResult=({data})=>{
    const {name,email,posts,likes,profilePhoto,coverPhoto} = data
    return(
        <div className="search-result-card search-result-card--suggestion-card">
            <div className="search-result-card__cover" style={{backgroundImage:`url(/user-cover.png)`}}>
                <span className="search-result-card__cover-icon"><BsThreeDotsVertical color='white' /></span>
            </div>
            <div className="search-result-card__identity">
                <Img src="/user-dp.png" alt="" className="search-result-card__dp" />
                <div className="">
                    <p className="search-result-card__identity-name">{name}</p>
                    <p className="search-result-card__identity-username">{email}</p>
                </div>
            </div>
        </div>
    )
}