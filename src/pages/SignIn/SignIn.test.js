import { shallow } from 'enzyme'

import SignIn from './SignIn'

describe('SignIn', () => {
  it('matches the snapshot', async () => {
    const signIn = shallow(<SignIn />)

    expect(signIn).toMatchSnapshot();
  });
})
