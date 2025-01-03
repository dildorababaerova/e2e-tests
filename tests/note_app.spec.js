const { test, expect, describe, beforeEach} = require('@playwright/test')

describe('Note app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3001/api/testing/reset')
        await request.post('http://localhost:3001/api/users', {
        data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
      }
    })
        await page.goto('http://localhost:5173')
    })

    test('front page can be opened', async ({ page }) => {
        const locator = await page.getByText('Notes')
        await expect(locator).toBeVisible()
        await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
        })
    
        test('login fails with wrong password', async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()
        
            await expect(page.getByText('wrong credentials')).toBeVisible()
          })
    
    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'login' }).click()
            await page.getByTestId('username').fill("mluukkai")
            await page.getByTestId('password').fill("salainen")
            await page.getByRole('button', { name: 'login' }).click()
        })

        test('a new note can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'reveal notes' }).click()
            await page.getByRole('button', { name: 'add new note' }).click()
            await page.getByRole('textbox').fill('a note created by playwright 2.1.2025')
            await page.getByRole('button', { name: 'save' }).click()
            await expect(page.getByText('a note created by playwright 2.1.2025')).toBeVisible()
      })

        describe('and a note exists', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'reveal notes' }).click()
                await page.getByRole('button', { name: 'add new note' }).click()
                await page.getByRole('textbox').fill('check important button')
                await page.getByRole('button', { name: 'save' }).click()
            })

            test('it can be made important', async ({ page }) => {
                
                await page.getByRole('button', { name: 'make not important' }).click()
                await expect(page.getByText('make important')).toBeVisible()
            })
        })

    })
})