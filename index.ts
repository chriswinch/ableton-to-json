import fs from 'fs/promises';
import { xml2json } from 'xml-js';
import { gunzip } from './utils/zlib';
import { mkdir } from './utils/file';

const parseFile = async (filePath: string): Promise<void> => {
    const fileContent = await fs.readFile(filePath);
    const unzippedALS = await gunzip(fileContent);
    const json = xml2json(unzippedALS.toString(), { compact: true, spaces: 4 });
    await mkdir('json');
    await fs.writeFile('json/als.json', json);
};

parseFile('ableton-files/default-project/default-project.als');
