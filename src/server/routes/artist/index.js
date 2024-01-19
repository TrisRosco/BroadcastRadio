const express = require('express')

const { Artist } = require('../../database')

module.exports = function (router) {
	/**
	 * List artists
	 */
	router.get('/artists', async function (req, res) {
		const artists = await Artist.findAll()

		res.json(artists)
	})

	/**
	 * Find an artist by ID
	 */
	router.get('/artists/:id', async function (req, res) {
		const artist = await Artist.findByPk(req.params.id)

		res.json(artist)
	})

	/**
	 * Create a new artist 
	 */
	router.put('/artists', function (req, res) {
		throw new Error("Not implemented")
	})

	/** 
	 * Update an artist 
	 */
	router.post('/artists/:id', function (req, res) {
		throw new Error("Not implemented")
	})

	/**
	 * Delete an artist
	 */
	router.delete('/artists/:id', function (req, res) {
		throw new Error("Not implemented")
	})
}
