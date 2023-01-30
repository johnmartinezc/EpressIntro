const express = require('express')

		const app = express()
		const port = 3000

		app.use(express.json()) // This line is necessary for Express to be able to parse JSON in request body's

		const favoriteMovieList = [{
			title: "Star Wars",
			starRating: 5,
			isRecommended: true,
			createdAt: new Date(),
			lastModified: new Date()
		}, {
			title: "The Avengers",
			starRating: 4,
			isRecommended: true,
			createdAt: new Date(),
			lastModified: new Date()
		}];

		app.get('/', (req, res) => {
			res.send('Hello World!')
		})

        app.get('/all-movies',(req, res)=>{
            res.json({
                success: true,
                favoriteMovieList: favoriteMovieList
            })
        })

        
        app.get("/single-movie/:title", (req, res)=>{
            const titleName = favoriteMovieList.find((titles)=>{
                return titles.title === req.params.title
            })
            
            res.json({
                success: true,
                favoriteMovieList: titleName
            })
        })


        app.post("/new-movie", (req, res)=>{
            const newMovie = {}
                newMovie.title = req.body.title
                newMovie.starRating = req.body.starRating
                newMovie.isRecommended = req.body.isRecommended
                newMovie.createdAt = new Date()
                newMovie.lastModified = new Date()
            
                 favoriteMovieList.push(newMovie)
        
            res.json({
                success: true
        
          })
          })

          app.put('/updated-movie/:title',(req, res)=>{

            const movieNameToFind = req.params.title
        
            const originalMovie = favoriteMovieList.find((movie)=>{
                return movie.title === movieNameToFind
            })
            const originalmovieIndex = favoriteMovieList.findIndex((movie)=>{
                return movie.title === movieNameToFind
            })
        
            const updatedMovie = {}
        
            if (req.body.title !== undefined){
                updatedMovie.title = req.body.title
            } else {
                updatedMovie.title = originalMovie.title
            }
        
            if (req.body.starRating !== undefined){
                updatedMovie.starRating = req.body.starRating
            } else {
                updatedMovie.starRating = originalMovie.starRating
            }
        
            if (req.body.isRecommended !== undefined){
                updatedMovie.isRecommended = req.body.isRecommended
            } else {
                updatedMovie.isRecommended = originalMovie.isRecommended
            }
        
            updatedMovie.createdAt = new Date()
            updatedMovie.lastModified = new Date()
        
            favoriteMovieList[originalmovieIndex] = updatedMovie
            res.json({
                success: true
            })
          })
        
          app.delete("/delete-movie/:name", (req, res)=>{
        
            const movieNameToDelete = req.params.title
        
            const indexOfMovie = favoriteMovieList.findIndex((movie)=>{
                return movie.title === movieNameToDelete
            })
        
            favoriteMovieList.splice(indexOfMovie, 1)
        
            res.json({
                success: true
            })
        })

		app.listen(port, () => {
			console.log(`Example app listening on port ${port}`)
		})