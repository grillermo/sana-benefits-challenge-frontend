import { shallow } from 'enzyme';

import SignUp from './SignUp';

describe('SignUp', () => {
  test('renders successfully', () => {
    const tree = shallow(<SignUp />);

    expect(tree).toMatchSnapshot();
  });
});
