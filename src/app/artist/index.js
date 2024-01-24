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
    isEmpty: {
      name: false,
      label: false,
    },
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

    this.checkFields();

    if (!artist.name || !artist.label) {
      return;
    }

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

    this.checkFields();

    if (!artist.name || !artist.label) {
      return;
    }

    await api("/artists", {
      method: "POST",
      body: artist,
    });

    this.props.navigate("/");
  };

  checkFields = () => {
    const { artist } = this.state;

    if (!artist.name || !artist.label) {
      this.setState({
        isEmpty: {
          name: !artist.name,
          label: !artist.label,
        },
      });
    }
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
            errorMessage={
              this.state.isEmpty.name ? "This field is required" : ""
            }
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
            errorMessage={
              this.state.isEmpty.label ? "This field is required" : ""
            }
          />
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
            onClick={this.cancel}
            text="Cancel"
          />


          {this.state.isNew == false && (
            <DefaultButton
              iconProps={{ iconName: "Delete" }}
              onClick={this.delete}
              style={{ backgroundColor: "#d13438", color: "white" }}
              text="Delete"
            />
          )}

          <PrimaryButton
            iconProps={{ iconName: "Save" }}
            onClick={this.state.isNew ? this.saveNew : this.updateArtist}
            text="Save"
          />
        </Stack>
      </div>
    );
  }
}

export default withNavigate(withParams(Artist));
