/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import { createContext } from 'react';

export const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        //...Grabbing the index of the current item selected.
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        //...Initializing new array so it can be updated immutably.
        const updatedItems = [...state.items];
        //...Item already exist in the array.
        if (existingCartItemIndex > -1) {
            //...Grabbing the item selected.
            const existingCartItem = state.items[existingCartItemIndex];
            //...Updating the quantity of the item selected.
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            //...Updating the array with the new quantity.
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        //...Item does not exist in the array.
        else {
            //...Pushing the new item in the array and setting quantity to 1.
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        //...If the quantity of the item is 1, we remove the item form the array
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        }
        //...Else only updating the quantity of thee item in the array.
        else {
            const updatedItem = { ...existingCartItem, quantity: existingCartItem.quantity - 1 };
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems };
    }

    if (action.type === 'CLEAR_CART') {
        //...Just clear the cart i.e. setting the array to its initial state.
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cartState, dispatchCartState] = useReducer(cartReducer, { items: [] });

    function addItemToCart(item) {
        dispatchCartState({
            type: 'ADD_ITEM',
            item: item,
        });
    }

    function removeItemFromCart(id) {
        dispatchCartState({
            type: 'REMOVE_ITEM',
            id: id,
        });
    }

    function clearCart() {
        dispatchCartState({
            type: 'CLEAR_CART',
        });
    }

    const cartContext = {
        items: cartState.items,
        addItem: addItemToCart,
        removeItem: removeItemFromCart,
        clearCart: clearCart,
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}
