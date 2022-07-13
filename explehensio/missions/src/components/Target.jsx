
import { Chip } from "@mui/material"
import React from "react"
import { Pin } from "./Pin"

export function Target(props){
    const { name, order} = props.target
    return <React.Fragment>
                <Pin  />
                <Chip sx={{ color:'white' }}  label={name} />
            </React.Fragment>
} 