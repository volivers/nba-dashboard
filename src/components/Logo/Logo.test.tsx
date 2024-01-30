import { render } from '@testing-library/react';
import Logo, { LogoProps } from './Logo';

describe('Logo', () => {
  let props: LogoProps;

  beforeEach(() => {
    props = { name: 'Test' };
  });

  it('renders properly', () => {
    const { container } = render(<Logo {...props} />);

    expect(container).toMatchSnapshot();
  });
});
