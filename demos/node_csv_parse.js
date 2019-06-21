const csv = require('neat-csv');
const fs = require('fs');
const path = require('path');

// Parsing csv files and strings

main().catch(panic);

// https://stackabuse.com/reading-and-writing-csv-files-with-node-js/
async function main()
{
    const csv = `email,name
rwillicott0@imageshack.us,Raffarty Willicott
aolooney1@senate.gov,Ange O'Looney
bsorey2@bing.com,Bryna Sorey
lbutfield3@lycos.com,Loy Butfield`;
    const filename = path.resolve(__dirname, '../input/users.csv');

    console.log(await csv_parse_file(filename));
    console.log(await csv_parse_stream(fs.createReadStream(filename)));
    console.log(await csv_parse_string(csv));
}

function csv_parse_file(file)
{
    return csv_parse_stream(fs.createReadStream(file));
}

function csv_parse_stream(stream)
{
    return csv(stream);
}

function csv_parse_string(string)
{
    return csv(string);
}

function panic(error)
{
    console.error(error);
    process.exit(1);
}
