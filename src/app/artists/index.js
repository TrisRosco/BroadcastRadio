import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import {
  DefaultButton,
  PrimaryButton,
  DetailsList,
  Dialog,
  DialogType,
  DialogFooter,
  MessageBar,
  MessageBarType,
  Stack,
  SearchBox,
} from "@fluentui/react";
import api from "../api";

export default class Artists extends React.Component {
  state = {
    hideDialog: true,
    messageBar: {
      isHidden: true,
      message: "",
    },
    deletingArtistId: null,
  };

  async componentDidMount() {
    // load the artists from the backend
    const data = await api("/artists");

    this.setState({
      data,
    });
  }

  delete = async () => {
    try {
      await api("/artists/" + this.state.deletingArtistId, {
        method: "DELETE",
      });

      const data = await api("/artists");

      // Update the state hide the dialog and show the message bar
      this.setState({
        data,
        hideDialog: true,
        deletingArtistId: null,
        messageBar: {
          isHidden: false,
          message: "Artist deleted successfully.",
        },
      });
      setTimeout(() => this.hideMessageBar(), 3000);

      // Handle error scenario
    } catch (error) {
      this.setState({
        messageBar: {
          isHidden: false,
          message: "Error deleting artist.",
        },
      });
    }
  };

  // State setter for the dialog box to confirm deletion
  showDialog = (id) => {
    this.setState({ hideDialog: false, deletingArtistId: id });
  };

  // The opposite of the above
  hideDialog = () => {
    this.setState({ hideDialog: true, deletingArtistId: null });
  };

  // Message bar to announce success or failure of deletion
  renderMessageBar() {
    const { isHidden, message } = this.state.messageBar;
    if (isHidden) {
      return null;
    }

    // Jsx for the message bar
    return (
      <MessageBar
        messageBarType={
          message.includes("Error")
            ? MessageBarType.error
            : MessageBarType.success
        }
        isMultiline={false}
        onDismiss={this.hideMessageBar}
        dismissButtonAriaLabel="Close"
      >
        {message}
      </MessageBar>
    );
  }

  // State setter to hide the message bar
  hideMessageBar = () => {
    this.setState({
      messageBar: { ...this.state.messageBar, isHidden: true },
    });
  };

  // Filter function
  handleFilter = (event) => {
    // Prevents an error when the user clears the search box
    if (!event || !event.target) {
      return;
    }

    // Filter the data based on the search box value
    const { value } = event.target;
    const { data } = this.state;

    const filteredData = data.filter((artist) => {
      // Go through all the artist properties and check if they include the search box value
      return (
        artist.name.toLowerCase().includes(value.toLowerCase()) ||
        artist.description.toLowerCase().includes(value.toLowerCase()) ||
        artist.label.toLowerCase().includes(value.toLowerCase())
      );
    });

    this.setState({ data: filteredData });

    if (value === "") {
      this.componentDidMount();
    }
  };

  render() {
    return (
      <div className="artists_container">
        <Stack
          horizontal
          horizontalAlign="space-between"
          tokens={{ childrenGap: 10 }}
          styles={{
            root: {
              padding: 10,
            },
          }}
        >
          <SearchBox
            placeholder="Search"
            onChange={this.handleFilter}
            onClear={() => this.componentDidMount()} // Resets the list when the user clears the search box
            underlined={true}
            styles={{
              root: {
                width: 500,
              },
            }}
          />
          <NavLink to="/artists/new">
            <PrimaryButton
              iconProps={{ iconName: "Add" }}
              text="Add Artist"
              id="add_artist_button"
              style={{}}
            />
          </NavLink>
        </Stack>
        {this.renderList()}
        <Dialog
          hidden={this.state.hideDialog}
          onDismiss={this.hideDialog}
          dialogContentProps={{
            type: DialogType.normal,
            title: "Delete Artist",
            subText: "Are you sure you want to delete this artist?",
          }}
          modalProps={{
            isBlocking: true,
          }}
        >
          <DialogFooter>
            <PrimaryButton
              iconProps={{ iconName: "Delete" }}
              onClick={this.delete}
              style={{ backgroundColor: "#d13438", color: "white" }}
              text="Delete"
            />
            <DefaultButton
              iconProps={{ iconName: "Cancel" }}
              onClick={this.hideDialog}
              text="Cancel"
            />
          </DialogFooter>
        </Dialog>
        {this.renderMessageBar()}
      </div>
    );
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
            minWidth: 100,
            maxWidth: 110,
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
              <DefaultButton
                iconProps={{ iconName: "Edit" }}
                href={"/artists/" + item.id}
                text="Edit"
              />
            ),
          },
          {
            onRender: (item) => (
              <DefaultButton
                iconProps={{ iconName: "Delete" }}
                onClick={() => this.showDialog(item.id)}
                style={{ backgroundColor: "#d13438", color: "white" }}
                text="Delete"
              />
            ),
          },
        ]}
      />
    );
  }
}
