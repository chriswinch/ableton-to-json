import zlib from 'zlib';

export const gunzip = (buffer: Buffer) : Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        zlib.gunzip(buffer, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
