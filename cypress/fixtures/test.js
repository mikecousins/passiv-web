
        // confirm we have logged in successfully
        export const loginsuccess = (type) => {
            let endpoint = '/app/'
            if (type === 'dashboard') {
                endpoint = endpoint.concat('/dashboard')
            }
        }

        export const email = 'alex.sutherland@passiv.com'
        export const pass  = 'test12345@'

