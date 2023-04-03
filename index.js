  const filmsList = document.getElementById('movie-list');
      const movieDetails = document.getElementById('movie-details');
      const moviePoster = movieDetails.querySelector('img');
      const movieRuntime = movieDetails.querySelector('#movie-runtime');
      const movieShowtime = movieDetails.querySelector('#movie-showtime');
      const ticketsAvailable = movieDetails.querySelector('#tickets-available');
      
     
    // creating cards for each movie
    fetch('http://localhost:3000/films')
    .then(response => response.json())
    .then(movies => {
        renderMoviesList(movies);
        // Create a card for each movie and append to the container
        const filmsContainer = document.getElementById('films-container');
        movies.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('card');
            const img = document.createElement('img');
            img.src = movie.poster;
            img.alt = movie.title;


            const title = document.createElement('h2');
            title.textContent = movie.title;
            const runtime = document.createElement('p');
            const availableTickets = movie.capacity - movie.tickets_sold;
            runtime.textContent = `${movie.runtime} min`;
            const showtime = document.createElement('p');
            showtime.textContent = `Time: ${movie.showtime}  |  ${availableTickets} tickets available`;

            //   tickets.textContent = `${availableTickets} tickets available`;
            const buyTicketBtn = movieDetails.querySelector('#buy-ticket-btn');
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy Ticket';
            buyButton.addEventListener('click', () => {
              if (availableTickets > 0) {
                movies.tickets_sold++;
            
                fetch (`http://localhost:3000/films/${movie.id}`, {
                  method: `PATCH`,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({tickets_sold: movies.tickets_sold})
                })
                .then(response => response.json())
                .then(updateMovie =>{
                  const updateAvailableTickets = updateMovie.capacity - updateMovie.tickets_sold;
                  document.querySelector('#movie-tickets').textContent = `Available tickets: ${updateAvailableTickets}`;
                  movie.tickets_sold = updateMovie.tickets_sold;
                  if(updateAvailableTickets<=0){
                    alert("Ticket Sold out!")
                  }
                })
                .catch(error => console.error(error));
              }else{
                alert("Tickets out of stock!")
              }
            
              //buyTicketBtn(movie.id);
            });
            
            const cardContentDiv = document.createElement('div');
            cardContentDiv.classList.add('card-content')
            cardContentDiv.appendChild(title);
            cardContentDiv.appendChild(runtime);
            cardContentDiv.appendChild(showtime);
            cardContentDiv.appendChild(buyButton);

            card.appendChild(img);
            card.appendChild(cardContentDiv);

            filmsContainer.appendChild(card);
        });
    });


// Render the list of movies in the new container
function renderMoviesList(movies) {
    const movieListContainer = document.getElementById("movie-list");
    const movieList = document.createElement('ul');
    movieList.classList.add('movie-list');
  
    movies.forEach(movie => {
      const listItem = document.createElement('li');
      listItem.classList.add('movie-item');
      listItem.dataset.movieId = movie.id;
      listItem.innerHTML = `
        <div class="movie-item-details">
          <h2 class="movie-item-title">${movie.title}</h2>
          <p class="movie-item-runtime">${movie.runtime} min</p>
          <p class="movie-item-showtime">Time: ${movie.showtime}</p>
          <p class="movie-item-tickets">Tickets available: <span class="tickets-available">${movie.capacity - movie.tickets_sold}</span></p>
        </div>
      `;
    
      movieList.appendChild(listItem);
    });
  
    movieListContainer.appendChild(movieList);
  }
  






























      // Retrieve movie data from the server and update the UI
     /* function loadMovies() {
        fetch(' http://localhost:3000/films')
          .then(response => response.json())
          .then(movies => {
            // Update the films list
            filmsList.innerHTML = movies.map(movie => `
              <li class="film item" data-movie-id="${movie.id}">${movie.title}</li>
            `).join('');

            // Show the details of the first movie
            showMovieDetails(movies[0]);
          });
      }

      // Retrieve movie details from the server and update the UI
      /*function showMovieDetails(movie) {
        fetch(`http://localhost:3000/films/${movie.id}`)
          .then(response => response.json())
          .then(movie => {
            // Update the movie details
            moviePoster.src = movie.poster;
            movieRuntime.textContent = `${movie.runtime} min`;
            movieShowtime.textContent = movie.showtime;
      
            // Calculate the number of tickets available
            const ticketsSold = movie.tickets_sold;
            const capacity = movie.capacity;
            const ticketsAvailableCount = capacity - ticketsSold;
      
            // Update the tickets available count and button
            ticketsAvailable.textContent = ticketsAvailableCount;
            if (ticketsAvailableCount === 0) {
              buyTicketBtn.disabled = true;
              buyTicketBtn.textContent = 'Sold out';
            } else {
              buyTicketBtn.disabled = false;
              buyTicketBtn.textContent = 'Buy ticket';
            }
            
            // Update the tickets available count in the films list
            const filmItem = document.querySelector(`[data-movie-id="${movie.id}"]`);
            if (filmItem) {
              const ticketsAvailable = filmItem.querySelector('.tickets-available');
              ticketsAvailable.textContent = ticketsAvailableCount;
            }
          });
      }
      

      // Handle the click event on the films list
      filmsList.addEventListener('click', event => {
        const movieId = event.target.dataset.movieId;
        if (movieId) {
          fetch(` http://localhost:3000/films/${movieId}`)
            .then(response => response.json())
            .then(movie => {
              showMovieDetails(movie);
            });
        }
      });

      // Handle the click event on the buy ticket button
      async function buyTicket(movieId, numTickets) {
        const response = await fetch(`http://localhost:3000/films/${movieId}/buy`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ numTickets })
        });
      
        const movie = await response.json();
        showMovieDetails(movie);
      }

      const buyTicketBtn = movieDetails.querySelector('#buy-ticket-btn');

      function buyTicket(movieId) {
        const numTickets = 1; // You can customize this if you want to allow buying multiple tickets at once
        fetch(`http://localhost:3000/films/${movieId}/buy`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ numTickets })
        })
        .then(response => response.json())
        .then(movie => {
          showMovieDetails(movie);
        })
        .catch(error => {
          console.error('Error buying ticket:', error);
        });
      }
      
   

   
      */