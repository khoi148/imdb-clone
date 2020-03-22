export function sortByMethod(sortBy, movieList) {
  let sortedArray;
  //I use concat to make a copy, before sorting. This makes sure original is untouched
  //And is a work around to make sure the setState actually notices a change,rerenders
  if (sortBy === "most_popular")
    sortedArray = movieList.concat().sort((item1, item2) => {
      return item2.popularity - item1.popularity;
    });
  else if (sortBy === "least_popular")
    sortedArray = movieList.concat().sort((item1, item2) => {
      return item1.popularity - item2.popularity;
    });
  else if (sortBy === "highest_rated")
    sortedArray = movieList.concat().sort((item1, item2) => {
      return item2.vote_average - item1.vote_average;
    });
  else if (sortBy === "lowest_rated")
    sortedArray = movieList.concat().sort((item1, item2) => {
      return item1.vote_average - item2.vote_average;
    });

  return sortedArray;
}
