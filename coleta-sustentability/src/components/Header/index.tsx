import image from '../../assets/sustainable-logo.png'
import './style.css'

export function Header() {
    return (
        <div className="header-container">  
            <img className='image-logo' src={image} alt="logo" />
        </div>
    )
}