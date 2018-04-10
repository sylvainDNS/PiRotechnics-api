const logRequest = (request) => console.log(`
ROUTE ${request.method.toUpperCase()} ${request.path}:{
    params -> ${JSON.stringify(request.params)}
    payload -> ${JSON.stringify(request.payload)}
}`)

const Route = (route) => async (request, h) => {
    loqRequest(request)
    return await route(request, h)
}

export default Route
