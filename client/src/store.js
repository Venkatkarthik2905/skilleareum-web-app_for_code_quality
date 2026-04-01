
import { legacy_createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  user_email: '',
  admin_email: '',
  admin: '',

  merchant: {
    name: "",
    email: "",
    token: "",
    role: "",
    id: "",
    merchantId: ""
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_user_email':
      return {
        ...state,
        user_email: action.payload,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    case 'SET_ADMIN_EMAIL':
      return {
        ...state,
        admin_email: action.payload,
      };
    case 'ADMIN_DETAIL':
      return {
        ...state,
        admin: action.payload,
      };

    case "SET_MERCHANT_DETAILS":
      return {
        ...state,
        merchant: {
          name: action.payload.name,
          email: action.payload.email,
          token: action.payload.token,
          role: action.payload.role,
          id: action.payload.id,
          merchantId: action.payload.merchantId
        },
      };

    case "CLEAR_MERCHANT":
      return {
        ...state,
        merchant: {
          name: "",
          email: "",
          token: "",
          role: "",
          id: "",
          merchantId: ""
        },
      };

    default:
      return state;
  }
};
export const setUserEmail = (email) => ({
  type: 'SET_user_email',
  payload: email,
});

export const SET_TOKEN = (data) => ({
  type: 'SET_TOKEN',
  payload: data,
});

export const setAdminDetails = (data) => ({
  type: 'ADMIN_DETAIL',
  payload: data,
});


export const setAdminEmail = (email) => ({
  type: 'SET_ADMIN_EMAIL',
  payload: email,
});

export const setMerchantDetails = (data) => ({
  type: "SET_MERCHANT_DETAILS",
  payload: {
    name: data.name,
    email: data.email,
    token: data.token,
    id: data.id,
    role: data.role,
    merchantId: data.merchantId
  },
});

export const clearMerchant = () => ({
  type: "CLEAR_MERCHANT",
});


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = legacy_createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };                                    