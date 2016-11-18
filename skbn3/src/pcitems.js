
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

export default async function getPCItmes(){
    let pc = {};
    var response = await fetch(pcUrl);
    pc = await response.json();
    console.log(pc);

    return pc;
};
