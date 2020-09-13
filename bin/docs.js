import Promise from 'bluebird';
import assert from 'assert';
import cli from '@vbarbarosh/node-cli';
import fs_ls from '@vbarbarosh/node-fs/src/fs_ls';
import fs_lsr from '@vbarbarosh/node-fs/src/fs_lsr';
import fs_path_basename from '@vbarbarosh/node-fs/src/fs_path_basename';
import fs_path_dirname from '@vbarbarosh/node-fs/src/fs_path_dirname';
import fs_path_resolve from '@vbarbarosh/node-fs/src/fs_path_resolve';
import fs_read_json from '@vbarbarosh/node-fs/src/fs_read_json';
import fs_read_utf8 from '@vbarbarosh/node-fs/src/fs_read_utf8';
import fs_write from '@vbarbarosh/node-fs/src/fs_write';

// 1. build a list of all codescreens
// 2. generate docs/index.html

cli(main);

async function main()
{
    const items = await list();
    const html = await fs_read_utf8(fs_path_resolve(__dirname, '../docs/index.html'));
    const html2 = html.replace(/(\/\*__CODESCREENS__\*\/).*(\/\*__CODESCREENS_END__\*\/)/, `$1${(await render(items)).replace(/\$/g, '\\$')}$2`);
    await fs_write(fs_path_resolve(__dirname, '../docs/index.html'), html2);
}

async function render(items)
{
    const codescreens = await Promise.map(items, map, {concurrency: 5});
    return JSON.stringify(codescreens.sort(fcmp));
    function fcmp(a, b) {
        return a.name.localeCompare(b.name);
    }
    async function map(item) {
        if (item.meta) {
            const meta = await fs_read_json(item.meta.pathname);
            const {url} = meta.publish.sort((b, a) => a.date.localeCompare(b.date)).find(v => v.url.startsWith('https://git.io/'));
            return {name: item.name, gist_url: url};
        }
        return {name: item.name, gist_url: null};
    }
}

async function list()
{
    const src = fs_path_resolve(__dirname, '../src');
    const files = await fs_lsr(src);
    return array_group(files.slice(1), g).map(function ({key, items}) {
        const items_map = array_index(items, fi => fi.basename);
        const d = fs_path_basename(key);
        const date = new Date(d.substr(0, 15).replace(/(\d\d\d\d)(\d\d)(\d\d)_(\d\d)(\d\d)(\d\d)/, '$1-$2-$3T$4:$5:$6Z'));
        const name = d.substr(16);
        const meta = items_map['meta.json'];
        const cover = items_map['cover.png'];
        const snippet = items.find(fi => (!fi.isDirectory() && fi.basename != 'cover.png'));
        assert(cover && snippet);
        return {date, name, meta, cover, snippet};
    });
    function g(fi) {
        let p = fi.pathname;
        for (let i = 0; i < 5; ++i) {
            const q = fs_path_dirname(p);
            if (q == src) {
                return p;
            }
            p = q;
        }
        throw new Error('Cannot resolve group key');
    }
}

function array_group(items, fn)
{
    const out = [];
    const map = {};
    items.forEach(function (item) {
        const key = fn(item);
        if (map[key]) {
            map[key].push(item);
        }
        else {
            out.push({key, items: map[key] = [item]});
        }
    });
    return out;
}

function array_index(items, fn)
{
    const out = {};
    items.forEach(v => out[fn(v)] = v);
    return out;
}
