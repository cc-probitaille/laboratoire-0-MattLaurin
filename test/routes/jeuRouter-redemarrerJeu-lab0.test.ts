// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
import supertest from 'supertest';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const testNom1 = 'Jean-Marc-in-redemarrerJeu';
const testNom2 = 'Pierre-in-redemarrerJeu';

const request = supertest(app);

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
    
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(2);
});

// describe('redemarrerJeu.test.ts', () => {
//   it("devrait implémenter test", async () => {
//     throw new Error("Ce test n'a pas été défini")
//   });
// });

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  
  it("Devrait réussir a redemarrer le jeu", async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu').send({ nom: testNom1 });
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("Devrait avoir remis a zero les lancers des joueurs", async () => {
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });

  it('devrait contenir un test pour jouer qui retourne 404 (après redemarrerJeu())', async () => {
    const response = await request.get('/api/v1/jeu/jouer/' + testNom1);
    expect(response.status).toBe(404); 
    expect(response.type).toBe('application/json');
    expect(response.body.error).toInclude("n'existe pas");
  });

});