import React from "react";
import { Text, View } from "react-native";
import { useMovie } from "../../hooks/useMovie";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PosterCarousel } from "../../components/movies/PosterCarousel";
import { HorizontalCarousel } from "../../components/movies/HorizontalCarousel";

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const { isLoading, nowPlaying, popular, topRated, upcoming,popularNextPage } = useMovie();

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return (
    <ScrollView>
      <View style={{ marginTop: top + 20, paddingBottom: 30 }}>
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} />
        {/* populares */}
        <HorizontalCarousel movies={popular} title="Populares" loadNextPage={popularNextPage}/>
        {/* Top Rated */}
        <HorizontalCarousel movies={topRated} title="Mejor Valoradas" />
        {/* Proximamente */}
        <HorizontalCarousel movies={upcoming} title="Proximamente" />
      </View>
    </ScrollView>
  );
};
