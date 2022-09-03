import React, { useContext } from 'react'
import NextLink from 'next/link'
import { AppBar, Toolbar, Typography, Link, Button, Box } from '@mui/material'
import { ColorModeContext } from '../lib/themes/theme-context'

export const Navbar = () => {
	const { toggleColorMode } = useContext(ColorModeContext)
  return (
		<AppBar 
			position='sticky'
		>
			<Toolbar
				sx={{
					display: 'flex',
					justifyContent: 'space-between'
				}}
			>
				<NextLink href='/'>
					<Link
						underline='none'
						sx={{ cursor: 'pointer' }}
					>
						<Typography variant='h4' color='primary' fontWeight='bold'>My OpenJira</Typography>
					</Link>
				</NextLink>
				<Button onClick={toggleColorMode}>theme</Button>
			</Toolbar>
		</AppBar>
  )
}
