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
      token: null,
      error: error,
    });
  });
});
