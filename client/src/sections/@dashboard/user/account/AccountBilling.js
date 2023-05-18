import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { Grid, Stack } from '@mui/material';
//
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';

// ----------------------------------------------------------------------

AccountBilling.propTypes = {
  cards: PropTypes.array,
  invoices: PropTypes.array,
};

export default function AccountBilling({ cards, invoices }) {
  const [open, setOpen] = useState(false);

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AccountBillingPaymentMethod
            cards={cards}
            isOpen={open}
            onOpen={() => setOpen(!open)}
            onCancel={() => setOpen(false)}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
