import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { CssBaseline } from '@mui/material'
import { ToggleColorMode } from '../lib/themes/theme-context'
import { UIProvider } from '../context/ui/ui-provider'
import { EntriesProvider } from '../context/entries/entries-provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ToggleColorMode>
            <CssBaseline />
            <Component {...pageProps} />
          </ToggleColorMode>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  )
}

export default MyApp
