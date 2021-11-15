import "./Header.css";
import logo from '../../assets/images/images.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

export const Header = ({items, setCartShow}) => {
    const showCart = () => {
        setCartShow(true)
    }

    return (
        <div className='header'> 
            <p className={'header-p'}>we choose <img src={logo} alt={'you'} />and<img src={logo} alt={'you'} /> choose us</p>
            <div onClick={showCart}><FontAwesomeIcon className={'shopping-cart'} icon={faShoppingCart}></FontAwesomeIcon>
                <p className={'add-to-card'}>{items.length}</p>
            </div>
            <div></div>
        </div>  
    )};


