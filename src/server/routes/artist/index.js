const express = require("express");

const { Artist } = require("../../database");

module.exports = function (router) {
  /**
   * List artists
   */
  router.get("/artists", async function (req, res) {
    const artists = await Artist.findAll();

    res.json(artists);
  });

  /**
   * Find an artist by ID
   */
  router.get("/artists/:id", async function (req, res) {
    const artist = await Artist.findByPk(req.params.id);

    res.json(artist);
  });

  /**
   * Create a new artist
   */
  router.post("/artists", async function (req, res) {
    res.json({ message: "PLACEHOLDER CREATE" });
  });

  /**
   * Update an artist
   */

  // Not working yet. Will do once I've finished the rest of the app.
  router.put("/artists/:id", async function (req, res) {
    res.json({ message: "PLACEHOLDER UPDATE" });
  });

  /**
   * Delete an artist
   */
  router.delete("/artists/:id", async function (req, res) {
    const artist = await Artist.findByPk(req.params.id);
    const deletedArtist = artist.id;

    await artist.destroy();

    res.status(200).json({ message: "Artist deleted. ID: ", deletedArtist });
  });
};
