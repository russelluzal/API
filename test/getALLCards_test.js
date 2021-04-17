const expect = require('chai').expect;
const supertest = require('supertest');
const faker = require('faker');
const request = supertest('https://nazarov-kanban-server.herokuapp.com');
let response;
// let cardsId = []
describe('GET ALL CARDS', () => {
    before(async () => {
        const cards = (await request.get('/card')).body
        console.log(cards);
        cards
            .map(card => card._id)
            .forEach(el => {
                request.delete(`/card/${el}`)
                    .then(res => {
                        console.log(res.body);
                    })
                    .catch(err => console.log(err));
            });
    });
    it('should return 200 response', () => {
        expect(response.status).equal(200);
    });
    it('should return 200 response 1', () => {
        expect(response.body).to.be.an('array');
    });
    it('should return 200 response 2', () => {
        let isError = false;
        response.body.forEach(el => {
            if (!(el.hasOwnProperty('priority') && el.hasOwnProperty('description') && el.hasOwnProperty('name'))) {
                isError = true;
            }
        });
        expect(isError).eq(false);
    });
});
describe.skip('Create new card', () => {
    it('Create new card', async () => {
        let arrLength = response.body.length;
        let newCard = {
            description: 'newCard',
            priority: 2,
            status: 'to do',
            name: 'Andrey privet',
        };
        await request
            .post('/card')
            .send(newCard)
            .set('Accept', 'application/json');
        let responseNew;
        await request.get('/card')
            .then(res => {
                responseNew = res;
            });
        expect(responseNew.body.length).equal(arrLength + 1);
    });
});