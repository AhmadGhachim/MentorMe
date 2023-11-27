import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {auth, db} from '../../backend/Firebase'
import { useAuth } from '../AuthContext';
import { addDoc, doc, setDoc, getDoc, collection } from "firebase/firestore"; 

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
        topic: 'UI UX Design',
    },
    {
        id: 5,
        topic: 'Fintech',
    },
    {
        id: 6,
        topic: 'Artificial Intelligence',
    },
];

const CreatePostButton = () => {
    const {currentUser} = useAuth();
    const [open, setOpen] = useState(false);
    const [postDetails, setPostDetails] = useState({
        title: '',
        content: '',
        topic: '',
        parent_id: '',
        user_id : '',
        replies: []
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

    const handleCreatePost = async () => {
        // Handle post creation logic here
        const userData = await getDoc(doc(db, 'users', currentUser.uid));
        postDetails.username = userData.data().firstName + ' ' + userData.data().lastName 
        postDetails.user_id = currentUser.uid;
        console.log('Creating post with details:', postDetails);

        const parentDocumentRef = doc(db, 'posts', postDetails.topic);

        // Reference to the subcollection
        const subcollectionRef = collection(parentDocumentRef, 'user_posts');

        const addedDocRef = await addDoc(subcollectionRef, postDetails);

        postDetails.id = addedDocRef.id;
        await setDoc(addedDocRef, postDetails, { merge: true });

        const userParentDocumentRef = doc(db, 'users', currentUser.uid);

        // Reference to the subcollection
        const userSubcollectionRef = collection(userParentDocumentRef, 'posts');

        const userAddedDocRef = await addDoc(userSubcollectionRef, postDetails);
       

        // Reset post details and close the dialog
        setPostDetails({
            title: '',
            content: '',
            topic: '',
            parent_id: '',
            user_id : '',
            replies: []
            
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
                    bottom: 50, // Adjust the value to move it vertically
                    right: 120,
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
