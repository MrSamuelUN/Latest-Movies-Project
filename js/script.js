const global = {
  currentPage: window.location.pathname,
};

// Display movie-details
async function displayMovieDetails() {
  const movieId = window.location.search.split("=")[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  // Overlay for background image
  displayBackgroundImage("movie", movie.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />`
                : `<img
            src="./images/no-image.jpg"
            class="card-img-top"
            alt="Movie Title"
          />`
            }
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${Math.floor(movie.vote_average)} / 10
            </p>
            <p class="text-muted">Release Date:${movie.release_date}</p>
            <p>${movie.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">${movie.genres
              .map((genre) => {
                return `<li>${genre.name}</li>`;
              })
              .join("")}</ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommas(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommas(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => {
              return `<li>${company.name}</li>`;
            })
            .join("")}</div>
        </div>`;

  document.querySelector("#movie-details").appendChild(div);
}

// displayMovieDetails End

// Display tvdetails
async function displayTvDetails() {
  const movieId = window.location.search.split("=")[1];
  console.log(movieId);

  const tv = await fetchAPIData(`tv/${movieId}`);
  console.log(tv);

  // Overlay for background image
  displayBackgroundImage("tv", tv.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
        <div>
          ${
            tv.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
            class="card-img-top"
            alt="Movie Title"
          />`
              : `<img
          src="./images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
          }
        </div>
        <div>
          <h2>${tv.name}</h2>
          <p>
            <i class="fas fa-star text-primary"></i>
            ${Math.floor(tv.vote_average)} / 10
          </p>
          <p class="text-muted">Release Date:${tv.first_air_date}</p>
          <p>${tv.overview}</p>
          <h5>Genres</h5>
          <ul class="list-group">${tv.genres
            .map((genre) => {
              return `<li>${genre.name}</li>`;
            })
            .join("")}</ul>
          <a href="${
            tv.homepage
          }" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
      </div>
      <div class="details-bottom">
        <h2>Movie Info</h2>
        /* <ul>
        //   <li><span class="text-secondary">Budget:</span> $${tv.budget}</li>
        //   <li><span class="text-secondary">Revenue:</span> $${
          tv.revenue
        }</li>
        //   <li><span class="text-secondary">Runtime:</span> ${
          tv.runtime
        } minutes</li>
          // <li><span class="text-secondary">Status:</span> ${tv.status}</li>*/
        // </ul>
        <h4>Production Companies</h4>
        <div class="list-group">${tv.production_companies
          .map((company) => {
            return `<li>${company.name}</li>`;
          })
          .join("")}</div>
      </div>`;

  document.querySelector("#show-details").appendChild(div);
}

// Display TvShows Start
async function displayTvShows() {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((tvShows) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
              <a href="tv-details.html?id=${tvShows.id}">
               ${
                 tvShows.poster_path
                   ? `<img
                src="https://image.tmdb.org/t/p/w500${tvShows.poster_path}"
                class="card-img-top"
                alt="${tvShows.name}"
              />`
                   : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt=""
            />`
               }
              </a>
              <div class="card-body">
                <h5 class="card-title">${tvShows.original_name}</h5>
                <p class="card-text">
                  <small class="text-muted">Air date:${
                    tvShows.first_air_date
                  }</small>
                </p>
              </div>
            `;
    document.querySelector("#popular-shows").appendChild(div);
  });
}
// Display TVshows End

// DisplaypopularMovies
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
           ${
             movie.poster_path
               ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
               : `<img
          src="images/no-image.jpg"
          class="card-img-top"
          alt=""
        />`
           }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release:${movie.release_date}</small>
            </p>
          </div>
        `;
    document.querySelector("#popular-movies").appendChild(div);
  });
}
// DisplayPopularMovies End

// Display Backdrop on details Pages
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath}`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repeat";
  overlayDiv.style.height = "100hv";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    console.log("correct");

    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
}
// displaySlider
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML = ` 
              <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="Movie Title" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${Math.floor(movie.vote_average)} / 10
            </h4>`;

            document.querySelector('.swiper-wrapper').appendChild(div)
            initSwiper()
  });
}
function initSwiper(){
  const swiper = new Swiper('.swiper',{
    slidesPerview:2,
    spaceBetween:30,
    freeMode:true,
    loop:true,
    autoplay:{
      delay:4000,
      disableOnIteraction:false
    },
    breakpoints:{
      320:{
        slidesPerview:2,
        spaceBetween:20
      },
      480:{
        slidesPerview:3,
        spaceBetween:30
      },
      640:{
        slidesPerview:4,
        spaceBetween:40
      },
    }
  })
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = "172a247d96d88f0864a58f5b3063556e";
  const API_URL = "//api.themoviedb.org/3/";
  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner();
  return data;
}
// Fetch data from TMDB API

// Spiner Start
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}
// Spiner End

// highlightActiveLinks
function highlightActiveLinks() {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
}
// highlightActiveLinks Ends

// App Init

function appInit() {
  switch (global.currentPage) {
    case "/":
    case ".index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayTvShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTvDetails();
      break;
    case "/search.html":
      console.log("search");
      break;
  }
  highlightActiveLinks();
}
document.addEventListener("DOMContentLoaded", appInit);
// Appinit End

// Add commos to number
function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
