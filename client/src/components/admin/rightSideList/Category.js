import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

import {
  startGetCategories,
  startCreateCategory,
  startDeleteCategory,
} from "../../../redux/actions/categoryActions";
import useStyles from "./useStyles";
import CustomizedSnackBar from "../../../utils/components/SnackBar";

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: "",
      message: "",
      error: "",
      loading: false,
    };
  }

  componentDidMount = () => {
    this.props.startGetCategories();
  };

  changeState = (message, error) => {
    this.setState({ message, error, loading: false});
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.createCategory(this.state.categoryName, this.changeState);
    this.setState({categoryName: ""});
  };

  handleChipClick = () => {
    alert("hello");
  };

  handleChipDelete = (categoryName) => {
    this.setState({ loading: true });
    this.props.startDeleteCategory(categoryName, this.changeState);
    this.setState({categoryName: ""});
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="center"
          alignContent="center"
          wrap="nowrap"
          style={{paddingBottom:"15vh"}}
        >
          <Grid item>
            <Typography> Create/Delete Category</Typography>
          </Grid>

          <Grid item>
            <form onSubmit={this.handleSubmit}>
              <Grid
                container
                spacing={3}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
              >
                <Grid item>
                  <TextField
                    id="categoryName"
                    name="categoryName"
                    label="Category Name"
                    required
                    value={this.state.categoryName}
                    onChange={this.handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button
                    type="submit"
                    variant="text"
                    color="default"
                    fullWidth
                  >
                    <Typography>Create New Category</Typography>
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item className={classes.root}>
            {this.props.categories.map((ele, index) => (
              <Chip
                color="primary"
                key={index}
                label={ele.name}
                onClick={this.handleChipClick}
                onDelete={() => this.handleChipDelete(ele.name)}
              />
            ))}
          </Grid>
        </Grid>
        <CustomizedSnackBar
          changeState={this.changeState}
          message={this.state.message}
          error={this.state.error}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({ categories: state.categories });

const mapDispatchToProps = {
  startGetCategories,
  createCategory: startCreateCategory,
  startDeleteCategory,
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Category);

//export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Category));

//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Category));

//export default connect(mapStateToProps, mapDispatchToProps)(Category);
