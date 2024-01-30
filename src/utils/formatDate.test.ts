import { formatDate } from './formatDate';

describe('formatDate', () => {
  const date = '2024-01-01T00:00:00.000Z';

  it('converts date to DD/MM/YYYY format', () => {
    const result = formatDate(date);

    expect(result).toBe('01/01/2024');
  });
});
