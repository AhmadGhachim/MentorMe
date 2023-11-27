import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

// eslint-disable-next-line react/prop-types
const Reply = ({ reply }) => (
    <div key={reply.id}>
        <ListItem>
            <Stack direction="column">
                <Typography variant="body2" color="textSecondary">
                    by {reply.username}
                </Typography>
                <Typography variant="body1">{reply.content}</Typography>
            </Stack>
        </ListItem>
        <Stack direction="row" spacing={1} alignItems="center" pl={2}>
            <IconButton>
                <ThumbUpIcon />
            </IconButton>
            <span>{reply.likes}</span>
            <IconButton>
                <ThumbDownIcon />
            </IconButton>
            <Button color="primary">
                Reply
            </Button>
        </Stack>
        {reply.replies && reply.replies.length > 0 && (
            <List style={{ paddingLeft: '20px' }}>
                {reply.replies.map((nestedReply) => (
                    <Reply key={nestedReply.id} reply={nestedReply} />
                ))}
            </List>
        )}
    </div>
);

const FeaturedPosts = ({ posts }) => {
    // State to manage the expanded state of each post
    const [expanded, setExpanded] = useState(null);

    const handleReply = (post) => {
        console.log(post)
    }
    const handleExpandClick = (postId) => {
        setExpanded((prev) => (prev === postId ? null : postId));
    };

    return (
        <Box>
            {posts.map((post) => (
                <Card key={post.id} style={{ margin: '20px 0' }}>
                    <CardContent>
                        <Typography variant="h6">{post.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            by {post.username}
                        </Typography>
                        <Typography variant="body1">{post.content}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <IconButton>
                                <ThumbUpIcon />
                            </IconButton>
                            <span>{post.likes}</span>
                            <IconButton>
                                <ThumbDownIcon />
                            </IconButton>
                            <Button
                                onClick={() => handleExpandClick(post.id)}
                                color="primary"
                            >
                                {expanded === post.id ? 'Collapse' : 'Expand'}
                            </Button>
                        </Stack>
                    </CardContent>
                    <Collapse in={expanded === post.id}>
                        <CardContent>
                            <List>
                                {post.replies.map((reply) => (
                                    <Reply key={reply.id} reply={reply} />
                                ))}
                            </List>
                            <Stack direction="column" spacing={2} mt={2}>
                                <TextField
                                    label={`Your Reply to ${post.username}`}
                                    multiline
                                    rows={2}
                                    variant="outlined"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleReply(post)}
                                >
                                    Reply
                                </Button>
                            </Stack>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </Box>
    );
};

export default FeaturedPosts;
