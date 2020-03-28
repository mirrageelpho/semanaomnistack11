const supertest = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONGS', () => {

    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy();
    })

    it('should be create a ong', async () => {
        const response = await supertest(app) //seleciono o servidor
            .post('/ongs')//indico a rota
            //.set() //usado para setar variáveis no cabeçalho
            .send({
                name: "teste ong",
                email: "teste@email.com",
                whatsapp: "4700000000",
                city: "Salvador",
                uf: "BA"
            })
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})