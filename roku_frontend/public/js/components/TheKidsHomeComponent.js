export default {
    name: 'TheKidsHomeComponent',

    template: `


<!-- movies for kids -->

   <!--  creating three button one for music, one for movies and one for tv shows -->
   <!-- load the content of the button when the user clicks on it --> 
        <div class="main_entertainment">
        <!-- welcome message with the user name -->
          <button class="btn_entertainment" @click="loadKidsMovies">
          <!-- ion icon for movies -->
          <ion-icon name="film-outline"></ion-icon>
          Movies</button>
          <button class="btn_entertainment" @click="loadKidsMusic">
          <!-- ion icon for music -->
          <ion-icon name="musical-notes-outline"></ion-icon>
          Music</button>
          <button class="btn_entertainment" @click="loadKidsTv">
          <!-- ion icon for tv shows -->
          <ion-icon name="tv-outline"></ion-icon>
          Tv Shows</button>
        </div>

    <section class="movie_container" v-show="showVideo1">
    <div class="movieskid">
      <ul class="moviekid">
        <li v-for="movie in movies" :key="movie.id">
          <img class="layer" :src="movie.image" :alt="movie.title" @click="playVideo(movie)">
          <h3 class="titlem">{{ movie.title }}</h3>
          <!-- on hover show the year and rating -->
        <div class="movie_info"  @click="playVideo(movie)">
     
          <p class="block">{{ movie.title }}<p>
          <p class="block">Year: {{ movie.description }}</p>
          <p class="block">Rating: {{ movie.imDbRating }}</p>
          <ion-icon name="play-circle-outline" @click="playVideo(movie)"></ion-icon>
        
        </div>
        </li>
      </ul>
    </div>
      <!-- open the video when the user clicks on the image -->

      <div class="video_container" v-show="showVideo">

      <!-- linking video from the public folder -->
    <div class="heading_video">
      <h2 class="movtit">{{ selectedMovie.title }}</h2>
      <!-- ion icon for close -->
      <!-- close button -->
      <ion-icon name="close-circle-outline" @click="closeVideo"></ion-icon>
    </div>
  


  <div class="main_video">
    <div class="video">
      <video :src="'video/trailor1.mp4'" width="600" height="300" muted controls></video>
    </div>

    <div class="video_info">
              <!-- year -->
              <p class="mainb">
              <h2 class="p1">Year:</h2> {{ selectedMovie.description }}</p>
              <!-- runtime -->
              <p class="mainb">
              <h2 class="p1">Runtime:</h2> {{ selectedMovie.runtimeStr }}</p>
              <!-- genre -->
              <p class="mainb"><h2 class="p1">Genre:</h2>{{ selectedMovie.genres }}</p>
              <!-- plot -->
              <p class="mainb"> <h2 class="p1">Plot:</h2>{{ selectedMovie.plot }}</p>
              <!-- stars -->
              <p class="mainb"> <h2 class="p1">Stars:</h2> {{ selectedMovie.stars }}</p>
              <!-- rating -->
              <p class="mainb"> <h2 class="p1">Rating:</h2> {{ selectedMovie.imDbRating }}</p>
    </div>
  </div>
</div>
  </section>

  





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
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch('https://imdb-api.com/API/AdvancedSearch/k_mb5kczkx?title_type=feature,tv_movie,video&genres=animation,comedy&colors=color', requestOptions)
        .then(response => response.json())
        .then(result => {
          this.movies = result['results'];
        })
        .catch(error => console.log('error', error));
    },


       

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
      },

      closeVideo() {
        this.showVideo = false;
        // pause the video when the user closes the video box

        console.log ( "video box is closed ");


      }


    }
  };