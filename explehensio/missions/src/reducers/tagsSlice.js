import { createEntityAdapter, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTags = createAsyncThunk(
    'tags/fetchTags',
    async () => {
        const data = await fetch('http://localhost:80/tags').then((res) => res.json())
        return data
    }
)
export const getTag = createAsyncThunk(
    'tags/getTag',
    async (id) => {
        const data = await fetch(`http://localhost:80/tags${id}`).then((res) => res.json())
        console.log(data)
        return data
    }
)
export const deleteTag = createAsyncThunk(
    'tags/deleteTag',
    async (id) => {
        await fetch(`http://localhost:80/tags/${id}`, {
            method: 'DELETE',
        })
        return id
    }
)

export const putTag = createAsyncThunk(
    'tags/putTag',
    async ({ id, newObj }) => {
        console.log(newObj)
        await fetch(`http://localhost:80/tags/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newObj),
        })
        return { id, changes: newObj }
    }
)

export const postTag = createAsyncThunk(
    'tags/postTag',
    async (newObj) => {
        await fetch(`http://localhost:80/tags`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newObj),
        })
        return true
    }
)
const tagAdapter = createEntityAdapter()

const tagSlice = createSlice({
    name: "tags",
    initialState: tagAdapter.getInitialState({
        loading: false,
    }),
    reducers: {
        addTag: tagAdapter.addOne,
        removeTag: tagAdapter.removeOne,
        updateTag: tagAdapter.upsertOne
    },
    extraReducers: {
        [fetchTags.pending](state) {
            state.loading = true
        },
        [fetchTags.fulfilled](state, payload) {
            state.loading = false
            tagAdapter.setAll(state, payload)
        },
        [fetchTags.rejected](state) {
            state.loading = true
        },
        [postTag.pending](state) {
            state.loading = true
        },
        [postTag.fulfilled](state, payload) {
            state.loading = false
        },
        [postTag.rejected](state) {
            state.loading = true
        },
        [deleteTag.pending](state) {
            state.loading = true
        },
        [deleteTag.fulfilled](state, payload) {
            state.loading = false
        },
        [deleteTag.rejected](state) {
            state.loading = true
        }
    }
});

export const { addTag, removeTag, updateTag } = tagSlice.actions;
export const selectors = tagAdapter.getSelectors(state => state.tags);
export default tagSlice.reducer;