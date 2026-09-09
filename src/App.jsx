import './index.css';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Movies from './components/Movies/Movies'
import Shows from './components/Shows/Shows'
import MyList from './components/MyList/MyList'
import Search from './components/Search/Search'
import Settings from './components/Settings/Settings'
import Layout from './components/Layout/Layout'
import NotFound from './components/NotFound/NotFound';
import Details from './components/Details/Details';
import ProviderDiscovery from './components/ProviderDiscovery/ProviderDiscovery';

function App() {
  const routes = createBrowserRouter([
    {path:'/', element: <Layout /> , children: [
      {index: true, element: <Home />},
      {path: 'movies', element: <Movies />},
      {path: 'series', element: <Shows />},
      {path: 'lists', element: <MyList />},
      {path: 'search', element: <Search />},
      {path: 'settings', element: <Settings />},
      {path:"/:type/:type/:id", element: <Details />},
      {path:"/:type/:id" , element: <ProviderDiscovery />},
      {path:'/*', element: <NotFound/>},
    ] },
  ])
  return (
    <>
        <RouterProvider router={routes}/>
    </>
  )
}

export default App
