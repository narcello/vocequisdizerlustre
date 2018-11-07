import testeHttpsBasico, { testeAddMarcadorViaHttps } from '../../firebase/soa'

it('Test https call function', async () => {
  const res = await testeHttpsBasico()
  expect(res).toEqual('httpsbasico')
});

it.skip('Test addMarcadorViaHttps', async () => {
  const res = await testeAddMarcadorViaHttps()
  expect(res).toEqual('addMarcadorViaHttps')
});
