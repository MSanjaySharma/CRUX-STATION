import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import useStyles from "./useStyles";

function TagCheckBox({ tags, state, setState, tagsChecked }) {
  const classes = useStyles();

  const handleTagToggle = (value) => () => {
    const currentIndex = tagsChecked.indexOf(value);
    const newChecked = [...tagsChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState({ ...state, tagsChecked: newChecked });
  };

  return (
    <>
      <List className={classes.rootList}>
        <ListItem>
          <ListItemText primary={"TAGS"} />
        </ListItem>
        <Divider />
        {tags.map((tag, i) => {
          const labelId = `checkbox-list-label-${i}`;

          return (
            <ListItem
              key={tag._id}
              role={undefined}
              dense
              button
              onClick={handleTagToggle(tag._id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={tagsChecked.indexOf(tag._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={tag.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default TagCheckBox;
