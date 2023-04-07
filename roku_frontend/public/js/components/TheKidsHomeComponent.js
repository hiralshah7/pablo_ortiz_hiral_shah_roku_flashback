export default {
    name: 'TheKidsHomeComponent',

    template: `


<!-- movies for kids -->

   <!--  creating three button one for music, one for movies and one for tv shows -->
   <!-- load the content of the button when the user clicks on it --> 
        <div class="main_entertainment">
          <button class="btn_entertainment" @click="loadKidsMovies">Movies</button>
          <button class="btn_entertainment" @click="loadKidsMusic">Music</button>
          <button class="btn_entertainment" @click="loadKidsTv">Tv Shows</button>
        </div>

    <section class="movie_container" v-show="showVideo1">
      <ul class="moviekid">
        <li v-for="movie in movies" :key="movie.id">
          <img :src="movie.image" :alt="movie.title" @click="playVideo(movie)">
          <h3>{{ movie.title }}</h3>
          <p>Year: {{ movie.year }}</p>
          <p>Rating: {{ movie.imDbRating }}</p>
        </li>
      </ul>
      <!-- open the video when the user clicks on the image -->
      <div class="video_container" v-show="showVideo">
        <video :src="selectedMovie.video" controls autoplay></video>
        <h2>{{ selectedMovie.title }}</h2>
              <p>Year: {{ selectedMovie.year }}</p>
              <p>Rating: {{ selectedMovie.imDbRating }}</p>
        <button @click="showVideo = false">Close</button>
      </div>
  </section>

  <!-- music for kids -->
  <section v-show="showMusic" class="music_container">
      <h2 class="music_title">Music</h2>
  </section>


  <!-- tv shows for kids -->
  <section v-show="showTv" class="tv_container">
      <h2 class="tv_title">Tv Shows</h2>
  </section>




  

    `,

    data() {
        return {
          movies: [],
          showVideo: false,
          selectedMovie: {},
          selectedMusic: {},
          selectedTvshow: {},
          showMusic: false,
          showTv: false,
          showVideo1: true,



        };

        

    },

    created() {
      // Fetching data for Kids Movies
      const movieOptions = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "6325459dcfmsh01df99951fe2399p15d8ccjsndfd3ff8f51b2",
          "X-RapidAPI-Host": "imdb-api.com"
        }
      };
  
      fetch(
        "https://imdb-api.com/en/API/Keyword/k_484b899g/children",
        movieOptions
      )
        .then(response => response.json())
        .then(result => {
          this.movies = result.items;
        })
        .catch(error => console.log("error", error));
  
    },

    // fetch data for kids music


    // fetch data for kids tv shows



    methods: {
      playVideo(movie) {
        this.selectedMovie = movie;
        this.showVideo = true;
        console.log ( "video box is open ");
      },
      playMusic(music) {
        this.selectedMusic = music;
        this.showMusic = true;
        console.log ( "music box is open ");
      },

      loadKidsMovies() {
        this.showVideo1 = true;
        this.showMusic = false;
        this.showTv = false;
        console.log ( "movies are loaded ");
      },

      loadKidsMusic() {
        this.showVideo1 = false;
        this.showMusic = true;
        this.showTv = false;

        console.log ( "music is loaded ");
      },

      loadKidsTv() {
        this.showVideo1 = false;
        this.showMusic = false;
        this.showTv = true;
        console.log ( "tv shows are loaded ");
      }

    }
  };