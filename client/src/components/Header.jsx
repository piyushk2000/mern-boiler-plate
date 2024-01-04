import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && ( event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Vibe Vault', link: '/' },
    { text: 'My Vibe', link: '/myvibe' },
    { text: 'Vibe Match', link: '/vibematch' },
    { text: 'Profile', link: '/profile' },
  ];

  return (
    <AppBar position="static" color="default" className="bg-slate-200">
      <Toolbar className='max-w-6xl mx-auto'>
        <Hidden smUp>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} component={Link} to={item.link} onClick={toggleDrawer(false)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Hidden smDown>
          <div>
            {menuItems.map((item, index) => (
              <Link key={index} to={item.link} style={{ marginRight: '20px' }}>{item.text}</Link>
            ))}
          </div>
        </Hidden>
        {currentUser ? (
          <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
        ) : (
          <Link to='/profile'>Sign In</Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
