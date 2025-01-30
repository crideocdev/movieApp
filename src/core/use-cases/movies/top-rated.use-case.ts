import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieDBMovieResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mappers";
import type { Movie } from "../../entities/movie.entity";

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter
): Promise<Movie[]> => {
  try {
    const TopRated = await fetcher.get<MovieDBMovieResponse>("/top_rated");

    return TopRated.results.map((result) =>
      MovieMapper.fromMovieDBResultToEntity(result)
    );
  } catch (error) {
    throw new Error("Error fetching movies - TopRated");
  }
};
