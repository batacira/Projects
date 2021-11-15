import "./Footer.css";

export const Footer = () => {

    let date = new Date();
    let day = date.getDate();
    let year = date.getFullYear();

    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    let fullDate = `${day} ${months[date.getMonth()]} ${year}`;

    return (
        <div className='footer'>
            <p>Created by Milos Ciric</p>
            <p>Contact email: milosciric175@gmail.com</p>
            <p>Current Date: {fullDate}</p>
        </div>
    );
};

