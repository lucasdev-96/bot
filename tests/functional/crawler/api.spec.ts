import { test } from '@japa/runner'
import { Error } from 'App/enums/Crawler.enum'

const invalidLogin = {
  login: "testekonsi",
  password: "sss",
  cpf: "873.662.745-34"
}

const invalidCpf = {
  login: "testekonsi",
  password: "testekonsi",
  cpf: "873.662.745-54"
}

const correctData = {
  login: "testekonsi",
  password: "testekonsi",
  cpf: "873.662.745-34"
}

test.group('Crawler api', () => {
  test('verify login error', async ({ client }) => {
   const response = await client.post('/')
    .form(invalidLogin)
    response.assertBody({response: 'Invalid Login'})
    response.assertStatus(404)
  })
  test('verify login Sucess with invalid Cpf', async ({ client }) => {
    const response = await client.post('/')
    .form(invalidCpf)
      response.assertBody({response: Error.NOT_FOUND_REGISTRATION})
      response.assertStatus(200)
  })
  test('verify login Sucess with valid Cpf', async ({ client }) => {
    const response = await client.post('/')
    .form(correctData)
      response.assertBody({response: ['1734164104']})
      response.assertStatus(200)
  })
})
