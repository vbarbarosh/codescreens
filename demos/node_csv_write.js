const {createObjectCsvWriter} = require('csv-writer');

// Create csv files from arrays

main().catch(panic);

// https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
async function main()
{
    const rows = [
        {email: 'rwillicott0@imageshack.us', name: 'Raffarty Willicott'},
        {email: 'aolooney1@senate.gov', name: 'Ange O\'Looney'},
        {email: 'bsorey2@bing.com', name: 'Bryna Sorey'},
    ];

    await csv_write('out.csv', rows);
}

function csv_write(path, rows)
{
    const header = Object.keys(rows[0]).map(s => ({id: s, title: s}));
    return createObjectCsvWriter({path, header}).writeRecords(rows);
}

function panic(error)
{
    console.error(error);
    process.exit(1);
}
