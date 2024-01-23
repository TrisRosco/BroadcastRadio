import React from "react";
import { withParams, withNavigate } from "../router-utils";
import { DefaultButton, PrimaryButton} from '@fluentui/react/lib/Button';
import { TextField} from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

import api from "../api";

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
      <div className="artist">
        <fieldset>
          <legend>Artist Name:</legend>
          <input
            type="text"
            value={artist.name}
            onChange={(event) => this.change("name", event.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Description:</legend>
          <textarea
            value={artist.description}
            onChange={(event) => this.change("description", event.target.value)}
          />
        </fieldset>

        <fieldset>
          <legend>Record label:</legend>
          <input
            type="text"
            value={artist.label}
            onChange={(event) => this.change("label", event.target.value)}
          />
        </fieldset>

        <PrimaryButton onClick={this.save}>Save</PrimaryButton>

        <DefaultButton onClick={this.delete}>Delete</DefaultButton>
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
