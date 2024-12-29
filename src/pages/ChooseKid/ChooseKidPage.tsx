import './ChooseKid.module.css';
import ChooseKidComponent from './components/ChooseKidComponent';
import Header from '@/components/recycleComponent/Header/Header';
import Footer from '@/components/recycleComponent/Footer/Footer';

const ChooseKidPage = () => {
    return (
        <div>
            <Header/>
            <ChooseKidComponent/>
            <Footer/>
        </div>
    );
};

export default ChooseKidPage;
    