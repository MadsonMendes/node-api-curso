import fs from 'fs'; // Lib FileSystem, serve pra ler arquivos

const path = './database.json'; // Caminho para o JSON da database mockada

class Helper {
    // Lê o arquivo database.json
    read() {
        const file = fs.readFileSync(path, 'utf8')
        return JSON.parse(file) // Retorna o arquivo já em JSON
    }
    // Escreve no arquivo database.json
    write(data) {
        fs.writeFile(path, data, 'utf8', (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
}

const helper = new Helper(); // Exporta o objeto já criado


export default helper;