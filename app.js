/* Autorisation pour l'API */

const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2EyY2Q0MmViNzg5MTlhMjllMDdkYTgxMWUwZDU5NyIsInN1YiI6IjY2NzAyMGUyOTljMWIyYWUyY2VjMWUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yMSlxaaj4xZn006bMxogQzHNnwXJgcQEUupKHhWzwVw'
    }
};

fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

/* Swiper & paramètres */
    var swiper = new Swiper(".mySwiperResult", {
        slidesPerView: 4,
        spaceBetween: 10,
        grabCursor: true,
        loop: true,
        navigation: {
            nextEl: '.resultButtonWrapper .swiper-button-next',
            prevEl: '.resultButtonWrapper .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            940: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1820: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
    });

swiper.enable();

    /* Swiper 2 & paramètres */
    var swiper2 = new Swiper(".mySwiperLatest", {
        slidesPerView: 4,
        spaceBetween: 10,
        grabCursor: true,
        loop: true,
        navigation: {
            nextEl: '.latestButtonWrapper .swiper-button-next',
            prevEl: '.latestButtonWrapper .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            940: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1820: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
    });

    swiper2.enable();

    /* Swiper 3 & paramètres */
    var swiper3 = new Swiper(".mySwiperGenres", {
        slidesPerView: 4,
        spaceBetween: 18,
        grabCursor: true,
        loop: true,
        navigation: {
            nextEl: '.genresButtonWrapper .swiper-button-next',
            prevEl: '.genresButtonWrapper .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            940: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1820: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
    });

    swiper3.enable();

/* Début du programme */

/* Programme search */
const search = (e) =>{
    e.preventDefault();
    let inputValue = document.getElementById("search").value;

    fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(data =>{
        const swiperSearch = document.getElementById("search-results")
        swiperSearch.innerHTML = "";
        const msg = document.getElementById("msg");

        if(data.total_results === 0){
            msg.innerText = `No result found for "${inputValue}"`
            msg.style.color = "rgb(204, 0, 0)";
            result.style.display = "flex";
            } else {
                msg.style.color = "white";
                const result = document.getElementById("result")
                result.style.display = "flex";
                msg.innerText = `Results for "${inputValue}"`
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    console.log(movie.poster_path)
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);

                    swiper.enable();
                })
            }
    })
    .catch(err => console.error(err));
}

const form = document.getElementById("form");
form.addEventListener("submit", search);


/* Programme latest releases */

const latest = (e) =>{
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=primary_release_date.desc&vote_average.gte=7`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("latest-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

latest();

/* Donnée IDs genres */

fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

// Comedy = 35
// Drame = 18
// Action = 28
// Romance = 10749
// Fantasy = 14
// Animation = 16

/* Programme comedy movies on load */

const onload = () =>{
    window.addEventListener("load", (event) =>{
        const comedy = document.getElementById("comedy");
        const msg = document.getElementById("msgLi");
        const liValue = comedy.innerHTML;
        msg.innerHTML = liValue;
        comedy.style.backgroundColor = "rgb(204, 0, 0)";

        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=35`, options)
        .then(response => response.json())
        .then(data =>{
            console.log(data);
                    const swiperSearch = document.getElementById("genres-results")
                    swiperSearch.innerHTML = "";
                    console.log(data);
                    console.log(data.results)
    
                    data.results.map(movie =>{
                        const moviePic = document.createElement("div");
                        moviePic.classList.add("swiper-slide");
                        moviePic.setAttribute("style", "width: 349.25px");
                        moviePic.setAttribute("style", "height:381.88px");
                        let path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                        movie.poster_path !== null 
                        ? path = `
                            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                        `
                        : path = `
                        <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                    `
                        moviePic.innerHTML = path;
                        swiperSearch.appendChild(moviePic);
                    })
        })
        .catch(err => console.error(err));
    })}

onload();

/* Programme movies by genre */

const comedyClick = (e) =>{
    const comedy = document.getElementById("comedy");
    const msg = document.getElementById("msgLi");
    const liValue = comedy.innerHTML;
    msg.innerHTML = liValue;
    document.getElementById("animation").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("drame").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("action").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("romance").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("fantasy").style.backgroundColor = "rgb(25, 27, 32)";
    comedy.style.backgroundColor = "rgb(204, 0, 0)";

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=35`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("genres-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

const drameClick = (e) =>{
    const drame = document.getElementById("drame");
    const msg = document.getElementById("msgLi");
    const liValue = drame.innerHTML;
    msg.innerHTML = liValue;
    document.getElementById("comedy").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("animation").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("action").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("romance").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("fantasy").style.backgroundColor = "rgb(25, 27, 32)";
    drame.style.backgroundColor = "rgb(204, 0, 0)";

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=18`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("genres-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

const actionClick = (e) =>{
    const action = document.getElementById("action");
    const msg = document.getElementById("msgLi");
    const liValue = action.innerHTML;
    msg.innerHTML = liValue;
    document.getElementById("comedy").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("drame").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("animation").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("romance").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("fantasy").style.backgroundColor = "rgb(25, 27, 32)";
    action.style.backgroundColor = "rgb(204, 0, 0)";

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=28`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("genres-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

const romanceClick = (e) =>{
    const romance = document.getElementById("romance");
    const msg = document.getElementById("msgLi");
    const liValue = romance.innerHTML;
    msg.innerHTML = liValue;
    document.getElementById("comedy").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("drame").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("action").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("animation").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("fantasy").style.backgroundColor = "rgb(25, 27, 32)";
    romance.style.backgroundColor = "rgb(204, 0, 0)";

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=10749`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("genres-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

const fantasyClick = (e) =>{
    const fantasy = document.getElementById("fantasy");
    const msg = document.getElementById("msgLi");
    const liValue = fantasy.innerHTML;
    msg.innerHTML = liValue;
    document.getElementById("comedy").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("drame").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("action").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("romance").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("animation").style.backgroundColor = "rgb(25, 27, 32)";
    fantasy.style.backgroundColor = "rgb(204, 0, 0)";

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=14`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("genres-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

const animationClick = (e) =>{
    const animation = document.getElementById("animation");
    const msg = document.getElementById("msgLi");
    const liValue = animation.innerHTML;
    msg.innerHTML = liValue;
    document.getElementById("comedy").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("drame").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("action").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("romance").style.backgroundColor = "rgb(25, 27, 32)";
    document.getElementById("fantasy").style.backgroundColor = "rgb(25, 27, 32)";
    animation.style.backgroundColor = "rgb(204, 0, 0)";

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc&with_genres=16`, options)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
                const swiperSearch = document.getElementById("genres-results")
                swiperSearch.innerHTML = "";
                console.log(data);
                console.log(data.results)

                data.results.map(movie =>{
                    const moviePic = document.createElement("div");
                    moviePic.classList.add("swiper-slide");
                    moviePic.setAttribute("style", "width: 349.25px");
                    moviePic.setAttribute("style", "height:381.88px");
                    let path = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                `
                    movie.poster_path !== null 
                    ? path = `
                        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Poster" class="movie-img">
                    `
                    : path = `
                    <img src="./images/noposter.jpg" alt="Poster" class="movie-img">
                `
                    moviePic.innerHTML = path;
                    swiperSearch.appendChild(moviePic);
                })
    })
    .catch(err => console.error(err));
}

document.getElementById("comedy").addEventListener("click", comedyClick);
document.getElementById("drame").addEventListener("click", drameClick);
document.getElementById("action").addEventListener("click", actionClick);
document.getElementById("romance").addEventListener("click", romanceClick);
document.getElementById("fantasy").addEventListener("click", fantasyClick);
document.getElementById("animation").addEventListener("click", animationClick);

/* Onclicks */

const popupRegLog = document.getElementById("popup");
const signup = document.getElementById("first");
const login = document.getElementById("second");

document.getElementById("regHeader").addEventListener("click", () =>{
    popupRegLog.style.transform = "translateX(-27.5%)";
    signup.style.backgroundColor = "rgb(204, 0, 0)";
    login.style.backgroundColor = "rgb(0, 0, 0)";
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.innerHTML = "";
    const popupLogin = document.createElement("div");
    popupLogin.classList.add("popupLogin");
    const loginContainer = `
            <form action="">
        <input type="text" id="username" placeholder="Username">
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input type="password" id="confirmPassword" placeholder="Confirm password">
        <br>
        <button type="submit" id="buttonLogin">REGISTER</button>
      </form>
    `
    popupLogin.innerHTML = loginContainer;
    popupContainer.appendChild(popupLogin);
})

document.getElementById("signHeader").addEventListener("click", () =>{
    popupRegLog.style.transform = "translateX(-27.5%)";
    login.style.backgroundColor = "rgb(204, 0, 0)";
    signup.style.backgroundColor = "rgb(0, 0, 0)";
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.innerHTML = "";
    const popupLogin = document.createElement("div");
    popupLogin.classList.add("popupLogin");
    const loginContainer = `
          <form action="">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <br>
        <input type="checkbox" id="remember">
        <label for="remember">Remember me</label>
        <br>
        <button type="submit" id="buttonLogin">LOGIN</button>
        <p id="forgot">I forgot my password</p>
        <p id="member">Not a member yet ? <span id="spanRegister">Sign up</span></p>
      </form>
    `
    popupLogin.innerHTML = loginContainer;
    popupContainer.appendChild(popupLogin);
})

document.getElementById("regFooter").addEventListener("click", () =>{
    popupRegLog.style.transform = "translateX(-27.5%)";
    signup.style.backgroundColor = "rgb(204, 0, 0)";
    login.style.backgroundColor = "rgb(0, 0, 0)";
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.innerHTML = "";
    const popupLogin = document.createElement("div");
    popupLogin.classList.add("popupLogin");
    const loginContainer = `
            <form action="">
        <input type="text" id="username" placeholder="Username">
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input type="password" id="confirmPassword" placeholder="Confirm password">
        <br>
        <button type="submit" id="buttonLogin">REGISTER</button>
      </form>
    `
    popupLogin.innerHTML = loginContainer;
    popupContainer.appendChild(popupLogin);
})

document.getElementById("signFooter").addEventListener("click", () =>{
    popupRegLog.style.transform = "translateX(-27.5%)";
    login.style.backgroundColor = "rgb(204, 0, 0)";
    signup.style.backgroundColor = "rgb(0, 0, 0)";
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.innerHTML = "";
    const popupLogin = document.createElement("div");
    popupLogin.classList.add("popupLogin");
    const loginContainer = `
          <form action="">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <br>
        <input type="checkbox" id="remember">
        <label for="remember">Remember me</label>
        <br>
        <button type="submit" id="buttonLogin">LOGIN</button>
        <p id="forgot">I forgot my password</p>
        <p id="member">Not a member yet ? <span id="spanRegister">Sign up</span></p>
      </form>
    `
    popupLogin.innerHTML = loginContainer;
    popupContainer.appendChild(popupLogin);
})

document.getElementById("popupClose").addEventListener("click", () =>{
    popupRegLog.style.transform = "translateX(350%)";
})

login.addEventListener("click", () =>{
    login.style.backgroundColor = "rgb(204, 0, 0)";
    signup.style.backgroundColor = "rgb(0, 0, 0)";
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.innerHTML = "";
    const popupLogin = document.createElement("div");
    popupLogin.classList.add("popupLogin");
    const loginContainer = `
          <form action="">
        <input type="text" id="username" placeholder="Username">
        <input type="password" id="password" placeholder="Password">
        <br>
        <input type="checkbox" id="remember">
        <label for="remember">Remember me</label>
        <br>
        <button type="submit" id="buttonLogin">LOGIN</button>
        <p id="forgot">I forgot my password</p>
        <p id="member">Not a member yet ? <span id="spanRegister">Sign up</span></p>
      </form>
    `
    popupLogin.innerHTML = loginContainer;
    popupContainer.appendChild(popupLogin);
})

signup.addEventListener("click", () =>{
    signup.style.backgroundColor = "rgb(204, 0, 0)";
    login.style.backgroundColor = "rgb(0, 0, 0)";
    const popupContainer = document.getElementById("popupContainer");
    popupContainer.innerHTML = "";
    const popupLogin = document.createElement("div");
    popupLogin.classList.add("popupLogin");
    const loginContainer = `
            <form action="">
        <input type="text" id="username" placeholder="Username">
        <input type="email" id="email" placeholder="Email">
        <input type="password" id="password" placeholder="Password">
        <input type="password" id="confirmPassword" placeholder="Confirm password">
        <br>
        <button type="submit" id="buttonLogin">REGISTER</button>
      </form>
    `
    popupLogin.innerHTML = loginContainer;
    popupContainer.appendChild(popupLogin);
})