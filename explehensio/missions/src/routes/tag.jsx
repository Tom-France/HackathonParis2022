import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTag, selectors } from "../reducers/tagsSlice";
import TagForm from "../components/TagForm";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Delete, Save } from '@mui/icons-material';
import React from "react";
import { useCallback } from "react";

export default function Tag() {
    
    const params = useParams();
    
    const tag =  useSelector((state) => {

        return selectors.selectById(state, params.id)
    }
    );
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;

    }
    
    const removeTag = useCallback((e) => {
        dispatch(deleteTag(tag.id))
        navigate('/tags')
        
    }, [tag])


    return (
        <main style={{ padding: "1rem" }}>
            <TagForm handleInputChange={handleInputChange} tag={tag} />
            <IconButton color="primary" component="span" onClick={removeTag}>
                <Delete />
            </IconButton>
        </main>
    );
  }