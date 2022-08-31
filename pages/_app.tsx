import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { darkTheme } from '../lib/themes'
import { UIProvider } from '../context/ui/ui-provider'
import { EntriesProvider } from '../context/entries/entries-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

export default MyApp
