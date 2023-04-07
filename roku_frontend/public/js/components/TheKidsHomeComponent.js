export default {
    name: 'TheKidsHomeComponent',

    template: `

    <div>
    <h1>This is the Kid's homepage</h1>
    <p>This is where the kids can watch their favourite movies and tv shows</p>
    <ul class="moviekid">
      <li v-for="movie in movies" :key="movie.id">
        <img :src="movie.image" :alt="movie.title" @click="playVideo(movie)">
        <h3>{{ movie.title }}</h3>
        <p>Year: {{ movie.year }}</p>
        <p>Rating: {{ movie.imDbRating }}</p>
      </li>
    </ul>
    <div v-show="showVideo" class="video-container">
      <video :src="selectedMovie.video" controls autoplay></video>
      <h2>{{ selectedMovie.title }}</h2>
      <p>Year: {{ selectedMovie.year }}</p>
      <p>Rating: {{ selectedMovie.imDbRating }}</p>
      <button @click="showVideo = false">Close</button>
    </div>
  </div>


  

    `,

    data() {
        return {
          movies: [],
          showVideo: false,
          selectedMovie: {}
        };

        

    },

    // write js code here

    // create a method that will fetch the data from the api

  
    created() {
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '6325459dcfmsh01df99951fe2399p15d8ccjsndfd3ff8f51b2',
              'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
          };
      
          var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
      
          fetch('https://imdb-api.com/en/API/Keyword/k_484b899g/children', requestOptions)
            .then(response => response.json())
            .then(result => {
              this.movies = result.items;
            })
            .catch(error => console.log('error', error));

            
        },

        methods: {
            playVideo(movie) {
                // set the selected movie and show the video container
                this.selectedMovie = movie;
                this.showVideo = true;
              }


              
            }
          
        }
        