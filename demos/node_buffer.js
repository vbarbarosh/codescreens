// How to work with Buffer

main().catch(panic);

async function main()
{
    // Use this if buffer will be immediately written to
    Buffer.allocUnsafe(1024);

    // Use this to allocate memory filled with zeroes
    Buffer.alloc(1024);

    // Use this to get a narrow view to the same memory
    Buffer.alloc(1024).slice(0, 100);
}

function panic(error)
{
    console.error(error);
    process.exit(1);
}
