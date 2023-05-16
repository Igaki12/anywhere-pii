import React from 'react'
// import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'orange.100',
        // color: 'black',
      },
    },
  },
})
const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
