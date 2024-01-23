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
    const artists = await Artist.findAll();
    const newId = artists.length + 1; // At some point this should become a UUID, or something equally as robust.
    const newArtist = await Artist.create({ id: newId, ...req.body });

    if (!newArtist) {
      return res.status(500).send("Error. Could not create new artist.");
    }

    res.status(201).json(newArtist);
  });

  /**
   * Update an artist
   */

  // Not working yet. Will do once I've finished the rest of the app.
  router.put("/artists/:id", async function (req, res) {
    try {
      const artistId = req.params.id;
      const updatedData = req.body;
      const artist = await Artist.findByPk(artistId);
      if (!artist) {
        return res
          .status(404)
          .send("Could not find artist with ID: " + artistId);
      }

      await artist.update(updatedData);
      console.log(artist);
      res
        .status(200)
        .json({ message: "Artist updated. ID: ", artistId, artist });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error. Could not update ID: " + artistId);
    }
  });

  /**
   * Delete an artist
   */
  router.delete("/artists/:id", async function (req, res) {
    const artist = await Artist.findByPk(req.params.id);

    if (!artist) {
      return res.status(404).send("Could not find artist with ID: " + artistId);
    }

    await artist.destroy();

    res.status(200).json({ message: "Artist deleted. ID: ", artistId });
  });
};
