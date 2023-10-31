import { useState } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchTextField = styled(TextField)({
  backgroundColor: '#fff',
  borderRadius: '4px',
  width: '25%',
});

function SearchBar(messages) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch  = (e) => {
    const query = e.target.value.toLowerCase()

    // filter messages based on the search query
/*      const filteredMessages = messages.filter(
      (message) => message.title.toLowerCase().indexOf(query) !== -1 || message.category.toLowerCase().indexOf(query) !== -1
    ); */
    
    //setFilteredMessages(filteredMessages);
    setSearchQuery(query); 
    messages.onSearch(query);
  };

  return (
    <SearchTextField
    placeholder="Search…"
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={handleSearch}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        sx: {
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
          },
          '& .MuiInputAdornment-root': {
            marginRight: '-8px',
          },
          '& .MuiInputBase-root': {
            height: '36px',
          },
          '& .MuiOutlinedInput-root': {
            boxShadow: 'none',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#66BB6A',
            },
          },
        },
      }}
    />
  );
}

export default SearchBar;