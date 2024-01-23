import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { DetailsList } from "@fluentui/react/lib/DetailsList";

import api from "../api";

export default class Artists extends React.Component {
  state = {};

  async componentDidMount() {
    // load the artists from the backend
    const data = await api("/artists");

    this.setState({
      data,
    });
  }

  render() {
    return (
      <div className="artists_container">
        <NavLink to="/artists/new">
          <PrimaryButton text="Add Artist" id="add_artist_button" />
        </NavLink>

        {this.renderList()}
      </div>
    );
  }

  async delete(id) {
    await api("/artists/" + id, {
      method: "DELETE",
    });

    const data = await api("/artists");

    this.setState({
      data,
    });
  }

  renderList() {
    const { data } = this.state;

    if (!this.state.data) {
      return null;
    }

    return (
      <DetailsList
        items={data}
        selectionMode={0}
        columns={[
          {
            key: "name",
            name: "Name",
            fieldName: "name",
            maxWidth: 100,
          },
          {
            key: "description",
            name: "Description",
            fieldName: "description",
          },
          {
            key: "label",
            name: "Label",
            fieldName: "label",
          },
          {
            onRender: (item) => (
              <DefaultButton href={"/artists/" + item.id}>Edit</DefaultButton>
            ),
          },
          {
            onRender: (item) => (
              <DefaultButton onClick={() => this.delete(item.id)}>
                Delete
              </DefaultButton>
            ),
          },
        ]}
      />
    );
  }
}
