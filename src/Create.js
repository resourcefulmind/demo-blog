import { useState } from "react";
import { useHistory } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Opeyemi');
    const [isAddingStory, setIsAddingStory] = useState(false) //state created to add a loading state when we are adding a story
    const history = useHistory(); 

    const handleSubmit = (e) => {
        e.preventDefault();  //to prevent the default action of refreshing the page whenever you click the submit button 
        const blog = { title, body, author };  //blog object tat is created to ultimately be saved in the database

        setIsAddingStory(true);

        //this is to enable us make a POST request and add our blog data to the database and then we add a second argument to help us define the type of request we are sending
        fetch('http://localhost:8000/blogs', {
            method: 'POST', //letting us know that it is a POST request
            headers: { "Content-Type": "application/json" },  //it is so we can see the content type that is being sent
            body: JSON.stringify(blog) //the actual data which we are sending with the request
        }).then(() => {
            console.log('Your Story has been added');
            setIsAddingStory(false);
        })

        history.push('/');
    }

    return ( 
        <div className="create">
            <h2>Add a New Story...</h2>
            <form onSubmit={ handleSubmit }>
            <label>Story Title:</label>
            <input 
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <label>Story Body:</label>
            <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <label>Story Author:</label>
            <select
            value={ author }
            onChange={(e) => setAuthor(e.target.value)}>
                <option value="Opeyemi">Opeyemi</option>
                <option value="Oghenetega">Oghenetega</option>
                <option value="Guest">Guest</option>
            </select>
            { !isAddingStory && <button>Add Story</button> }
            { isAddingStory && <button>Adding Story...</button> }
        </form>
        </div>
     );
}
 
export default Create;
