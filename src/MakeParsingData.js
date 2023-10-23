import path from 'path';
import fs from 'fs';

const makeParsingData = (filepath1, filepath2) => {
    const absolutePath1 = path.resolve(process.cwd(), filepath1);
    const absolutePath2 = path.resolve(process.cwd(), filepath2);

    const data1 = JSON.parse(fs.readFileSync(absolutePath1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(absolutePath2, 'utf-8'));

};

export default makeParsingData;