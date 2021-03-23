const formatValue = require('../src/app/utils/format-value');
describe("Função de formatar valor", () => {
  test("Teria que retornar um valor formatado (valor, tipo)", () => {
    // actual test
    expect(formatValue('45410808851', 'cpf')).toEqual('454.108.088-51')
  });
});