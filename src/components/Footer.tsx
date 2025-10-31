import { Box, Container, Typography, Link } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

export function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <BusinessIcon
              sx={{
                fontSize: 20,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                color: 'white',
                borderRadius: 1,
                p: 0.5,
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Softuvo Solutions Pvt. Ltd.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              - Innovative Software Development
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              © {currentYear} Therapy Notes
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                  transition: 'color 0.2s',
                }}
              >
                Privacy
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    color: 'primary.main',
                  },
                  transition: 'color 0.2s',
                }}
              >
                Terms
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

