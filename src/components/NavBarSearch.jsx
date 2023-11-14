import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  backgroundColor: alpha('#016eea', 0.15),
  '&:hover': {
    backgroundColor: alpha('#016eea', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// used for searchbar
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// used for searchbar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));



const SearchTextField = styled(TextField)({
  backgroundColor: '#d1e5fc',
  borderRadius: '4px',
  border: '',
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
    <Search>
    <SearchIconWrapper>
      <SearchIcon sx={{color: '#818181'}}/>
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search…"
      size="small"
      value={searchQuery}
      onChange={handleSearch}
      inputProps={{ 
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        )
      }}
    />
    </Search>

    // <SearchTextField
    // placeholder="Search…"
    //   variant="outlined"
    //   size="small"
    //   value={searchQuery}
    //   onChange={handleSearch}
    //   InputProps={{
    //     startAdornment: (
    //       <InputAdornment position="start">
    //         <SearchIcon color="action" />
    //       </InputAdornment>
    //     ),
    //     sx: {
    //       '& .MuiOutlinedInput-input': {
    //         padding: '10px 14px',
    //       },
    //       '& .MuiInputAdornment-root': {
    //         marginRight: '-8px',
    //       },
    //       '& .MuiInputBase-root': {
    //         height: '36px',
    //       },
    //       '& .MuiOutlinedInput-root': {
    //         boxShadow: 'none',
    //         '&:hover .MuiOutlinedInput-notchedOutline': {
    //           borderColor: 'rgba(0, 0, 0, 0.2)',
    //         },
    //         '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    //           borderColor: '#66BB6A',
    //         },
    //       },
    //     },
    //   }}
    // />
  );
}

export default SearchBar;