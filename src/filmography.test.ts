import { fetch } from 'undici';
import * as cheerio from 'cheerio';
import { describe, expect, it } from 'vitest';

type Movie = {
    title: string,
    url: string;
}
const retrieveFilmographyFromId = async (alloId: string) => {
    const url = `https://www.allocine.fr/personne/fichepersonne-${alloId}/filmographie/`;
    const response = await fetch(url);
    const rawContent = await response.text();
    const $ = cheerio.load(rawContent);
    const nodes = $('td a');
    console.log(nodes.length);
    const result: Movie[] = []
    for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index];
        result.push({title: element.attribs.title, url: element.attribs.href})
    }
   
    return result;
}

const retrieveCastingFromId = async (movieId: string) => {
    const url = `https://www.allocine.fr/film/fichefilm-${movieId}/casting/`;
    const response = await fetch(url);
    const rawContent = await response.text();
    const $ = cheerio.load(rawContent);
    const nodes = $('a.meta-title-link');
   
    const result: string[] = []
    for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index];
        result.push(element.attribs.href);
    }
    return result;
}

const retrieveNameFromActorUrl = async (url: string) => {
    const response = await fetch(url);
    const rawContent = await response.text();
    const $ = cheerio.load(rawContent);
    const nodes = $('div.titlebar-title.titlebar-title-lg');
    return { name: nodes.text() };
}


describe('Filmography ', () => {

    it('should contain all movies', async () => {
        // given
        const id = '16349';
        // when
        const filmography = await retrieveFilmographyFromId(id);
        // then
        expect(filmography.length).toBeGreaterThan(20);

    });

});

describe('Casting', () => {

    it('should contain all actors', async () => {
        // given
        const movieId = '196208';
        // when
        const casting = await retrieveCastingFromId(movieId);
        // then
        expect(casting.length).toBeGreaterThan(6);

    });

});


describe('Actor page', () => {

    it('should contain actor information', async () => {
        // given
        const url = 'https://www.allocine.fr/personne/fichepersonne_gen_cpersonne=3073.html';
        // when
        const actorDescription = await retrieveNameFromActorUrl(url);
        // then
        expect(actorDescription.name).toBe('Harry Carey Jr.');

    });

});