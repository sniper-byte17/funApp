import Header from '../Header';
import Footer from '../Footer';

const MainLayout = (props) => {
    return (
        <div>
            <Header />
            <div className='default-content-wrapper'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
};

export default MainLayout;