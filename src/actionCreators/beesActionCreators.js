export function callAction(endpoint, ...args) {
    return dispatch => {
        const [ ,,, meta = {} ] = args;
        const params = Object.keys(meta).length ? args.slice(0, -1) : args;
        const apiMeta = {
            api: true,
            name: endpoint.actionName,
            params: params,
        };

        dispatch({
            type: `api/${endpoint.actionName}/request`,
            meta: { ...apiMeta, ...(meta.request || {}), type: 'request' },
        });

        return endpoint(...params)
            .then((result) => {
                dispatch({
                    type: `api/${endpoint.actionName}/response`,
                    payload: result,
                    meta: { ...apiMeta, ...(meta.success || {}), type: 'response' },
                });
                return result;
            })
            .catch((result) => {
                dispatch({
                    type: `api/${endpoint.actionName}/error`,
                    payload: result,
                    meta: { ...apiMeta, ...(meta.error || {}), type: 'error' },
                });
                return result;
            });
    };
}

