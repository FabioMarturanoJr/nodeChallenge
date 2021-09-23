# nodeChallenge

## desafio proposto

Situação:

Um cliente chegou na loja e comprou 5 cookies. O barista olhou o pedido e ficou desesperado, havia somente 2 cookies na loja.
Ele teve que explicar ao cliente o ocorrido e o cliente foi embora, essa situação não aconteceria se o pessoal do TI estivesse controlado o estoque.

Sobre:

Você foi designado a resolver esse problema e precisa estruturar todo sistema de estoque e produtos para evitar acontecer novamente.

Requisitos:

O estoque nada mais é que controlar quantos ingredientes tem na loja, além de cookie em uma cafeteria tem outros ingredientes como café em pó, leite, entre outros.
Para organizar melhor crie uma estrutura de ingrediente com nome, unidade de medida e preço unitario.

Antes de ter um estoque você precisa ter um produto com algumas coisas basicas que o cliente precisa saber como: nome, imagem, preço e os ingredientes que esse produto tem. 
Porém temos um problema aqui, o ingrediente é só uma referencia a o que foi usado ele não tem quantidade, então você precisa fazer um novo objeto que faça referência a esse ingrediente com a quantidade que é usado, nós chamamos de componente.

Agora você já tem as informações basicas para controlar o estoque, organize em um objeto para que o cliente consiga visualizar os ingredientes da loja e quanto tem de estoque atualmente.

Ufa, tudo pronto, mas ainda o problema não foi resolvido, você só esta controlando quanto tem, faça uma rota de verificação para saber se o produto X pode ser vendido.

Como você não tem acesso ao PDV faça uma rota de controle manual para o dono da loja imputar os valores do estoque.

O dono é quem cadastra todas as informações da loja, inclusive o upload da imagem, então será necessario uma rota para CRUD dessas informações.
Além disso alterar as informações é restrito então essas rotas especificas precisa de um login para controlar.

Situação resolvida, agora o cliente pediu novas alterações, como sempre. Ele precisa de um relatório para saber o custo dos produtos, você tem essas informações de quanto custa o ingrediente e de quanto vai no produto.
Precisamos de uma rota que retorne todos os produtos e o custo de cada um.

Observações técnicas:
- Validar todos os campos para ninguem quebrar a loja
- Login precisa ser criptografado a senha
- Documentar para entendimento do código. (comentar algumas coisas explicando)
- Tratar erros corretamente (404 para não encontrado), (200 | 202 para OK), etc

Requisitos:
- Utilizar NodeJS como backend
- Validar as rotas utilizando JWT ou Oauth2
- Salvar em um banco de dados as informações

Diferenciais:
- Banco de dados MongoDB
- Utilizar NestJS
- Utilizar TypeScript
- Upload de imagens (deixar somente PNG e JPG)

Lembrando que os diferenciais são algo a mais, então só faça caso ja tenha conhecimento e esteja familiarizado. 

## Desenvolvido

API desenvolvida em `NodeJs` com o auxilio da ferramentas: `body-parser`, `express`, `jsonwebtoken`, `mongodb`, `multer`e `nodemon`, onde o sistema conta com a criação do usuário e login, retornando um token de autenticação, utilizado nas rotas de criação, alteração e deleção, não necessário para apenas leitura. Pode-se cadastrar e listar todos os ingredientes que serão consumidos no cadastro dos produtos. Ao cadastrar os produtos é realizado uma atualização do estoque conforme a quantidade gasta de cada matéria prima e calculada o valor total do produto, levando em consideração o valor de cada ingrediente, a imagem é cadastrada em uma rota separada e o objeto do produto é atualizado com sua rota ficando disponivel via URL.
É possível atualizar e deleta os produtos e o sistema recalculará o preço do produto se necessário e atualizará o estoque confome. 

Ao total foram desenvolvidos 11 rotas, 1 para compartilhamentos dos arquivos salvos e 10 para interação com o cliente.

### As rotas são:

- `POST/users` cadastra os usuário no banco de dados possibilitando o login posteriormente, são feitas 3 validações, se os campos estão preenchidos, se o usuário já não é cadastrado e se o email é valido.

estrutura esperada:

```json
{"name": "userName", "email": "EmailValido@gmail.com", "password": "1234567" }
```

- `POST/login` realiza o login do cliente, retornando uma token de autenticação válido por 25 minutos.

estrutura esperada:

```json
{ "email": "EmailValido@gmail.com", "password": "1234567" }
```

- `GET/ingredients` retorna os ingredientes cadastrados, sem body esperado e sem validações.

- `POST/ingredient` cadastra ingredientes, é validado se o login foi feito(retorno do token), se o ingrediente é valido, calcula valor total do produto e adiciona o obj referente a ele.

estrutura esperada: 
```json
{
  "name": "nomeIngrediente",
  "price": 2, // Precisa ser numero
  "measures": "un", // líquidos cadastrar em mililitros = ml, sólidos fracionados em gramas = g e unitários em unidade = un
  "quantity": 50 // número respeitando a unidade de medida
  }
```
- `GET/products` retorna os produtos cadastrados, sem body esperado e sem validações.

- `GET/product/:id` fala se o produto poder ser vendido ou não, levando sem consideração a quantidade gasta de cada ingradiente e a quantidade existente deles em estoque, espera o ID na rota e valida se existe o produto.

- `GET/:id.png` retorna a imagem cadastrada, na rota que será explicada posteriormente.

- `POST/product` valida se esta logado (token), valida o produto, verifica o estoque se em ingredientes suficiente para cadastrar mais um produto, cadastra o produto e consome as matérias primas utilizadas.

estrutura esperada: 
```json
{
    "name": "nomeProduto",
    "ingredients": [ // é necessário cadastrar os ingredientes anteriormente para que o consumo deles funcione corretamente 
        {
            "ingredientId": "614b3ecfabde942556ef474a",
            "quantityUsed": 5
        }
    ]
}
```
- `POST/product/upload/:id` upload da imagem do produto e registra o caminho dela no registro do produto, valida se esta logado (token), se o produto existe, se foi enviado algum arquivo e se é uma imagem `PNG` ou `JPG`, 

estrutura esperada: 

`um form-data 'KEY' = file e um arquivo PNG ou JPG`


- `PUT/product/:id` atualiza o produto name e ingredients, valida se esta logado, se existe o produto, analisa o estoque antes da atualização e recalcula o valor o produto, atualiza as quantidades dos ingrediente em estoque conforme a quantidade usada.

estrutura esperada: 
```json
{
    "name": "nomeProduto",
    "ingredients": [
        {
            "ingredientId": "614b3ecfabde942556ef474a",
            "quantityUsed": 10
        }
    ]
}
```

- `DELETE/product/:id` apaga o produto, restaura no estoque dos ingredientes as matérias primas consumidas, valida o login, e se o produto existe.


## Observações finais

Estou satisfeito com o resultado atingido, parando para analisar sempre tem algo a melhorar mas ao mesmo tempo tenho o sentimento de trabalho bem feito, independente do resultado do meu teste utilizei esse desafio para consolidar os conceitos aprendidos na Trybe a fim de atingir meus objetivos.
