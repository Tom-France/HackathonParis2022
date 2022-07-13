import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { NavLink, Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { fetchTags, selectors } from "../reducers/tagsSlice";
import { useEffect } from "react";
export default function Tags(){
    
    let tags = useSelector(selectors.selectAll)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])
    return (
        <div style={{display:"flex"}}>
            <List>
                { tags.map((tag) => (
                    <ListItem  key={tag.id}>
                        <ListItemButton component={NavLink} to={`/tags/${tag.id}`} key={tag.id} >
                            <ListItemText primary={tag.tag_name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Outlet />
        </div>
    )
}