import React from 'react';
import { toast } from 'react-toastify';

const CartContext = React.createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case 'delete': {
      return {
        ...state,
        products: state.products.filter((product) => product.title !== action.product.title)
      };
    }
    case 'add': {
      const index = state.products.findIndex((product) => product.id === action.product.id);
      if (index >= 0) {
        const newState = { ...state };
        newState.products[index].quantity += 1;
        toast.success(`${newState.products[index].quantity} ${newState.products[index].title}s successfully added to cart.`);
        return {
          ...newState
        };
      }

      toast.success(`${action.product.title} successfully added to cart.`);
      return {
        ...state,
        products: [...state.products, action.product]
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function CartProvider({ children }) {
  const initialProducts = {
    products: [],
    setProducts: () => { }
  };
  const [state, dispatch] = React.useReducer(cartReducer, initialProducts);

  const value = { state, dispatch };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
