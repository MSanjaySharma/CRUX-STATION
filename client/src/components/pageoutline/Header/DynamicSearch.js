import React, { useState, useEffect } from "react";
import { blogSearch } from "../../../redux/actions/blogActions";
import Router from "next/router";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";

function DynamicSearch() {
  const [search, setSearch] = useState(undefined);
  const [result, setResult] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (search) {
      blogSearch({ search }).then((blogs) => {
        setResult(blogs);
        setOpen(true);
      });
    }
    return () => {};
  }, [search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  let searchedSlug = "";

  return (
    <>
      <Autocomplete
        style={{ width: "300px" }}
        freeSolo
        id="search element"
        open={open}
        onChange={(e, value) => {
          const slug = (result.filter((blog)=>blog.title === value))[0].slug
          //console.log(slug[0].slug);
          //console.log(slug);
          Router.push(`/blogs/${slug}`);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={result.map((blog) => blog.title)}
        renderInput={(params) => (
          <>
            <TextField
              style={{ margin: "0px", padding: "0px" }}
              {...params}
              value={search}
              label="Search Blogs"
              margin="normal"
              variant="outlined"
              size="small"
              onChange={handleSearchChange}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          </>
        )}
      />
    </>
  );
}

export default DynamicSearch;
