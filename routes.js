import { Router } from 'express';
import helper from './helper.js';
const router = Router();

const database = helper.read() // Essa constante vai ser usada no código inteiro, é o acesso à database

// ROTAS DE LIVROS

router.get('/livros', (req, res) => {
    const livros = database.livros
    res.send(livros)
});

router.get('/livros/:id', (req, res) => {
    const userId = req.params.id;
    const livros = database.livros
    const livro = livros.find(livro => livro.id === Number(userId)) // Retorna o objeto do livro que tem o ID igual o da URL | O Number() é para transformar o ID da url, que é uma string, em número;
    if (livro) {
        res.send(livro);
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

// Rota para cadastrar um novo livro
router.post('/livros', (req, res) => {
    const livro = req.body;
    if ('titulo' in livro && 'autor' in livro && 'ano' in livro) { // Validação simples, apenas garante que esses campos existem, não tem validação se estão no formato correto
        database.livros.push(livro); // Adiciona um novo livro ao array de livros da database
        helper.write(JSON.stringify(database)); // Reescreve todo o JSON, agora com o novo livro
        res.send('Livro cadastrado com sucesso!')
    } else {
        res.status(400).send('Requisição inválida');
    }
})

// Rota para deletar um livro pelo ID
router.delete('/livros/:id', (req, res) => {
    const userId = req.params.id;
    const livros = database.livros
    const livroIndex = livros.findIndex(livro => livro.id === Number(userId)); // Encontra qual o index do livro a ser deletado, pelo Id da URL
    if (livroIndex >= 0 && livroIndex < livros.length) { // Verifica se o ID solicitado está dentro do intervalo da array
        livros.splice(livroIndex, 1); // Deleta o livro da array pelo index 
        helper.write(JSON.stringify(database)); // Reescreve todo o JSON, agora sem o livro deletado
        res.send('Livro deletado com sucesso')
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

// Rota para atualizar um livro pelo ID
router.put('/livros/:id', (req, res) => {
    const userId = req.params.id;
    const livro = req.body;
    const livros = database.livros
    const livroIndex = livros.findIndex(livro => livro.id === Number(userId));
    if (livroIndex >= 0 && livroIndex < livros.length) {
        livros[livroIndex] = livro;
        helper.write(JSON.stringify(database));
        res.send('Livro atualizado com sucesso')
    } else {
        res.status(404).send('Livro não encontrado');
    }
});

// Rota de usuários
// Não tem comentário porque é tudo igual ao de cima


// Rota para obter todos os usuários
router.get('/usuarios', (req, res) => {
    const usuarios = database.usuarios
    res.send(usuarios)
});

// Rota para obter um usuário específico pelo ID
router.get('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const usuarios = database.usuarios
    const usuario = usuarios.find(usuario => usuario.id === Number(userId));
    if (usuario) {
        res.send(usuario);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// Rota para cadastrar um novo usuário
router.post('/usuarios', (req, res) => {
    const usuario = req.body;
    if ('nome' in usuario && 'id' in usuario && 'livros_emprestados' in usuario) {
        database.usuarios.push(usuario);
        helper.write(JSON.stringify(database));
        res.send('Usuário cadastrado com sucesso!')
    } else {
        res.status(400).send('Requisição inválida');
    }
});

// Rota para deletar um usuário pelo ID
router.delete('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const usuarios = database.usuarios
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === Number(userId));
    if (usuarioIndex >= 0 && usuarioIndex < usuarios.length) {
        usuarios.splice(usuarioIndex, 1);
        helper.write(JSON.stringify(database));
        res.send('Usuário deletado com sucesso')
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

// Rota para atualizar um usuário pelo ID
router.put('/usuarios/:id', (req, res) => {
    const userId = req.params.id;
    const usuario = req.body;
    const usuarios = database.usuarios
    const usuarioIndex = usuarios.findIndex(usuario => usuario.id === Number(userId));
    if (usuarioIndex >= 0 && usuarioIndex < usuarios.length) {
        usuarios[usuarioIndex] = usuario;
        helper.write(JSON.stringify(database));
        res.send('Usuário atualizado com sucesso')
    } else {
        res.status(404).send('Usuário não encontrado');
    }
});

export default router;