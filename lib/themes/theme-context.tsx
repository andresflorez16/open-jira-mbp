import React, { useMemo, useState } from 'react'
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material'
import { grey, blueGrey } from '@mui/material/colors'

interface PropsContext {
	toggleColorMode: () => void
}

export const ColorModeContext = React.createContext({} as PropsContext)

export const ToggleColorMode: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [mode, setMode] = useState<PaletteMode>('dark')

	const colorMode = useMemo(() => ({
		toggleColorMode: () => {
			setMode((prevMode) => (prevMode === 'dark' ? 'light': 'dark'))
		}
	}), [mode])

	const useMode = (colorDark: string, colorLight: string) => {
		return mode === 'dark' ? colorDark : colorLight
	}

	const theme = useMemo(() => 
		createTheme({
			palette: {
				mode,
				primary: {
					main: useMode('#90caf9','#222')
				},
				secondary: {
					main: blueGrey[700],
				},
				background: {
					default: useMode('#222', '#FFF9CA') 
				}
			},
			components: {
				MuiAppBar: {
					defaultProps: { 
						elevation: 0
					},
					styleOverrides: {
						root: {
							backgroundColor: useMode('#111', '#ABC9FF'),
						}
					}
				},
				MuiCardHeader: {
					styleOverrides:{
						root:{
							backgroundColor: useMode('#111', '#ABC9FF'),
						}
					}
				}
			}
		})
	, [mode])

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				{children}
			</ThemeProvider>
		</ColorModeContext.Provider>
	)
}
