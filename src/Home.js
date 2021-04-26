import {useState, useEffect} from 'react';
import BlogList from './BlogList';


const Home = () => {
    // create some states as the blog entries
    const [blogs, setBlogs] = useState ([
        { title: 'My new Website', body: 'lorem ipsum...', author: 'Opeyemi', id: 1}, 
        { title: 'Welcome Party', body: 'lorem ipsum...', author: 'Kitty', id: 2}, 
        { title: 'My Journey as a beginner coder', body: 'lorem ipsum...', author: 'Opeyemi', id: 3}, 
    ]);

    const [name, setName] = useState('Opeyemi');

    const handleDelete = (id) => {
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    };

    useEffect(() => {
        console.log('use effect ran');
        console.log(name);
    }, [name]);

    return ( 
        <div className="home">
            <BlogList blogs={blogs} title="All Topics..." handleDelete={handleDelete} />
            {/* The code below teaches how to reuse props, in this case instead of showing all blogs, it filters and shows only the stories Opeyemi has written */}
            <BlogList blogs={blogs.filter((blog) => blog.author === 'Opeyemi')} title="Opeyemi's Topics..." handleDelete={handleDelete} />
            <button onClick={() => setName('luigi')}>Change Name</button>
            <p>{name}</p>
        </div>
     );
}
 
export default Home;