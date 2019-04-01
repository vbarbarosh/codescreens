// Make a string safe to put into html
// https://stackoverflow.com/a/6234804/1478566
function html_escape(s)
{
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
