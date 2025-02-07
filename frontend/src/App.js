import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  IconButton,
  Divider,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2D2D2D',
            '&:hover': {
              backgroundColor: '#353535',
            },
            '&.Mui-focused': {
              backgroundColor: '#353535',
            },
          },
        },
      },
    },
  },
});

function App() {
  const [code, setCode] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const textFieldRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim() || loading) return;

    const newCode = code;
    setCode('');
    setLoading(true);

    // Add user's code to conversations
    setConversations(prev => [...prev, {
      type: 'user',
      content: newCode
    }]);

    try {
      const response = await axios.post('http://localhost:3000/review-code', {
        code: newCode,
      });
      
      // Add AI's response to conversations
      setConversations(prev => [...prev, {
        type: 'ai',
        content: response.data.feedback
      }]);
    } catch (err) {
      setConversations(prev => [...prev, {
        type: 'error',
        content: err.response?.data?.error || 'An error occurred while reviewing the code'
      }]);
    } finally {
      setLoading(false);
      if (textFieldRef.current) {
        textFieldRef.current.focus();
      }
    }
  };

  const MessageBubble = ({ message }) => (
    <Box
      sx={{
        width: '100%',
        py: 3,
        px: 2,
        backgroundColor: message.type === 'user' ? 'transparent' : 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: '4px',
              backgroundColor: message.type === 'user' ? '#444654' : '#19C37D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            {message.type === 'user' ? 'U' : 'AI'}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              component="div"
              sx={{
                whiteSpace: 'pre-wrap',
                fontFamily: message.type === 'user' ? 'monospace' : 'inherit',
                fontSize: '14px',
                lineHeight: 1.6,
              }}
            >
              {message.content}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',
        backgroundColor: 'background.default' 
      }}>
        {/* Messages Area */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {conversations.length === 0 ? (
            <Box sx={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <Typography variant="h4" color="text.secondary" sx={{ opacity: 0.7 }}>
                Paste your code to get started
              </Typography>
            </Box>
          ) : (
            conversations.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input Area */}
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              position: 'relative',
              boxShadow: '0 0 15px rgba(0,0,0,0.1)',
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={12}
              variant="outlined"
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              ref={textFieldRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  fontFamily: 'monospace',
                  fontSize: '14px',
                },
              }}
            />
            <Box sx={{ 
              position: 'absolute', 
              bottom: 8, 
              right: 8,
              display: 'flex',
              gap: 1
            }}>
              {loading && (
                <CircularProgress size={24} sx={{ mr: 1 }} />
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !code.trim()}
                sx={{
                  textTransform: 'none',
                  borderRadius: '8px',
                }}
              >
                Review Code
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 