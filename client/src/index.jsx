import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
//import { ModalProvider } from './ModalContext';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { createAppKit } from '@reown/appkit/react'
import { arbitrum, bsc ,bscTestnet} from '@reown/appkit/networks'
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5'
import { GoogleOAuthProvider } from "@react-oauth/google";
import './i18n';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
const MANIFEST_URL = `${window.location.origin}/tonconnect-manifest.json`;

  const clientId =
    "48713007905-mpuqg526hfo2kcs0g14qj263f6kpjk6j.apps.googleusercontent.com";
const projectId = '2aca272d18deb10ff748260da5f78bfd';
const metadata = {
  name: 'Skilleareum',
  description: 'Skilleareum Ecosystem',
  url: 'https://skilleareum.ai/',
  icons: ['https://skilleareum.ai/favicon.png']
};
const bscNetwork = {
  ...bsc,
  rpcUrls: [
    "https://bsc-dataseed.binance.org/",
    "https://bsc-dataseed1.defibit.io/",
    "https://bsc-dataseed1.ninicoin.io/"
  ],
};
createAppKit({
  adapters: [new Ethers5Adapter()],
  networks: [bsc, arbitrum,bscTestnet],
  metadata,
  projectId,
  features: {
    analytics: true,
  }
})

//  console.log = () => {};


root.render(
  <React.StrictMode>
    <BrowserRouter>
<GoogleOAuthProvider clientId={clientId}>
      <Provider store={store} >
        <TonConnectUIProvider manifestUrl={MANIFEST_URL}>
            <App />
                <Toaster/>
        </TonConnectUIProvider>
      </Provider>
</GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
