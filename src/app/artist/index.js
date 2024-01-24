import React from "react";
import "./style.css";
import { withParams, withNavigate } from "../router-utils";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { getTheme } from "@fluentui/react";

import api from "../api";

const theme = getTheme();

class Artist extends React.Component {
  state = {
    isNew: false,
  };

  async componentDidMount() {
    const { id: artistId } = this.props.params;

    if (artistId === "new") {
      // Initialize state for a new artist
      this.setState({
        isNew: true,
        artist: { name: "", description: "", label: "" },
      });
    } else {
      // Load the artist from the backend and set it in state
      const artist = await api("/artists/" + artistId);
      this.setState({ artist });
    }
  }


  change = (field, newValue) => {
    const artist = { ...this.state.artist };

    artist[field] = newValue;

    this.setState({
      artist,
    });

  };

  updateArtist = async () => {
    const { artist } = this.state;

    if (artist.id) {
      await api("/artists/" + artist.id, {
        method: "PUT",
        body: artist,
      });
    }

    this.props.navigate("/");
  };


  saveNew = async () => {
    const { artist } = this.state;
    console.log(artist);
    
    await api("/artists", {
      method: "POST",
      body: artist,
    });

    this.props.navigate("/");
  };


  delete = async () => {
    const { artist } = this.state;

    if (artist.id) {
      await api("/artists/" + artist.id, {
        method: "DELETE",
      });
    }

    this.props.navigate("/");
  };

  cancel = () => {
    this.props.navigate("/");
  };

  render() {
    const { artist } = this.state;

    if (!artist) return null;

    return (
      <div className="artist" style={{ boxShadow: theme.effects.elevation8 }}>
        <Stack tokens={{ childrenGap: 20 }}>
          <TextField
            label="Artist Name:"
            value={artist.name}
            onChange={(event) => this.change("name", event.target.value)}
            required
          />
          <TextField
            label="Description:"
            value={artist.description}
            onChange={(event) => this.change("description", event.target.value)}
            multiline
            rows={3}
          />
          <TextField
            label="Record label:"
            value={artist.label}
            onChange={(event) => this.change("label", event.target.value)}
            required
          />
          <PrimaryButton
            onClick={this.state.isNew ? this.saveNew : this.updateArtist}
          >
            Save
          </PrimaryButton>

          {this.state.isNew == false && (
            <DefaultButton onClick={this.delete}>Delete</DefaultButton>
          )}

          <DefaultButton onClick={this.cancel}>Cancel</DefaultButton>
        </Stack>
      </div>
    );
  }
}

export default withNavigate(withParams(Artist));
