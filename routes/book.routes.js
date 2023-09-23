const express = require('express')
const bookRoutes = express.Router()
const Book = require('../model/book.model')

// post book
bookRoutes.post('/', async(req,res) => {
    try {
        let newBook = new Book(req.body)
        let savedBook = await newBook.save()
        res.status(201).json(savedBook)
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// retreive all books 
//- The user should be able to filter the books based on genre, and the functionality should be implemented using backend APIs.
//- The user should be able to sort the books based on price.

bookRoutes.get('/', async(req,res) => {
    try {
        const {genre, sortBy, order} = req.query

        const genreRegex = genre ? new RegExp(genre, 'i') : null

        const filter = {}
        if(genreRegex){
            filter.genre = genreRegex
        }

        const sortOptions = {};
        if (sortBy) {
            const sortOrder = order === 'asc' ? 1 : -1;
            sortOptions[sortBy] = sortOrder;
        }

        const books = await Book.find(filter).sort(sortOptions)
        res.status(201).json(books)
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// delete
bookRoutes.delete('/:id', async(req,res) => {
    try {
        await Book.findByIdAndDelete(req.params.id)
        res.status(204).json({message: 'Data deleted successfully'})
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = bookRoutes