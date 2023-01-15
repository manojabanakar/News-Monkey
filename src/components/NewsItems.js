import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let {title, desc, imgUrl, newUrl, publishAt, author,source}=this.props;
        return (
            <div className='my-3'>
                <div className="card" style={{width: '18rem'}}>
                    <span className="position-absolute top-0 translate-middle badge bg-danger rounded-pill" style={{left: "95%", zIndex:"1"}}>
                    {source}
                         </span>
                    <img src={imgUrl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}...</h5>
                            <p className="card-text">{desc}...</p>
                            <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} at {new Date(publishAt).toGMTString()}</small></p>
                            <a href={newUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItems
