import React, { Component } from 'react';
// import {movies} from './getMovies';

let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' ,10765:'Suspense'};

export default class Favourite extends Component {
    constructor(){
        super();
        this.state={
          genres:[],
          currgen:'All Genre',
          favmovies:[],
          currtext:'',
          limit:5,
          currpage:1,
        } 
    }
    componentDidMount(){
        let data=JSON.parse(localStorage.getItem('movies')) || [];
        console.log(data);
        let temp=[];
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Genre');
        this.setState({
            genres:[...temp],
            favmovies:[...data] 
        })
    }
    handleGenreChange=(genre)=>{
         this.setState({
            currgen:genre,
            currpage:1
         })
    }
    sortPopularityDesc=()=>{
        let temp=[...this.state.favmovies];
        temp.sort((objA,objB)=>{
            return objB.popularity-objA.popularity
        })
        this.setState({
            favmovies:[...temp]
        })
    }
    sortPopularityAsc=()=>{
        let temp=[...this.state.favmovies];
        temp.sort((objA,objB)=>{
            return objA.popularity-objB.popularity
        })
        this.setState({
            favmovies:[...temp]
        })
    }
    sortRatingDesc=()=>{
        let temp=[...this.state.favmovies];
        temp.sort((objA,objB)=>{
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            favmovies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp=[...this.state.favmovies];
        temp.sort((objA,objB)=>{
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            favmovies:[...temp]
        })
    }
    // changeFavMoviesNxt=async (pages)=> {
    //     if(this.state.parr.length==this.state.currpage && pages>this.state.parr.length){
    //     this.setState({parr:[...this.state.parr,this.state.currpage+1]})
    //     }
    //     if(pages>this.state.parr.length)
    //     this.setState({currpage:this.state.currpage+1})
    //   }
    //   changeFavMoviesPrev=async ()=> {
    //     if(this.state.currpage!=1){
    //     this.setState({currpage:this.state.currpage-1});
    //     }
    //   }
      gotoThisPage=(value)=>{
        this.setState({currpage:value})
      }
      handleDelete=(movie)=>{
          let data=JSON.parse(localStorage.getItem('movies'));
          let temp=[];
          temp=data.filter((obj)=>{
            return obj.id!=movie.id
          })  
          localStorage.setItem('movies',JSON.stringify(temp))
          this.setState({
            favmovies:[...temp]
          })        
      }
  render() {
    let filtermovies=[];
    if(this.state.currtext!=''){
        
        filtermovies=this.state.favmovies.filter((m)=>{
            let title=m.original_title || m.original_name;
            title=title.toLowerCase();
            return title.includes(this.state.currtext.toLowerCase());
        })
    }
    else{
        filtermovies=[...this.state.favmovies];
    }
    if(this.state.currgen!='All Genre'){
        filtermovies=this.state.favmovies.filter((m)=>{
            return genreids[m.genre_ids[0]]==this.state.currgen
        })
    }
    
    let pages=Math.ceil(filtermovies.length/this.state.limit);
    let parr=[];
    for(let i=1;i<=pages;i++){
        parr.push(i);
    }
    let si=(this.state.currpage-1)*(this.state.limit);
    let li=Number(this.state.limit)+si;
    filtermovies=[...filtermovies.slice(si,li)];
    
    return (
      <>
        <div className='main'>
         <div className='row'>
           <div className='col-lg-3 col-sm-12'> 
                <ul class="list-group favourite-genres">
                    {
                        this.state.genres.map((genre)=>(
                                genre==this.state.currgen?
                                <li class="list-group-item" style={{backgroundColor:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li>
                                :
                                <li class="list-group-item" style={{backgroundColor:'white',color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                        ))
                    }
                </ul>
           </div>
           <div className='col-lg-9 favourite-table col-sm-12'>
                <div className='row'>
                    <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currtext} onChange={(e)=>{this.setState({currtext:e.target.value})}}></input>
                    <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>{this.setState({limit:e.target.value})}}></input>
                </div>
                <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col"><i class="fa fa-sort-up" onClick={()=>this.sortPopularityDesc()}/>Popularity<i class="fa fa-sort-down" onClick={this.sortPopularityAsc}/></th>
                            <th scope="col"><i class="fa fa-sort-up" onClick={()=>this.sortRatingDesc()}/>Rating<i class="fa fa-sort-down" onClick={this.sortRatingAsc}/></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filtermovies.map((movieobj)=>{
                                    return(
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.original_title} style={{width:'5rem'}}/>{movieobj.title || movieobj.name}</td>
                                            <td>{genreids[movieobj.genre_ids[0]]}</td>
                                            <td>{movieobj.popularity}</td>
                                            <td>{movieobj.vote_average}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieobj)}>Delete</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                </table>
                <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        {
                            parr.map((page)=>{
                                return page==this.state.currpage? 
                                (<li class="page-item" style={{textDecoration:'underline',color:'white',fontWeight:'bold'}}><a class="page-link" onClick={()=>this.gotoThisPage(page)}>{page}</a></li>)
                                :
                                (<li class="page-item" ><a class="page-link" onClick={()=>this.gotoThisPage(page)}>{page}</a></li>)
                            }) 
                        }
                        </ul>
                </nav>
           </div>
          </div>
        </div>
      </>
    )
  }
}
