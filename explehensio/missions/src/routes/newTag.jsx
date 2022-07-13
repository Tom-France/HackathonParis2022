import { useDispatch } from "react-redux";
import { addTag, postTag } from "../reducers/tagsSlice";
import TagForm from "../components/TagForm";
import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NewTag() {
    const initialState = {
        "tag_name": "",
        "tag_id": ""
    }

    const navigate = useNavigate()
    const [tag, updateTag] = useState(initialState)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateTag({...tag, [name]: value})
    }

    const dispatch = useDispatch()

    const saveTag = useCallback((e) => {
        dispatch(postTag(tag))
        navigate(0)
        
    }, [tag])

    return (
        <main style={{ padding: "1rem" }}>
        <TagForm handleInputChange={handleInputChange} tag={tag} />
            <Button
                onClick={saveTag} >
                Save
            </Button>
        </main>
    );
  }