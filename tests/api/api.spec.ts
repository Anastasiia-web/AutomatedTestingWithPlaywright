import { test, expect } from '@playwright/test'

test.describe.parallel('API Testing', () => {
    const baseUrl = 'https://reqres.in/api'

    test('API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/2`)             //  user with 'id: 2'
        expect(response.status()).toBe(200)
    })

    test('API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)             // 404 - not found
    })

    test('GET Request - Get User Details', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`)              //  user with 'id: 1'
        const responseBody = JSON.parse(await response.text())
        // console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.email).toBeTruthy()
        /*Use when you don't care what a value is, you just want to ensure a value is true in a boolean context. In JavaScript, there are six falsy values: false, 0, '', null, undefined, and NaN. Everything else is truthy.*/
    })

    test('POST Request - Create New User', async ({ request }) => {
        const response = await request.post(`${baseUrl}/users`, {
            data: {
                "name": "mynameee",
                "job": "qa"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(201)
        expect(responseBody.name).toBe('mynameee')
        expect(responseBody.job).toBe('qa')
        expect(responseBody.id).toBeTruthy()                                  // to check that it's not empty or is not missing
        expect(responseBody.createdAt).toBeTruthy()                           // to check that it's not empty or is not missing
    })

    test('POST Request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()                               // to check that it's not empty or is not missing
    })

    test('POST Request - Failed Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })

    test('PUT Request - Update User', async ({ request }) => {
        const response = await request.put(`${baseUrl}/users/330`, {
            data: {
                "job": "qa automation",
            }
        })
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.updatedAt).toBeTruthy                              // to check that it's not empty or is not missing
        expect(responseBody.job).toBe('qa automation')
    })

    test('DELETE Request - delete User', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/users/2`)

        expect(response.status()).toBe(204)
    })
})

// npm run tests:api