const giveNickName = require('../src/app/utils/give-nickname');
describe("Função de formatar valor", () => {
  test("Teria que retornar um valor formatado (valor, tipo)", () => {
    // actual test
    expect(giveNickName('Thiago Queiroz Caetano')).toEqual('TQC')
  });
});