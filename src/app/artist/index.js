import React, { useState, useEffect } from "react";
import "./style.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  DefaultButton,
  PrimaryButton,
  TextField,
  Stack,
  Label,
  Text,
} from "@fluentui/react";
import { getTheme } from "@fluentui/react";

import api from "../api";

const theme = getTheme();

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [isEmpty, setIsEmpty] = useState({
    name: false,
    label: false,
  });

  // Get the id from the url
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    // Load the artist or set a new one
    const loadArtist = async () => {
      if (params.id === "new") {
        setIsNew(true);
        setArtist({ name: "", description: "", label: "" });
      } else {
        const artistData = await api("/artists/" + params.id);
        setArtist(artistData);
      }
    };

    loadArtist();
  }, [params.id]);

  const handleChange = (fieldName, newValue) => {
    const currentArtist = artist;

    const updatedArtist = {
      ...currentArtist,
      [fieldName]: newValue,
    };

    setArtist(updatedArtist);
  };


  const saveOrUpdateArtist = async () => {
    // Check if the required fields are filled
    checkFields();

    if (!artist.name || !artist.label) {
      return;
    }

    if (isNew) {
      await api("/artists", {
        method: "POST",
        body: artist,
      });
    } else {
      await api("/artists/" + artist.id, {
        method: "PUT",
        body: artist,
      });
    }

    navigate("/");
  };

  const checkFields = () => {
    setIsEmpty({
      name: !artist.name,
      label: !artist.label,
    });
  };

  const deleteArtist = async () => {
    if (artist.id) {
      await api("/artists/" + artist.id, {
        method: "DELETE",
      });
    }

    navigate("/");
  };

  // If the artist is not loaded yet, don't render anything
  if (!artist) return null;

  return (
    <div className="artist" style={{ boxShadow: theme.effects.elevation8 }}>
      <Stack tokens={{ childrenGap: 0, padding: 15 }}>
        <h1 className="artist_title">{isNew ? "Add Artist" : "Edit Artist"}</h1>
        <TextField
          label="Artist Name"
          value={artist.name}
          onChange={(event) => handleChange("name", event.target.value)}
          required
          errorMessage={isEmpty.name ? "This field is required" : ""}
        />
        <TextField
          label="Description"
          value={artist.description}
          onChange={(event) => handleChange("description", event.target.value)}
          multiline
          rows={3}
        />
        <TextField
          label="Record label"
          value={artist.label}
          onChange={(event) => handleChange("label", event.target.value)}
          required
          errorMessage={isEmpty.label ? "This field is required" : ""}
        />

        TODO: Add image upload
        {/* <Label>Artist Image</Label>
        <form
          label="Test"
          action="/upload"
          method="post"
          encType="multipart/form-data"
        >
          <input type="file" name="artistImage" onChange={handlePhotoUpload} />
        </form>
        <Text
          variant="small"
          styles={{ root: { color: theme.palette.neutralSecondary } }}
        >
          Max file size: 1MB
        </Text> */}
      </Stack>
      <Stack
        horizontal
        horizontalAlign="space-between"
        tokens={{
          padding: 15,
        }}
      >
        <DefaultButton
          iconProps={{ iconName: "Cancel" }}
          onClick={() => navigate("/")}
          text="Cancel"
        />

        {!isNew && (
          <DefaultButton
            iconProps={{ iconName: "Delete" }}
            onClick={deleteArtist}
            style={{ backgroundColor: "#d13438", color: "white" }}
            text="Delete"
          />
        )}

        <PrimaryButton
          iconProps={{ iconName: "Save" }}
          onClick={saveOrUpdateArtist}
          text="Save"
        />
      </Stack>
    </div>
  );
};

export default Artist;
