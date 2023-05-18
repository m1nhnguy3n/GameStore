import { useState } from 'react';
import { paramCase } from 'change-case';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Typography, Autocomplete, InputAdornment, Popper } from '@mui/material';
// hooks
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// utils
import axios from '../../../../utils/axios';
// redux

// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import InputStyle from '../../../../components/InputStyle';
import SearchNotFound from '../../../../components/SearchNotFound';

// ----------------------------------------------------------------------

const PopperStyle = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

// ----------------------------------------------------------------------

export default function ShopProductSearch() {
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const [searchQuery, setSearchQuery] = useState('');

  const [searchResults, setSearchResults] = useState([]);

  

  const handleChangeSearch = async (value) => {
    try {
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/product/');
        const products = response.data;
        const searchList = products.filter((item) => {
          return item.productName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
        if (isMountedRef.current) {
          setSearchResults(searchList);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (name) => {
    navigate(`${PATH_DASHBOARD.eCommerce.root}/product/${paramCase(name)}`);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleClick(searchQuery);
    }
  };

   
  return (
    <Autocomplete
      size="small"
      autoHighlight
      popupIcon={null}
      PopperComponent={PopperStyle}
      options={searchResults}
      onInputChange={(event, value) => handleChangeSearch(value)}
      getOptionLabel={(product) => product.productName}
      noOptionsText={<SearchNotFound searchQuery={searchQuery} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <InputStyle
          {...params}
          stretchStart={200}
          placeholder="Search product..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
      renderOption={(props, product, { inputValue }) => {
        const { productName, image } = product;
        const matches = match(productName, inputValue);
        const parts = parse(productName, matches);

        return (
          <li {...props}>
            <Image
              alt={image}
              src={image}
              sx={{ width: 48, height: 48, borderRadius: 1, flexShrink: 0, mr: 1.5 }}
            />
            <Link underline="none" onClick={() => handleClick(productName)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  variant="subtitle2"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}
