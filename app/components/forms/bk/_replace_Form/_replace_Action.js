export default async function _replace_Action(){
    const result = await _replace_ActionAwait();
    return result;
}

async function _replace_ActionAwait(){
    return 'async return baby!';
}