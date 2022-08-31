import React, { useContext } from 'react'
import { 
	Drawer,
	Box,
	List,
	Typography,
	ListItem,
	ListItemIcon,
	ListItemText,
	Divider
} from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import { UIContext } from '../context/ui/ui-context'

const menuItems: string[] = ['Inbox', 'Starred', 'Send', 'Drafts'] 

export const Sidebar: React.FC = () => {
	const { sidemenuOpen, closeSideMenu } = useContext(UIContext)

  return (
    <Drawer
			anchor='left'
			open={sidemenuOpen}
			onClose={closeSideMenu}
		>
			<Box sx={{ width: 250, fontStyle: 'italic' }}>
				<Box sx={{ padding: '5px 10px', backgroundColor: '#777', color: '#222' }}>
					<Typography variant='h4'>Menu</Typography>
				</Box>
				<List>
					{
						menuItems.map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{ 
										index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />
									}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))
					}
				</List>
				<Divider />
				<List>
					{
						menuItems.map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{ 
										index % 2 ? <InboxOutlinedIcon /> : <MailOutlineOutlinedIcon />
									}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))
					}
				</List>
			</Box>
    </Drawer>
  )
}
