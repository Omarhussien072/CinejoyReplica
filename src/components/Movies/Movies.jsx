import MoviesStyles from './Movies.module.css';
import { useEffect, useState } from "react";
import { getMovies, imgBaseUrl } from "../../Services/ApiService/ApiService";
import Card from '../Card/Card';

export default function Movies() {
    let [movies, setMovies] = useState([]);
    useEffect(() => {
        const loadMovies = async () => {
            const data = await getMovies();
            setMovies(data)
        }
        loadMovies()
    }, [])
    return (
        <>
            <div className={`flex flex-col py-24 px-12 ${MoviesStyles.background}`}>
                <di className="ml-24">
                    <h1 className='text-white text-lg lg:text-5xl font-semibold '>Movies</h1>
                    <p className='text-white/60 text-sm lg:text-lg font-semibold'>Discover new movies to watch</p>
                </di>
                <div className=" md:w-1/3 lg:w-full text-white flex flex-wrap justify-center align-center gap-1">
                    {movies.map((movie) => {
                        return <Card id={movie.id} title={movie.title} img_path={movie.backdrop_path} release_date={movie.release_date} vote={movie.vote_average} type='movie' />
                    })}
                </div>
            </div>
        </>
    );
}
