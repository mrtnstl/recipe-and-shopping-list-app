import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Outlet } from 'react-router-dom';


const RootLayout = () => {
    return (
        <main className='flex flex-col bg-customLightGreen min-h-screen text-customGray'>
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default RootLayout;