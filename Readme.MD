Para testar a lógica em JavaScript com unit tests, você pode usar uma estrutura de teste como o Jest, que é uma das opções populares para testes de JavaScript. Vou mostrar um exemplo simples de como criar testes para a lógica que você definiu.

Certifique-se de que você tenha o Node.js e o npm (ou yarn) instalados em seu ambiente de desenvolvimento.

Passo 1: Configuração do Projeto
Primeiro, você precisa criar uma estrutura básica de diretórios e arquivos para o projeto de testes. Você pode seguir as etapas abaixo:

Crie uma pasta para o projeto de testes (por exemplo, "test-sintomas-handler").
Navegue para a pasta do projeto de testes e execute npm init -y para inicializar um projeto Node.js com configurações padrão.
Instale a biblioteca de testes Jest executando npm install jest --save-dev.
Passo 2: Escrevendo Testes
Agora, você pode começar a escrever seus testes. Vamos criar um arquivo de teste chamado "sintomas-handler.test.js" na pasta raiz do projeto de testes.

javascript
Copy code
// sintomas-handler.test.js

const { SintomaHandlerChain, Doente } = require('./seu-arquivo-com-logica');

describe('SintomaHandlerChain', () => {
  test('deve definir a pulseira corretamente para dor no peito e dormência no braço', () => {
    const sintomaHandlerChain = new SintomaHandlerChain();
    const paciente = new Doente(['Dor no peito', 'Dormência no braço']);
    const definirPulseiraSpy = jest.spyOn(paciente, 'definirPulseira');

    sintomaHandlerChain.avaliarSintomas(paciente);

    expect(definirPulseiraSpy).toHaveBeenCalledWith('Vermelha');
  });

  test('deve definir a pulseira corretamente para diarreia', () => {
    const sintomaHandlerChain = new SintomaHandlerChain();
    const paciente = new Doente(['Diarreia']);
    const definirPulseiraSpy = jest.spyOn(paciente, 'definirPulseira');

    sintomaHandlerChain.avaliarSintomas(paciente);

    expect(definirPulseiraSpy).toHaveBeenCalledWith('Vermelha');
  });

  // Adicione mais testes aqui, se necessário
});
Certifique-se de substituir './seu-arquivo-com-logica' pelo caminho relativo ao arquivo onde você definiu suas classes e lógica.

Passo 3: Executando os Testes
Agora, você pode executar seus testes usando o Jest. Abra um terminal na pasta do projeto de testes e execute o seguinte comando:

Copy code
npx jest
O Jest executará seus testes e mostrará os resultados no terminal.

Lembre-se de que este é apenas um exemplo básico. Você pode adicionar mais testes para cobrir diferentes cenários e lógica em sua aplicação.

Certifique-se de ler a documentação do Jest para obter mais informações sobre recursos avançados e configurações: https://jestjs.io/docs/getting-started