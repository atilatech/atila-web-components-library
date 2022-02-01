import { render, screen } from '@testing-library/react';
import { Currencies } from '.';

describe('Currency.class', () => {
    it('should have non-zero USD exchange rate for all currencies', async () => {

        for (let currencyCode in Currencies) {
            let currency = Currencies[currencyCode];
            expect(currency.USD).toBeGreaterThan(0)
        }
    });
})