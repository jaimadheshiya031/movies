import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from 'axios';

export default class Movies extends Component {
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currpage:1,
            movies:[],
            favourite:JSON.parse(localStorage.getItem('movies')) || []
        }
    }
    async componentDidMount(){
      //side effect
      const res= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=f4dc60cc34d9e622e5fcef3085a09d2c&language=us-en&page=${this.state.currpage}`)
      const data=res.data;
      this.setState({movies:[...data.results]});
      console.log(data);
      console.log('mounting done');
    }
    changeMoviesNxt=async ()=> {
      const res= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=f4dc60cc34d9e622e5fcef3085a09d2c&language=us-en&page=${this.state.currpage+1}`)
      this.setState({movies:[...res.data.results]});
      if(this.state.parr.length==this.state.currpage){
      this.setState({parr:[...this.state.parr,this.state.currpage+1]})
      }

      this.setState({currpage:this.state.currpage+1})
    }
    changeMoviesPrev=async ()=> {
      if(this.state.currpage!=1){
      const res= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=f4dc60cc34d9e622e5fcef3085a09d2c&language=us-en&page=${this.state.currpage-1}`)
      this.setState({movies:[...res.data.results]});
      this.setState({currpage:this.state.currpage-1});
      }
    }
    gotoThisPage= async(value)=>{
      const res= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=f4dc60cc34d9e622e5fcef3085a09d2c&language=us-en&page=${value}`)
      this.setState({movies:[...res.data.results]});
      this.setState({currpage:value})
    }
    handleFavourite=(movie)=>{
      let oldData=JSON.parse(localStorage.getItem('movies')) || [];
      if(!this.state.favourite.some(e=>e.id==movie.id)){
        oldData.push(movie);
        localStorage.setItem('movies',JSON.stringify(oldData));
           this.setState({
            favourite:[...oldData]
           })
      }
      else{
        oldData=oldData.filter((m)=>{
          return m.id!=movie.id
        })
        localStorage.setItem('movies',JSON.stringify(oldData));
        this.setState({
          favourite:[...oldData]
         })
      }
      console.log(oldData);
    }
  render() {
    console.log('render');
    let moviess=[...this.state.movies];
    return (
      <>
        {
        moviess.length === 0 ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {moviess.map((movie) => {
                return (
                  <div className="card movies-card" onMouseEnter={()=>this.setState({hover:movie.id})} onMouseLeave={()=>this.setState({hover:''})}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                      //   style={{ width: "20vw", height: "40vh" }}
                      className="card-img-top movies-img"
                    />
                    <h5 className="card-title movies-title">
                      {(movie.original_title || movie.original_name)}
                    </h5>
                    {/* <p className="card-text banner-text">{movie.overview}</p> */}
                    <div
                      className="button-wrapper movies-button"
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                    {
                       this.state.hover==movie.id &&  <a class="btn btn-primary" onClick={()=>this.handleFavourite(movie)}>{this.state.favourite.some(e=>e.id==movie.id)?"Remove from favourites":"Add to favourites"}</a>
                    }
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div style={{display:'flex',justifyContent:'center'}}>
        <nav aria-label="Page navigation example">
           <ul class="pagination">
           <li class="page-item"><a class="page-link" onClick={this.changeMoviesPrev}>Previous</a></li>
            {
                 this.state.parr.map((page)=>{
                  return (
                  page==this.state.currpage? 
                  (<li class="page-item" style={{textDecoration:'underline',color:'white',fontWeight:'bold'}}><a class="page-link" onClick={()=>this.gotoThisPage(page)}>{page}</a></li>)
                  :
                  (<li class="page-item" ><a class="page-link" onClick={()=>this.gotoThisPage(page)}>{page}</a></li>)                
                  )
                 }) 
    
            }
            <li class="page-item"><a class="page-link" onClick={this.changeMoviesNxt}>Next</a></li>
            </ul>
        </nav>
        </div>
      </>
    );
  }
}
