import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { PrimaryButton } from "@fluentui/react/lib/Button";
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
        <div className="artists_menu">
          <NavLink to="/artists/new">
            <PrimaryButton text="Add Artist" id="add_artist_button" />
          </NavLink>
        </div>

        {this.renderList()}
      </div>
    );
  }

  add = () => {};

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
            onRender: (item) => (
              <NavLink to={"/artists/" + item.id}>{item.name}</NavLink>
            ),
          },
          {
            key: "description",
            name: "Description",
            fieldName: "description",
          },
          { key: "label", name: "Label", fieldName: "label" },
        ]}
      />
      
    );
  }
}
