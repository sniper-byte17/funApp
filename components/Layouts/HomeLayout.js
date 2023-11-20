import Footer from '../Footer';

const HomeLayout = (props) => {
    return (
        <div>
            <div className='home-content-wrapper'>
                {props.children}
            </div>
            <Footer />
        </div>
    )
};

export default HomeLayout;