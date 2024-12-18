import axios from "axios"

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjQwMThkNTNkY2YxZTRlYTQyOTBlY2Y5Mzg1OWE0MCIsIm5iZiI6MTcyODg5NjcwOS4wNDMyNDgsInN1YiI6IjY3MGNkNTNlNDExMWJlNGYwMjc1MDlhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Fu-lZGtRLhzuZx7qS-zqDQVSes6IiGsv8K6xwCO9ac'
      },

});

export default instance;