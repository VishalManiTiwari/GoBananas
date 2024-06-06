import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, List, ListItem, ListItemText, Typography, Collapse, Card, CardContent } from '@mui/material';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="app-container">
      <Typography variant="h4" className="title">Item List</Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearch}
      />
      <List>
        {filteredItems.map(item => (
          <div key={item.id}>
            <ListItem button onClick={() => handleExpand(item.id)} className="list-item">
              <ListItemText primary={item.title} />
            </ListItem>
            <Collapse in={expandedItemId === item.id} timeout="auto" unmountOnExit>
              <Card className="detail-card">
                <CardContent>
                  <Typography variant="body1">{item.body}</Typography>
                </CardContent>
              </Card>
            </Collapse>
          </div>
        ))}
      </List>
    </Container>
  );
};

export default App;