import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {auth, db} from '../../backend/Firebase'
import { useAuth } from '../AuthContext';
import { addDoc, doc, updateDoc, collection } from "firebase/firestore"; 

const EventForm = () => {   
    const {currentUser} = useAuth();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateEvent = async () => {
        try {

            const docRef = await addDoc(collection(db, "events"), eventFormData);
            console.log("Document written with ID: ", docRef.id);

            const parentDocumentRef = doc(db, 'users', currentUser.uid);

            // Reference to the subcollection
            const subcollectionRef = collection(parentDocumentRef, 'events');

            const addedDocRef = await addDoc(subcollectionRef, eventFormData);

          } catch (e) {
            console.error("Error adding document: ", e);
            alert("Failed to create event \nerror: " + e)
          }
          
        handleClose();
    };

    // State for form values
    const [eventFormData, setEventFormData] = useState({
        eventName: '',
        dateTime: '',
        location: '',
        isRemote: false,
        address: '',
        about: '',
        hostedBy: '',
        user_id : currentUser.uid,
    });

    const handleChange = (field) => (event) => {
        setEventFormData({
            ...eventFormData,
            [field]: event.target.value,
        });
    };

    return (
        <>
            {/* Button to open the form */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create Event
            </Button>

            {/* Dialog for the form */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Event</DialogTitle>
                <DialogContent>
                    {/* Event Name */}
                    <TextField
                        label="Event Name"
                        fullWidth
                        margin="normal"
                        value={eventFormData.eventName}
                        onChange={handleChange('eventName')}
                    />

                    {/* Date and Time */}
                    <TextField
                        type="datetime-local"
                        fullWidth
                        margin="normal"
                        value={eventFormData.dateTime}
                        onChange={handleChange('dateTime')}
                    />

                    {/* Location */}
                    <TextField
                        label="Location"
                        fullWidth
                        margin="normal"
                        value={eventFormData.location}
                        onChange={handleChange('location')}
                    />

                    {/* Remote or In-Person */}
                    <TextField
                        label="Remote or In-Person"
                        select
                        fullWidth
                        margin="normal"
                        value={eventFormData.isRemote}
                        onChange={handleChange('isRemote')}
                        SelectProps={{ native: true }}
                    >
                        <option value={false}>In-Person</option>
                        <option value={true}>Remote</option>
                    </TextField>

                    {/* Address */}
                    <TextField
                        label="Address"
                        fullWidth
                        margin="normal"
                        value={eventFormData.address}
                        onChange={handleChange('address')}
                    />

                    {/* Event Description */}
                    <TextField
                        label="Event Description"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        value={eventFormData.description}
                        onChange={handleChange('about')}
                    />

                    {/* Speakers */}
                    <TextField
                        label="Speakers"
                        fullWidth
                        margin="normal"
                        value={eventFormData.speakers}
                        onChange={handleChange('hostedBy')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateEvent} color="primary">
                        Create Event
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EventForm;
