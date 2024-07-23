import React, { useContext, useEffect, useState } from 'react';
import userContext from './UserContext';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const { loginUser } = useContext(userContext);
    const nav = useNavigate();

    
    const fetchLocalStoragePosts = () => {
        let localPosts = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('Post_')) {
                const post = JSON.parse(localStorage.getItem(key));
                post.id = key; 
                post.isManual = post.isManual || false; 
                localPosts.push(post);
            }
        }
        return localPosts;
    };

    const storeFetchedPostsInLocalStorage = (apiPosts) => {
        apiPosts.forEach(post => {
            const key = `Post_${post.id}`;
            if (!localStorage.getItem(key)) {
                localStorage.setItem(key, JSON.stringify(post));
            }
        });
    };

    const handleAddPost = () => {
        const postTitle = prompt("Enter post title");
        const postBody = prompt("Enter post body");

        if (postTitle && postBody) {
            const newPost = {
                id: `Post_${Date.now()}`, 
                title: postTitle,
                body: postBody,
                postedby: loginUser.username,
                isManual: true
            };
            const key = newPost.id;
            localStorage.setItem(key, JSON.stringify(newPost));
            setPosts(prevPosts => {
                const updatedPosts = [...prevPosts];
                updatedPosts.unshift(newPost); 
                return updatedPosts;
            });
        } else {
            console.log("Post title or body cannot be empty.");
        }
    };

    const handleUpdatePost = (id) => {
        const postTitle = prompt("Update post title");
        const postBody = prompt("Update post body");

        if (postTitle && postBody) {
            setPosts(posts.map((post) => {
                if (post.id === id) {
                    const updatedPost = { ...post, title: postTitle, body: postBody };
                    localStorage.setItem(id, JSON.stringify(updatedPost));
                    return updatedPost;
                }
                return post;
            }));
        } else {
            console.log("Post title or body cannot be empty.");
        }
    };

    const handleDeletePost = (id) => {
        localStorage.removeItem(id);
        setPosts(posts.filter((post) => {
            return post.id !== id;
        }));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                if (!response.ok) {
                    throw new Error('Response was not ok');
                }
                const apiPosts = await response.json();
                storeFetchedPostsInLocalStorage(apiPosts);
                const localPosts = fetchLocalStoragePosts();
                const allPosts = [
                    ...localPosts,
                    ...apiPosts.map(post => ({ ...post, id: `Post_${post.id}` }))
                ];
                
                allPosts.sort((a, b) => b.isManual - a.isManual);
                setPosts(allPosts);
            } catch (error) {
                console.log('Error: ' + error);
            }
        };
        fetchPosts();
    }, []);

    const handleLogout = () =>{
        nav('/login');
    }

    return (
        <div className='posts'>
            <h1 style={{ marginLeft: '50px' }}>Posts:</h1>
            <p>Welcome, {loginUser.username}</p>
            <button className='Addbtn' onClick={handleAddPost}>Add Post</button>
            <button className='logoutbtn'onClick={handleLogout} >Log Out</button>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        {post.isManual === true && post.postedby === loginUser.username && (
                            <>
                                <button className='updatebtn' onClick={() => handleUpdatePost(post.id)}>Update</button>
                                <button className='deletebtn' onClick={() => handleDeletePost(post.id)}>Delete</button>
                            </>
                        )}
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;
