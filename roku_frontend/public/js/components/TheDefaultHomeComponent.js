export default {
    name: 'TheDefaultHomeComponent',

    props: ['user'],

    template: `
    <h1> The Default Home Component </h1>
    <!--  creating three button one for music, one for movies and one for tv shows -->
   <!-- load the content of the button when the user clicks on it --> 
        <div class="main_entertainment">

          <button class="btn_entertainment" @click="loaddefaultMovies">
            <ion-icon name="film-outline"></ion-icon>Movies</button>
          
          <button class="btn_entertainment" @click="loaddefaultMusic"> 
            <ion-icon name="musical-notes-outline"></ion-icon>Music</button>
          
          <button class="btn_entertainment" @click="loaddefaultTv">
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






<!-- music section -->

<section v-show="showMusic" class="movieskid music_container">
<ul class="moviekid album-covers">
    <li v-for="track in tracks" :key="track.id">
      <img class="layer" :src="track.album.cover[0].url" :alt="alb" @click="playTrack(track)">
        <h3 class="titlem">{{ track.name }}</h3>

          <!-- on hover show the artist name and release date -->
            <div class="movie_info"  @click="playTrack(track)">
                <p class="block">{{ track.album.name }}</p>
                    <ion-icon name="play-circle-outline" @click="playTrack(track)"></ion-icon>
            </div>
    </li>
</ul>
</section>


<!-- tv shows for adults -->
  
  <section v-show="showTv" class="movieskid tv_container">
    <div class="tvshows">
      <div class="movieskid">
          <ul class="moviekid">
              <li v-for="tvshow in tvshows" :key="tvshow.id">             
              <img class="layer" :src="tvshow.image" :alt="tvshow.title"  @click="playVideo2(tvshow)">
                <h3 class="titlem">{{ tvshow.title }}</h3>


                <!-- on hover show the year and rating -->
                    <div class="movie_info" @click="playVideo2(tvshow)">
                      <p class="block">{{ tvshow.title }}</p>
                      <p class="block">Year: {{ tvshow.description }}</p>
                      <p class="block">Rating: {{ tvshow.imDbRating }}</p>
                      <ion-icon name="play-circle-outline"  @click="playVideo2(tvshow)"></ion-icon>
                    </div>
              </li>
          </ul>
    </div>

        <!-- open the video when the user clicks on the image -->

                  <div class="video_container" v-show="showVideo2">
                      <div class="heading_video">
                    <h2 class="movtit">{{ selectedTvshow.title }}</h2>
                        <ion-icon name="close-circle-outline" @click="closeVideo2"></ion-icon>
                </div>
                <div class="main_video">
                  <div class="video">
                    <video :src="'video/trailor1.mp4'" width="600" height="300" muted controls></video>
                 </div>
              <div class="video_info">
                <p class="mainb"><h2 class="p1">Year:</h2> {{ selectedTvshow.description }}</p>
                <p class="mainb"><h2 class="p1">Runtime:</h2> {{ selectedTvshow.runtimeStr }}</p>
                <p class="mainb"><h2 class="p1">Genre:</h2>{{ selectedTvshow.genres }}</p>
                <p class="mainb"><h2 class="p1">Plot:</h2>{{ selectedTvshow.plot }}</p>
                <p class="mainb"><h2 class="p1">Stars:</h2> {{ selectedTvshow.stars }}</p>
                <p class="mainb"><h2 class="p1">Rating:</h2> {{ selectedTvshow.imDbRating }}</p>
              </div>
            </div>
          </div>
  </section>

















    `,

    data() {
        return {
            movies: [],
            showVideo: false,
            showVideo1: true,
            selectedMovie: {},
            tracks: [],
            showMusic: false,
            showTv: false,
            movies: [],
            showVideo: false,
            selectedMovie: {},
            selectedMusic: {},
            selectedTvshow: {},
            showMusic: false,
            showTv: false,
            showVideo1: true,
            track: {},
            shows: [],
            selectedShow: {},
            tvShows: [],
            tracks: [],
            selectedTrack: {},
            tvshows: [],
            selectedTvshow: {},
            // movie
            movie: {},
            // video2
            showVideo2: false,






            

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




        // Fetching data for Music
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '49deacfae9mshd388bca4199684fp190d57jsn9509a2f8f0f3',
                'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
            
            }
          };
      
          fetch('https://spotify-scraper.p.rapidapi.com/v1/search?term=jazz', options)
            .then(response => response.json())
            .then(data => {
              this.tracks = data.tracks.items.slice(0, 100);
            })
            .catch(err => console.error(err));


            // Fetching data for TV Shows
               // Fetching data for Kids Movies
      const requestOptions2 = {
        method: 'GET',
        redirect: 'follow'
      };
  
      fetch('https://imdb-api.com/API/AdvancedSearch/k_mb5kczkx?title_type=tv_series,tv_episode,tv_miniseries&release_date=1990-01-01,2000-01-01&certificates=us:G,us:PG,us:R,us:NC-17', requestOptions2)
        .then(response => response.json())
        .then(result => {
          this.tvshows = result['results'];
        })
        .catch(error => console.log('error', error));

    },


    methods : {

    // load the movies for kids
    loadKidsMovies() {
        this.showVideo1 = true;

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

      // making the button work
      
        // load the music
        loaddefaultMusic() {
            this.showMusic = true;
            this.showVideo1 = false;
            this.showTv = false;
            console.log ( "music is loaded ");
        },

        // load the tv shows
        loaddefaultTv() {
            this.showTv = true;
            this.showVideo1 = false;
            this.showMusic = false;
            console.log ( "tv shows are loaded ");
        
        },

        // for tv shows
        playVideo2(tvshow) {
            this.selectedTvshow = tvshow;
            this.showVideo2 = true;
            console.log ( "video box is open ");
            },

            closeVideo2() {
                this.showVideo2 = false;
                // pause the video when the user closes the video bo
                console.log ( "video box is closed ");
            },

        // load the movies
        loaddefaultMovies() {
            this.showVideo1 = true;
            this.showMusic = false;
            this.showTv = false;
            this,showVideo2 = false;
            console.log ( "movies are loaded ");
        },

        playTrack(track) {
            this.selectedTrack = track;
            this.showMusic = true;
            console.log ( "music box is open ");
        }




       
}

}

