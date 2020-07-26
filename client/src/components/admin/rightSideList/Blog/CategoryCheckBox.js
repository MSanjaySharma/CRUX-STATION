import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import useStyles from "./useStyles";

function CategoryCheckBox({
  categories,
  state,
  setState,
  categoriesChecked
}) {
  const classes = useStyles();

  const handleCategoryToggle = (value) => () => {
    const currentIndex = categoriesChecked.indexOf(value);
    const newChecked = [...categoriesChecked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState({ ...state, categoriesChecked: newChecked });
  };

  return (
    <>
      <List className={classes.rootList}>
        <ListItem>
          <ListItemText primary={"CATEGORIES"} />
        </ListItem>
        <Divider />
        {categories.map((category, i) => {
          const labelId = `checkbox-list-label-${i}`;

          return (
            <ListItem
              key={category._id}
              role={undefined}
              dense
              button
              onClick={handleCategoryToggle(category._id)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={categoriesChecked.indexOf(category._id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={category.name} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

export default CategoryCheckBox;
