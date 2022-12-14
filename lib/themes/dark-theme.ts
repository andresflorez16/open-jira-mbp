import { createTheme } from '@mui/material'

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90caf9'
		},
		secondary: {
			main: '#222'
		},
		background: {
			default: '#222'
		},
	},
	components: {
		MuiAppBar: {
			defaultProps: { 
				elevation: 0
			},
			styleOverrides: {
				root: {
					backgroundColor: '#111',
				}
			}
		},
		MuiCardHeader: {
			styleOverrides:{
				root:{
					backgroundColor: '#777',
				}
			}
		}
	}
})
