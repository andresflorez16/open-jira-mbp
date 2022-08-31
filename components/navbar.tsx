import React from 'react'
import NextLink from 'next/link'
import { AppBar, Toolbar, Typography, Link } from '@mui/material'

export const Navbar = () => {
  return (
    <AppBar position='sticky'  >
			<Toolbar>
				<NextLink href='/'>
					<Link
						underline='none'
						sx={{ cursor: 'pointer' }}
					>
						<Typography variant='h4' fontWeight='bold'>My OpenJira</Typography>
					</Link>
				</NextLink>
			</Toolbar>
    </AppBar>
  )
}
