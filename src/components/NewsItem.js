import React from 'react'
const handleImgError=(e)=>{
    e.target.src = "/noimage.png";//bydefault react understand this is present in react public folder

}

const NewsItem =(props)=> {
    
        let { title, description, imageUrl, newsUrl, author, publishedDate, source } = props;
        return (
            <div>
                <div className="card" >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '85%', zIndex: '1' }}>
                        {source}</span>
                    <img src={imageUrl}onError={handleImgError} className="card-img-top" alt="{/noimage.png}" style={{ "maxHeight": "160px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title.slice(0, 35)}...</h5>

                        <p className="card-text">{description.slice(0, 88)}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? 'Unkown' : author} on {new Date(publishedDate).toGMTString()}</small></p>
                        <a href={newsUrl} rel="noreferrer" className="btn btn-dark" target="_blank">Read More</a>
                    </div>
                </div>
            </div>
        )
    
}

export default NewsItem
