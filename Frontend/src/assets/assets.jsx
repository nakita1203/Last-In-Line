import alien from './alien.png'
import banner from './banner.png'
import donate_icon from './give-love.png'
import home_icon from './home.png'
import logo from './logo.png'
import omen from './omen.png'
import pavilion from './pavilion.png'
import shopping_cart from './shopping-cart.png'
import items from './category-items.png'
import foods from './category-foods.png'
import add_icon_white from './add_icon_white.png'
import remove_icon_red from './remove_icon_red.png'
import onigiri from './onigiri.png'
import risol from './risol.png'
import user from './user.png'

export const assets = {
    logo,
    banner,
    donate_icon,
    home_icon,
    shopping_cart,
    add_icon_white,
    remove_icon_red,
    user,
}

export const productList = [
    {
    id: "1",
    name: "Omen",
    image: omen,
    price: 69696969,
    description: "Can hardly open .pka files",
    category: "Items",
    },{
    id: "2",
    name: "Alienware",
    image: alien,
    price: 6000000,
    description: "Rough condition",
    category: "Items"
    },{
    id: "3",
    name: "Pavilion",
    image: pavilion,
    price: "8000000",
    description: "Lightly used, a bit moist",
    category: "Items"
    }
]

export const optionList = [
    {
    option_name: "Items",
    image: items
    },{
    option_name: "Foods",
    image: foods
    }
]

export const foodList = [
    {
        id: "1",
        name: "Onigiri",
        image: onigiri,
        description: "Half off starting 18.00",
        category: "Foods"
    },{
        id: "2",
        name: "Risol",
        image: risol,
        description: "Half off starting 18.00",
        category: "Foods"
    }
]