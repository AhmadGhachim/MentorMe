import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const EditProfileForm = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateEvent = () => {
        // Implement the logic to create the event here
        // You can use the form values collected from the state
        handleClose();
    };

    // State for form values
    const [eventFormData, setEventFormData] = useState({
        eventName: '',
        dateTime: '',
        location: '',
        isRemote: false,
        address: '',
        description: '',
        speakers: '',
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
            <Button onClick={handleOpen} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                <Typography textAlign="center">{"Edit Profile"}</Typography>
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
                        onChange={handleChange('description')}
                    />

                    {/* Speakers */}
                    <TextField
                        label="Speakers"
                        fullWidth
                        margin="normal"
                        value={eventFormData.speakers}
                        onChange={handleChange('speakers')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" sx={{ textTransform: 'none' }}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateEvent} sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default EditProfileForm;