import formidable from 'formidable';

const parseFile = async (req) => {
    return new Promise((resolve, reject) => {
        let options = {
            maxFileSize: 100 * 1024 * 1024, //100 MBs converted to bytes,
            allowEmptyFiles: false
        }

        const form = formidable(options);

        form.on('error', error => {
            reject(error.message)
        })

        form.on('data', data => {
            if (data.name === "successUpload") {
                resolve(data.value);
            }
        })

        form.parse(req, (err, fields, files) => {});
    })
}

export default parseFile;
