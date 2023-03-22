import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import './../styles/globals.css';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
	const [cart, setCart] = useState({});
	const [subTotal, setSubTotal] = useState(0);

	useEffect(() => { 
		try {
			if(localStorage.getItem('cart')){
				setCart(JSON.parse(localStorage.getItem('cart')));
			}
		} catch (error) {
			console.log(error);
			localStorage.clear();
		}
	}, [])
	

	/**
	 * Save Cart
	 * @return void
	 */
	const saveCart = (myCart) => { 
		localStorage.setItem('cart', JSON.stringify(myCart));
		let subT = 0;
		let keys = Object.keys(myCart)
		for(let i =0; i < keys.length; i++){ 
			subT += myCart[keys[i]].price * myCart[keys[i]].qty;
		}
		setSubTotal(subT);  
	}

	/**
	 * Add To Cart	
	 * @param {sting} itemCode 
	 * @param {int} qty 
	 * @param {float} price 
	 * @param {string} name 
	 * @param {string} size 
	 * @param {string} variant 
	 * @return void
	 */
	const addToCart = (itemCode, qty, price, name, size, variant) => {
		let newCart = cart;
		if(itemCode in cart){
			newCart[itemCode].qty = cart[itemCode].qty + qty;
		}
		else{
			newCart[itemCode] = { qty : 1, price, name, size, variant}
		}
		setCart(newCart);
		saveCart(newCart);  
	}


	/**
	 * Clear Cart
	 * @return void
	 */
	const clearCart = () => {
		setCart({});
		saveCart({});
	}

	/**
	 * Remove from Cart
	 * @return void
	 */
	const removeFromCart = (itemCode, qty, price, name, size, variant) => { 
		let newCart = JSON.parse(JSON.stringify(cart));
		if(itemCode in cart){
			newCart[itemCode].qty = cart[itemCode].qty - qty;
		}
		if(newCart[itemCode].qty <= 0){
			delete newCart[itemCode];
		}
		setCart(newCart);
		saveCart(newCart);
	}

	return (
		<>
			<Navbar  cart={cart} addToCart={addToCart} clearCart={clearCart} subTotal={subTotal} removeFromCart={removeFromCart} />
			<Component cart={cart} addToCart={addToCart} clearCart={clearCart} subTotal={subTotal} removeFromCart={removeFromCart}  {...pageProps} />
			<Footer />
		</>
	);
}
