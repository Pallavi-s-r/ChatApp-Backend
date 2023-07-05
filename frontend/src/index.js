import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Button, ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter } from 'react-router-dom';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
  <BrowserRouter> 
  <ChakraProvider>
    {/* <Button colorScheme='blue'>Button</Button><ChakraProvider></ChakraProvider> */}
    <App />
    </ChakraProvider> 
    </BrowserRouter>
  </React.StrictMode>
);


