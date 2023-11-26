import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const topics = [
    {
        id: 1,
        topic: 'Web Development',
    },
    {
        id: 2,
        topic: 'Machine Learning',
    },
    {
        id: 3,
        topic: 'Data Science',
    },
    {
        id: 4,
        topic: 'UI/UX Design',
    },
    {
        id: 5,
        topic: 'FinTech',
    },
    {
        id: 6,
        topic: 'Artificial Intelligence',
    },
];

const CreatePostButton = () => {
    const [open, setOpen] = useState(false);
    const [postDetails, setPostDetails] = useState({
        title: '',
        content: '',
        topic: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPostDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleCreatePost = () => {
        // Handle post creation logic here
        console.log('Creating post with details:', postDetails);
        // Reset post details and close the dialog
        setPostDetails({
            title: '',
            content: '',
            topic: '',
        });
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                onClick={handleClickOpen}
                color="primary"
                aria-label="add"
                sx={{
                    position: 'fixed',
                    bottom: 200, // Adjust the value to move it vertically
                    right: 200,
                    backgroundColor: 'white',
                    padding: '12px',
                    borderRadius: '50%',
                    border: '1px solid #1976D2',
                }}
            >
                <AddIcon sx={{ fontSize: 28, color: '#1976D2' }} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a New Post</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="title"
                        value={postDetails.title}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Content"
                        name="content"
                        value={postDetails.content}
                        onChange={handleChange}
                        multiline
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        select
                        label="Select Topic"
                        name="topic"
                        value={postDetails.topic}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    >
                        {topics.map((option) => (
                            <MenuItem key={option.id} value={option.topic}>
                                {option.topic}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreatePost} color="primary">
                        Create Post
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreatePostButton;
