import React, {useState} from 'react';
import Posts from '../components/Post.jsx'
import CreatePost from '../components/CreatePost.jsx'
import FeaturedEvents from "../components/FeaturedEvents.jsx";
import TopicsHome from "../components/TopicsHome.jsx";

const featuredPosts = [
    {
        id: 1,
        username: 'JohnDoe',
        title: 'React Hooks Tutorial',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        likes: 10,
        dislikes: 2,
        replies: [
            {
                id: 1,
                username: 'JaneSmith',
                content: 'Great tutorial!',
                likes: 5,
                dislikes: 0,
                replies: [
                    {
                        id: 1,
                        username: 'BobJohnson',
                        content: 'I learned a lot, thanks!',
                        likes: 2,
                        dislikes: 1,
                        replies: [],
                    },
                ],
            },
            // Add more replies as needed
        ],
    },
    // Add more posts as needed
];


const HomePage = () => {
    return (
        <>
            <FeaturedEvents />
            <TopicsHome />
            <Posts posts={featuredPosts} />;
            <CreatePost/>
        </>
    );
};

export default HomePage;
