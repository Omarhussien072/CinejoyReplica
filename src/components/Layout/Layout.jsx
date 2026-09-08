import LayoutStyles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

export default function Layout() {
    return (
        <>
            <main className='min-h-screen flex flex-col justify-center items-center'>
                <Navbar />
                    <Outlet />
            </main>
        </>
    );
}
