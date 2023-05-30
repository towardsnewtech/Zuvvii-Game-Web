import * as React from 'react'

import "../styles/globals.css";

import Head from 'next/head'

import type { AppProps } from "next/app";

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from 'store';

import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../config/muiTheme";

import Wrapper from 'components/Wrapper';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import ProgressBar from 'nextjs-progressbar'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
  const { metaTags } = pageProps

  const queryClient = React.useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        }
      }
    })
  )

  return (
    <React.Fragment>
      <style jsx global>{`
          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
        
          ::-webkit-scrollbar-track {
            background: #776e6e;
          }
        
          ::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: #65C5BA;
          }
        
          ::-webkit-scrollbar-thumb:hover {
            background: #65C5BA;
          }
      `}</style>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />

        {metaTags &&
          Object.entries(metaTags).map(entry => {
            if (!entry[1]) return null
            return (
              <meta
                key={entry[1] as React.Key}
                property={entry[0]}
                content={entry[1] as string}
              />
            )
        })}
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient.current}>
              <Wrapper>
                <Hydrate state={pageProps.dehydratedState}>
                  <ProgressBar
                    options={{
                      showSpinner: false
                    }}
                  />
                  <Component {...pageProps} />
                  <ToastContainer />
                  <ReactQueryDevtools initialIsOpen={false} />
                </Hydrate>
              </Wrapper>
            </QueryClientProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
