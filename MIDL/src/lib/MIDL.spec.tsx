import { render } from '@testing-library/react';

import MIDL from './MIDL';

describe('MIDL', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MIDL />);
    expect(baseElement).toBeTruthy();
  });
});
