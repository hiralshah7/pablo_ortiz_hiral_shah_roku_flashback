export default {
    name: 'TheDefaultHomeComponent',

    props: ['user'],

    template: `
    <h1> The Default Home Component </h1>
    <!--  creating three button one for music, one for movies and one for tv shows -->
   <!-- load the content of the button when the user clicks on it --> 
        <div class="main_entertainment">

          <button class="btn_entertainment" @click="loadKidsMovies">
            <ion-icon name="film-outline"></ion-icon>Movies</button>
          
          <button class="btn_entertainment" @click="loadKidsMusic"> 
            <ion-icon name="musical-notes-outline"></ion-icon>Music</button>
          
          <button class="btn_entertainment" @click="loadKidsTv">
          <ion-icon name="tv-outline"></ion-icon>Tv Shows</button>
        </div>

        <!-- movies for kids -->

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
        <div class="heading_video">
          <h2 class="movtit">{{ selectedMovie.title }}</h2>
            <ion-icon name="close-circle-outline" @click="closeVideo"></ion-icon>
      </div>
      
      <div class="main_video">
        <div class="video">
          <video :src="'video/trailor1.mp4'" width="600" height="300" muted controls></video>
      </div>

    <div class="video_info">
      <p class="mainb">
        <h2 class="p1">Year:</h2> {{ selectedMovie.description }}</p>
          <p class="mainb">
            <h2 class="p1">Runtime:</h2> {{ selectedMovie.runtimeStr }}</h2>
              <p class="mainb"><h2 class="p1">Genre:</h2>{{ selectedMovie.genres }}</p>
              <p class="mainb"><h2 class="p1">Plot:</h2>{{ selectedMovie.plot }}</p>
              <p class="mainb"><h2 class="p1">Stars:</h2> {{ selectedMovie.stars }}</p>
              <p class="mainb"><h2 class="p1">Rating:</h2> {{ selectedMovie.imDbRating }}</p>
      </p>
    </div>
  </div>
</div>
</section>

    `,

    data() {
        return {
            movies: [],
            // show the video when the user clicks on the image
            showVideo: false,
            // show the video when the user clicks on the image
            showVideo1: false,
            showVideo2: false,
            showVideo3: false,
            selectedMovie: {},
            

        }

    },





    created() {

         // Fetching data for Kids Movies
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch(' https://imdb-api.com/API/AdvancedSearch/k_mb5kczkx?title_type=tv_movie', requestOptions)
        .then(response => response.json())
        .then(result => {
          this.movies = result['results'];
        })
        .catch(error => console.log('error', error));
            
    },



methods : {

    // load the movies for kids
    loadKidsMovies() {
        this.showVideo1 = true;
        this.showVideo2 = false;
        this.showVideo3 = false;

    },

    playVideo(movie) {
        this.selectedMovie = movie;
        this.showVideo = true;
        
        console.log ( "video box is open ");
      },

      
      closeVideo() {
        this.showVideo = false;
        // pause the video when the user closes the video box

        console.log ( "video box is closed ");


      },

}

}

