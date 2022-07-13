import { TextField } from "@mui/material";
import React from "react";

export default function TagForm(props) {
    
    const handleInputChange = props.handleInputChange
    const tag = props.tag

    return (
        <React.Fragment>
            <TextField
                id="name-input"
                name="tag_name"
                label="Name"
                type="text"
                value={tag.tag_name}
                onChange={handleInputChange}/>
            <TextField
                id="id-input"
                name="tag_id"
                label="Tag Id"
                type="text"
                value={tag.tag_id}
                onChange={handleInputChange}/>
        </React.Fragment>
    );
  }