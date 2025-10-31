import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';

export function Header(): React.JSX.Element {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 1 }}>
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
              '&:hover': {
                opacity: 0.8,
              },
              transition: 'opacity 0.2s',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                mr: 2,
              }}
            >
              <ArticleIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.2,
                }}
              >
                Therapy Notes
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.7rem',
                }}
              >
                Session Management
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: 'none',
                color: location.pathname === '/' ? 'primary.main' : 'text.secondary',
                fontWeight: location.pathname === '/' ? 600 : 500,
                fontSize: '0.95rem',
                position: 'relative',
                '&:hover': {
                  color: 'primary.main',
                },
                transition: 'color 0.2s',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: 'primary.main',
                  transform: location.pathname === '/' ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.2s',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                },
              }}
            >
              Notes
            </Typography>
            <Typography
              component={RouterLink}
              to="/new"
              sx={{
                textDecoration: 'none',
                color: location.pathname === '/new' ? 'primary.main' : 'text.secondary',
                fontWeight: location.pathname === '/new' ? 600 : 500,
                fontSize: '0.95rem',
                position: 'relative',
                '&:hover': {
                  color: 'primary.main',
                },
                transition: 'color 0.2s',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: 'primary.main',
                  transform: location.pathname === '/new' ? 'scaleX(1)' : 'scaleX(0)',
                  transition: 'transform 0.2s',
                },
                '&:hover::after': {
                  transform: 'scaleX(1)',
                },
              }}
            >
              Add Note
            </Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

