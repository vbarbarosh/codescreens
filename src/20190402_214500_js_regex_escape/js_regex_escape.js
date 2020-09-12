// Make a string safe to put into regular expression
// https://stackoverflow.com/a/6969486
// https://stackoverflow.com/a/3561711
function js_escape_regexp(s)
{
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
