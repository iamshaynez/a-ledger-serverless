export function parsePath(request) {
    const url = new URL(request.url);
    return url.pathname;
}