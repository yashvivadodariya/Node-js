const movie = require('../model/movie.model');
const fs = require('fs');
const path = require('path');

exports.index = async (req, res) => {
    try {
        const movies = await movie.find();
        return res.render('index', { movies });
    } catch (error) {
        console.log(error);
        return res.redirect('/');
    }
};

exports.addmovie = async (req, res) => {
    try {
        let imagePath = req.file ? `/uploads/${req.file.filename}` : '';

        await movie.create({
            ...req.body,
            movieImg: imagePath
        });

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
};


exports.editmovie = async (req, res) => {
    let movieData = await movie.findById(req.params.id);

    if (!movieData) {
        console.log("movie not found...");
        return res.redirect('/');
    }

    return res.render('edit', { movie: movieData });
};


exports.updatemovie = async (req, res) => {
    let movieData = await movie.findById(req.params.id);

    if (!movieData) {
        console.log('movie not found...');
        return res.redirect('/');
    }

    let imagepath;

    if (req.file) {
        if (movieData.movieImg != "") {
            let oldPath = path.join(__dirname, '..', movieData.movieImg);

            try {
                fs.unlinkSync(oldPath);
            } catch {
                console.log('file missing');
            }
        }

        imagepath = `/uploads/${req.file.filename}`;
    } else {
        imagepath = movieData.movieImg;
    }

    await movie.findByIdAndUpdate(
        movieData._id,
        { ...req.body, movieImg: imagepath }
    );

    res.redirect('/');
};

exports.deletemovie = async (req, res) => {
    let id = req.params.id;

    let movieData = await movie.findById(id);

    if (!movieData) {
        console.log("movie not found...");
        return res.redirect('/');
    }

    if (movieData.movieImg != "") {
        let imagePath = path.join(__dirname, "..", movieData.movieImg);

        try {
            fs.unlinkSync(imagePath);
        } catch {
            console.log('file missing');
        }
    }

    await movie.findByIdAndDelete(id);

    res.redirect('/');
};
