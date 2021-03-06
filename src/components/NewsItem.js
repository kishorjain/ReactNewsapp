import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {title,description,imageUrl,newsUrl} = this.props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                <img src={imageUrl} className="card-img-top" alt="" style={{"maxHeight": "160px"}} />
                    <div className ="card-body">
                        <h5 className ="card-title">{title.slice(0,35)}...</h5>
                        <p className ="card-text">{description.slice(0,88)}...</p>
                        <a href={newsUrl} rel="noreferrer" className ="btn btn-dark" target="_blank">Read More</a>
                    </div>
                </div>

            </div>
        )
        
    }
}

export default NewsItem
