import React, { useEffect} from 'react';
<<<<<<< HEAD
=======
import { useLazyQuery } from '@apollo/react-hooks';
>>>>>>> e5b4bd7d951ccb86abd9dadcfb5b00d11a41d802
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
<<<<<<< HEAD
import './style.css';


const Cart = () => {
    const [state, dispatch] = useStoreContext();
=======
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import './style.css';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const Cart = () => {
    const [state, dispatch] = useStoreContext();
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
>>>>>>> e5b4bd7d951ccb86abd9dadcfb5b00d11a41d802

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        };
    
        // Checking if cart length is 0, if so execute getCart() function
        if (!state.cart.length) {
            // Retrieves cart items from IndexedDB
            getCart();
        }
    }, [state.cart.length, dispatch]);

<<<<<<< HEAD
=======
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

>>>>>>> e5b4bd7d951ccb86abd9dadcfb5b00d11a41d802
    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

<<<<<<< HEAD
=======
    function submitCheckout() {
        const productIds = [];

        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });

        getCheckout({
            variables: { products: productIds }
        });
    }

>>>>>>> e5b4bd7d951ccb86abd9dadcfb5b00d11a41d802
    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        )
    }

    console.log(state);

    return (
        <div className="cart">
            <div className="close" onClick={toggleCart}>[close]</div>
            <h2> Shopping Cart </h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
<<<<<<< HEAD
                                <button>
=======
                                <button onClick={submitCheckout}>
>>>>>>> e5b4bd7d951ccb86abd9dadcfb5b00d11a41d802
                                    Checkout
                                </button>
                                :
                                <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>
                    <span role="img" aria-label="shocked">
                        😱
                    </span>
                </h3>
            )}
        </div>
    );
};


export default Cart;