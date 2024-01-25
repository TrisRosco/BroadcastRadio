const express = require("express");

const { Artist } = require("../../database");

const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/server/image/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
  files: 1, 
  fileSize: 1024000,

})

const upload = multer({ storage: storage })

express.json();


module.exports = function (router) {
  /**
   * List artists
   */
  router.get("/artists", async function (req, res) {
    try {
      const artists = await Artist.findAll();
      res.json(artists);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching artists", error: err.message });
    }
  });

  /**
   * Find an artist by ID
   */
  router.get("/artists/:id", async function (req, res) {
    try {
      const artist = await Artist.findByPk(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res.json(artist);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error fetching artist", error: err.message });
    }
  });

  /**
   * Create a new artist
   */
  router.post("/artists", upload.single('artistImage'), async function (req, res) {
    try {
      // Backend validation in case the frontend validation fails
      if (!req.body.name || !req.body.label) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      const artist = await Artist.create(req.body);
      res.status(201).json({ message: "Artist created. ID: ", artist });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating artist", error: err.message });
    }
  });

  /**
   * Update an artist
   */

  router.put("/artists/:id", async function (req, res) {
    try {
      const artist = await Artist.findByPk(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      // Backend validation in case the frontend validation fails
      if (!req.body.name || !req.body.label) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      await artist.update(req.body);
      res.status(200).json({ message: "Artist updated. ID: ", artist });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating artist", error: err.message });
    }
  });

  /**
   * Delete an artist
   */
  router.delete("/artists/:id", async function (req, res) {
    try {
      const artist = await Artist.findByPk(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      const deletedArtist = artist.id;
      await artist.destroy();
      res.status(200).json({ message: "Artist deleted. ID: ", deletedArtist });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting artist", error: err.message });
    }
  });
};
