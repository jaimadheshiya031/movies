import React, { Component } from 'react';
import axios from 'axios';
import {movies} from './getMovies';

export default class Banner extends Component {
  // constructor(){
  //   super();
  //   this.state={
  //     poster:''
  //   }
  // }
  // async componentDidMount(){
  //   const res= await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=f4dc60cc34d9e622e5fcef3085a09d2c&language=us-en&page=${this.state.currpage}`)
  //   const data=res.data;
  //   this.setState({
  //     poster:data.results[0]
  //   })
  // }
  render() {
    let movie= movies.results[0];
    return (
          <>
          {
             movie===''?
             <div className="spinner-border text-primary" role="status">
                 <span className="sr-only"></span>
             </div> 
             :
             <div className="card banner-card">
             <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}   alt={movie.title} className="card-img-top banner-img"/>
             <h1 className="card-title banner-title">{movie.original_title}</h1>
             <p className="card-text banner-text">{movie.overview}</p>
             </div>
           } 
          </>
    )
  }
}
