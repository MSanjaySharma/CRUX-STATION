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
  startCreateTag,
  startGetTags,
  startDeleteTag,
} from "../../../redux/actions/tagActions";
import useStyles from "./useStyles";
import CustomizedSnackBar from "../../../utils/components/SnackBar";

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: "",
      message: "",
      error: "",
      loading: false,
    };
  }

  componentDidMount = () => {
    this.props.startGetTags();
  };

  changeState = (message, error) => {
    this.setState({ message, error, loading: false });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.createTag(this.state.tagName, this.changeState);
    this.setState({ tagName: "" });
  };

  handleChipClick = () => {
    alert("hello");
  };

  handleChipDelete = (tagName) => {
    this.setState({ loading: true });
    this.props.startDeleteTag(tagName, this.changeState);
    this.setState({ tagName: "" });
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
            <Typography> Create/Delete Tag</Typography>
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
                    id="tagName"
                    name="tagName"
                    label="Tag Name"
                    required
                    value={this.state.tagName}
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
                    Create New Tag
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item className={classes.root}>
            {this.props.tags.map((ele, index) => (
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

const mapStateToProps = (state) => ({ tags: state.tags });

const mapDispatchToProps = {
  createTag: startCreateTag,
  startGetTags,
  startDeleteTag,
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Tag);

//export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(Tag));

//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Tag));

//export default connect(mapStateToProps, mapDispatchToProps)(Tag);
