import {Link} from 'react-router-dom';

function Header(){
    return(
        <header className="d-flex my-4 justify-content-between px-5 py-2 align-items-center rounded shadow">
            <Link to={'/'} className='text-decoration-none'>
                <big><b>Product</b></big>
            </Link>
            <div>
                <Link to={'/'} className='text-decoration-none'>Home</Link>
            </div>
            <Link to={'/add-products'} className='text-decoration-none'>
                <button className='btn btn-success'><b>+</b> Add Products</button>
            </Link>
        </header>
    );
}

export default Header;