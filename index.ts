import fs from 'fs/promises';
import { xml2json, json2xml } from 'xml-js';
import { gunzip, gzip } from './utils/zlib';
import { mkdir } from './utils/file';

const alsToJson = async (filePath: string): Promise<void> => {
    const fileContent = await fs.readFile(filePath);
    const unzippedALS = await gunzip(fileContent);
    const json = xml2json(unzippedALS.toString(), { compact: true, spaces: 4 });
    await mkdir('json');
    await fs.writeFile('json/als.json', json);
};

const jsonToAls = async (filePath: string): Promise<void> => {
    const fileContent = await fs.readFile(filePath);
    const xml = json2xml(fileContent.toString(), { compact: true, spaces: 4 });
    await mkdir('xml');
    const zipped = await gzip(xml);
    await fs.writeFile('als.als', zipped);
};

alsToJson('ableton-files/default-project/default-project.als');

jsonToAls('json/als.json');
