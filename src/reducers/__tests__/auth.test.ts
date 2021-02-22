import authReducer from '../auth';

describe('auth reducer', () => {
  it('login succeeded', () => {
    const token = 'jwt';
    expect(
      authReducer(undefined, {
        type: 'LOGIN_SUCCEEDED',
        payload: {
          data: {
            token: token,
          },
        },
      }),
    ).toEqual({
      device: {
        expiry: null,
        token: null,
      },
      token: token,
      error: null,
    });
  });

  it('login failed', () => {
    const error = {
      data: {
        token: 'error',
      },
    };

    expect(
      authReducer(undefined, {
        type: 'LOGIN_FAILED',
        payload: error,
      }),
    ).toEqual({
      device: {
        expiry: null,
        token: null,
      },
      token: null,
      error: error,
    });
  });
});
