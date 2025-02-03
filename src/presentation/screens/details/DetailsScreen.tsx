import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { RootStackParams } from "../../navigation/Navigation";
import { useMovies } from "../../hooks/useMovies";
import { MovieHeader } from "../../components/movie/MovieHeader";
import { MovieDetails } from "../../components/movie/MovieDetails";
import { ScrollView } from "react-native-gesture-handler";
import { FullScreenLoader } from "../../components/loaders/FullScreenLoader";

interface Props extends StackScreenProps<RootStackParams,'Details'>{};

export const DetailsScreen = ({route}:Props) => {

  const {movieId} = route.params;
  const {isLoading,movie,cast}= useMovies(movieId);

   if (isLoading) {
      return <FullScreenLoader/>
    }
  

  return (
    <ScrollView>
      {/* Header */}
      <MovieHeader originalTitle={movie!.originalTitle} title={movie!.title} poster={movie!.poster}/>

      {/* Details */}
      <MovieDetails movie={movie!} cast={cast!} />
    </ScrollView>
  );
};
