import { Link } from 'react-router-dom';
import './Main.css';


export const Main = ({ items, products1, setItems, filteredProducts}) => {


console.log("ITEMS", items)

    const addToCart = (id, amount) => {
        console.log("ITEMSSSSSSSSSSSSSSSSSSSSSSS",items)
        let emptyA = [];
        
        emptyA.push(...items);

        products1.forEach((product)=> {
            if(id === product.id) {
            let add = product.amount + 1;
            product.amount = add;
            console.log("PRODUCT ID",product.id)
            emptyA.push(product.id)
            }
        } )
        
        setItems(emptyA);
        localStorage.setItem('key-ids', JSON.stringify(emptyA))
    }

    return (
        <div className="products">
            {filteredProducts.map((product) => {
                return (
                    <div className="single-product" key={product.id}>
                        <Link className='text-link' to={`/single-product/${product.id}`}>
                        <p className='product-title'>{product.title}</p>
                        <img src={product.image} width={'150px'} alt={''}/>
                        <p>{`${product.price} $`}</p>
                        <p>{product.rating.rate}</p>
                        </Link>
                        <button className='btn-add-to-card' onClick={()=> addToCart(product.id, product.amount)}>ADD TO CARD</button>
                    </div>
                );
            })}
        </div>

    );
};



