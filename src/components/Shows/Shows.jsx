import ShowsStyles from './Shows.module.css';
import { useEffect, useState } from "react";
import { getShows, imgBaseUrl } from "../../Services/ApiService/ApiService";
import Card from '../Card/Card';

export default function Shows() {
    let [shows, setShows] = useState([]);
    useEffect(() => {
        const loadShows = async () => {
            const data = await getShows();
            setShows(data);
        }
        loadShows();
    }, [])
    return (
        <>
            <div className={`flex flex-col py-24 px-12 ${ShowsStyles.background}`}>
                <di className="ml-24">
                    <h1 className='text-white text-lg lg:text-5xl font-semibold '>TV Series</h1>
                    <p className='text-white/60 text-sm lg:text-lg font-semibold'>Discover new TV series to watch</p>
                </di>
                <div className=" md:w-1/3 lg:w-full text-white flex flex-wrap justify-center align-center gap-1">
                    {shows.map((show) => {
                        return <Card id={show.id} title={show.name} img_path={show.backdrop_path} release_date={show.first_air_date} vote={show.vote_average} type='tv' />
                    })}
                </div>
            </div>
        </>
    );
}
