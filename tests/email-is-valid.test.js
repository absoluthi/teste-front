const emailIsValid = require('../src/app/utils/email-is-valid');
describe("Função de validar e-mail", () => {
  test("Teria que retornar se o email é válido (email)", () => {
    // actual test
    expect(emailIsValid('thiagoqcaetano@gmail.com')).toEqual(true)
  });
});