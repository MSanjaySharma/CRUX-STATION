import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

function PhotoUpload({ handleChange, imageName }) {
  return (
    <>
      <Tooltip TransitionComponent={Zoom} title="MAXIMUM 1MB">
        <label htmlFor="photo">
          <input
            style={{ display: "none" }}
            id="photo"
            name="photo"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />

          <Fab
            color="secondary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <AddIcon /> {imageName}
          </Fab>
        </label>
      </Tooltip>
    </>
  );
}

export default PhotoUpload;
