import React from "react";
import "./style.css"; 
import { withParams, withNavigate } from "../router-utils";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { Stack, IStackProps, IStackStyles } from "@fluentui/react/lib/Stack";
import { FontSizes } from "@fluentui/theme";
import { getTheme } from "@fluentui/react";

import api from "../api";

const theme = getTheme();

class Artist extends React.Component {
  state = {};

  async componentDidMount() {
    const { id: artistId } = this.props.params;

    if (artistId === "new") {
      // Initialize state for a new artist
      this.setState({
        artist: { name: "", description: "", label: "" },
      });
    } else {
      const artist = await api("/artists/" + artistId);
      this.setState({ artist });
    }
  }

  render() {
    const { artist } = this.state;

    if (!artist) return null;

    return (
      <div className="artist" style={{ boxShadow: theme.effects.elevation8 }}>
        <Stack tokens={{ childrenGap: 20 }}>
          <TextField
            label="Artist Name:"
            value={artist.name}
            onChange={(event, newValue) =>
              this.handleFieldChange("name", newValue)
            }
            required
          />

          <TextField
            label="Description:"
            value={artist.description}
            onChange={(event, newValue) =>
              this.handleFieldChange("description", newValue)
            }
            multiline
            rows={3}
          />

          <TextField
            label="Record label:"
            value={artist.label}
            onChange={(event, newValue) =>
              this.handleFieldChange("label", newValue)
            }
            required
          />

          <PrimaryButton onClick={this.handleSave}>Save</PrimaryButton>
          <DefaultButton onClick={this.handleDelete}>Delete</DefaultButton>
        </Stack>
      </div>
    );
  }

  change = (field, newValue) => {
    const artist = Object.assign({}, this.state.artist);

    artist[field] = newValue;

    this.setState({
      artist,
    });
  };

  save = async () => {
    const { artist } = this.state;

    if (artist.id) {
      await api("/artists/" + artist.id, {
        method: "POST",
        body: artist,
      });
    } else {
      await api("/artists", {
        method: "PUT",
        body: artist,
      });
    }
  };
}

export default withNavigate(withParams(Artist));

