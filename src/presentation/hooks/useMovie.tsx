import React, { useEffect, useState } from "react";
import { Movie } from "../../core/entities/movie.entity";

import * as UseCases from "../../core/use-cases";
import { movieDBFetcher } from "../../config/adapters/movieDB.adapter";

let popularPageNumber = 1;

export const useMovie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setNowPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpComing] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
    const popularPlayingPromise = UseCases.moviesPopularUseCase(movieDBFetcher);
    const topRatedPlayingPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher);
    const upComingPlayingPromise = UseCases.moviesUpComingUseCase(movieDBFetcher);

    const [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies] =
      await Promise.all([
        nowPlayingPromise,
        popularPlayingPromise,
        topRatedPlayingPromise,
        upComingPlayingPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setNowPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpComing(upcomingMovies);

    setIsLoading(false);
  };

  return { 
    isLoading, 
    nowPlaying, 
    popular,
    topRated, 
    upcoming,
    
    //Metodos
    popularNextPage: async() =>{
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher,{
        page:popularPageNumber,
      });
      setNowPopular(prev => [...prev, ...popularMovies]);
    }
  };
};
