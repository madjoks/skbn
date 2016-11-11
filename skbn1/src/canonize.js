export default function canonize(url){
    const re = new RegExp('(https?:)?(//)?([^/]*/)?@?([A-z\.]*)/?', 'i');
    const user_name = url.match(re);
    return user_name[4];
};
