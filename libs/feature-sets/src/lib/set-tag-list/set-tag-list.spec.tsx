import { render } from '@testing-library/react';

import SetTagList from './set-tag-list';

describe('SetTagList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SetTagList />);
    expect(baseElement).toBeTruthy();
  });
});
