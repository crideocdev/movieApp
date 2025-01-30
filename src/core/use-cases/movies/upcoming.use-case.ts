import { HttpAdapter } from "../../../config/adapters/http/http.adapters";
import { MovieDBMovieResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mappers";
import type { Movie } from "../../entities/movie.entity";

export const moviesUpComingUseCase = async (
  fetcher: HttpAdapter
): Promise<Movie[]> => {
  try {
    const upcoming = await fetcher.get<MovieDBMovieResponse>("/upcoming");

    return upcoming.results.map((result) =>
      MovieMapper.fromMovieDBResultToEntity(result)
    );
  } catch (error) {
    throw new Error("Error fetching movies - UpComingUseCase");
  }
};
