export function parsePath(request) {
    const url = new URL(request.url);
    return url.pathname;
}

export function getDB(env) {
    return env.DB
}
