import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { DetailsList } from "@fluentui/react/lib/DetailsList";
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';


import api from "../api";

export default class Artists extends React.Component {
  state = {
    hideDialog: true,
    deletingArtistId: null,
  };
  

  async componentDidMount() {
    // load the artists from the backend
    const data = await api("/artists");

    this.setState({
      data,
    });
  }

  // State setter for the dialog box to confirm deletion
  showDialog = (id) => {
    this.setState({ hideDialog: false, deletingArtistId: id });
  };

  // The opposite of the above
  hideDialog = () => {
    this.setState({ hideDialog: true, deletingArtistId: null });
  };
  

  render() {
    return (
      <div className="artists_container">
        <NavLink to="/artists/new">
          <PrimaryButton text="Add Artist" id="add_artist_button" />
        </NavLink>

        {this.renderList()}
        <Dialog
        hidden={this.state.hideDialog}
        onDismiss={this.hideDialog}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Delete Artist',
          subText: 'Are you sure you want to delete this artist?',
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={this.delete} text="Delete" />
          <DefaultButton onClick={this.hideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
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
              <DefaultButton onClick={() => this.showDialog(item.id)}>
                Delete
              </DefaultButton>
            ),
          },
        ]}
      />
    );
  }
}
