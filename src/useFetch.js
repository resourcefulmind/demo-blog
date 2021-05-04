//makes a custom hook that can be reusable in other components

import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState (null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal}) //to make a fetch request which will return a promise
                .then(res => {
                    if(!res.ok) {
                        throw Error('Could Not Fetch The Data For That Resource');
                    }
                    return res.json(); //to get the data we use this and it will pass the data into a javascript object for us
                })
                .then(data => {
                    setData(data); //to take the data and update the setBlogs state.
                    setIsLoading(false); //so that you can see the loading only while the fetch is going on and not while the data has been gotten
                    setError(null);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch has been aborted');
                    } else {
                        setIsLoading(false);
                        setError(err.message);
                    }
                })
        }, 1000);

        return () => abortCont.abort();
    }, [url]);


    return { data, isLoading, error };
}

export default useFetch;