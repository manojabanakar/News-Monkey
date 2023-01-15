import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize:8,
        category:"general"
    }
    static propsTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    articles= []
    constructor(props) {
        super(props);
        console.log('News class')
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:1
        }
        document.title=`${this.props.category[0].toUpperCase()}${this.props.category.slice(1)}-NewsMonkey`
    }

    async updateNews(){
        this.props.setProgress(20);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}&category=${this.props.category}`
        this.setState({
            loading:true
        })
        this.props.setProgress(30);
        let data=await fetch(url);
        let parsedData=await data.json()
       
        this.setState({
            articles:parsedData.articles,
            loading:false
        })
        this.props.setProgress(100);
    }
    async componentDidMount(){
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f9d94b78fae47f1b03aa0cc3b45d934&pageSize=${this.props.pageSize}`
        // this.setState({
        //     loading:true
        // })
        // let data=await fetch(url)
        // let parsedData=await data.json()
        // // console.log()
        // // console.log(parsedData.totalResults-40)
        // this.setState({articles: parsedData.articles,
        //     totalResults:parsedData.totalResults-this.props.pageSize,
        //     loading:false
        // })
        this.updateNews();
        // console.log(typeof(this.totalResults))
    }
    changeNextPage=async()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f9d94b78fae47f1b03aa0cc3b45d934&page=${this.state.page+1}&pageSize=${this.props.pageSize}&category=${this.props.category}`
        // this.setState({
        //     loading:true
        // })
        // let data=await fetch(url)
        // // console.log(data)
        // let parsedData=await data.json()
        // // console.log(parsedData)
        // console.log(this.totalResults)
        this.setState({
            page:this.state.page+1,
            // articles:parsedData.articles,
            totalResults:this.state.totalResults-this.props.pageSize,
            // loading:false
        })
        this.updateNews();
    }
    changePrevPage=async()=>{
        // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6f9d94b78fae47f1b03aa0cc3b45d934&page=${this.state.page-1}&pageSize=${this.props.pageSize}&category=${this.props.category}`
        // this.setState({
        //     loading:true
        // })
        // let data=await fetch(url);
        // let parsedData=await data.json()
       
        // this.setState({
        //     page:this.page-1,
        //     articles:parsedData.articles,
        //     totalResults:this.totalResults+this.props.pageSize,
        //     loading:false
        // })
        this.setState({
            page:this.state.page-1,
            totalResults:this.state.totalResults+this.props.pageSize,
        })
        this.updateNews();
    }
    render() {
        return (
            <div className='container my-2 mx-auto'>
                <h3 className="text-center">News Monkey- Top Headings</h3>
                {this.state.loading && <Spinner/>}
                {!this.state.loading && 
                <div className="row">
                    {this.state.articles.map((element)=>{
                        return <div className="col-md-4" key={element.url}>
                        <NewsItems title={element.title?element.title.slice(0,45):""} desc={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://images.moneycontrol.com/static-mcnews/2022/02/Shaktikanta-Das-Twitter-770x433.jpg"} publishAt={element.publishedAt} author={element.author} source={element.source.name} newUrl={element.url}/>
                    </div>
                    })}
                    
                </div>
                }
                <div className="d-flex justify-content-center container">
                    <button disabled={this.state.page<=1?true:false} type='button' className="btn btn-primary mx-2" onClick={this.changePrevPage}>&larr; Previous</button>
                    <button type='button' disabled={this.state.totalResults<1?true:false} className="btn btn-primary mx-2" onClick={this.changeNextPage}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News
