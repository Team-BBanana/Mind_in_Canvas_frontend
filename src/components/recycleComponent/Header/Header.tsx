import style from './Header.module.css';
import Logo from '@/assets/imgs/textLogo-removebg-preview.svg';
import { useNavigate } from 'react-router-dom';
import API from '@/api';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await API.userApi.logoutUser();
            console.log(response.data);
            if (response.status === 200) {
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Redirecting to login');
                navigate('/login');
            } else {
                console.error('Error during logout:', error);
            }
        }
    };

    return (
        <header className={style.header}>
            <img className={style.logo}
                src={Logo} 
                alt="text logo" 
                width="10%" 
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
            />
            <button className={style.logoutButton} onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
};

export default Header;
