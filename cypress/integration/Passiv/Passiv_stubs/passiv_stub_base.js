
// brokerage onboarding emails
//     Alpca = test_alpaca#@passiv.com
//     Interactive = test_interactive#@passiv.com 
//     questrade = test_questrade#@passiv.com
//     td = test_td#@passiv.com
//     tradier = test_tradier#@passiv.com

//     ** The # represents a number, this corresponds to the test # **


describe('Passiv Test api stub calls', () => {
    
    const user = 'alex.sutherland@getpassiv.com'
    const pass = '5Browse8'

    it('Login Success', () => {
        cy.visit('localhost:3000/app/login')

        cy.server()

        cy.route({
            url:"/api/v1/auth/login",
            method:"POST",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/currencies",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/features",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/incentives",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/brokerages",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/subscriptions",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/authorizations",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/accounts",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/portfolioGroups",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/settings",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });
    
        cy.route({
            url:"/api/v1/plans",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });

        cy.route({
            url:"/api/v1/goals",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });

        cy.route({
            url:"/api/v1/referrals",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });

        cy.route({
            url:"/api/v1/invoices",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });



        cy.route({
            url:"/api/v1",
            method:"GET",
            status: 200,
            response: {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4MDcxLCJ1c2VybmFtZSI6IjRiVVRHWlBpZFROSDlIWW5PYjdGbXlIcDZaVXRCQiIsImV4cCI6MTYwNTAzNTkwMCwiZW1haWwiOiJhc3V0aGVybGFuZDgyMTlAZ21haWwuY29tIiwib3JpZ19pYXQiOjE2MDQ2MDM5MDB9.lz1xdxwzdQrlo7RE0qnEtHRjszFHYTWQqgOZzFGB2l8"}
        });





        cy.get('[name=email]')
        .type(user)
        .should('have.value', user)
        cy.get('[placeholder=Password]')
        .type(pass)
        .should('have.value', pass)
        cy.get('[data-cy=login-button]').click()


    })
    
    })
