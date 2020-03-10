import { useState, useEffect} from 'react';

export default httpClient => {
    const [errorState, setErrorState] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setErrorState(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, error => {
        setErrorState(error);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.request.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor])

    const errorConfirmHanlder = () => {
        setErrorState(null);
    }

    return [errorState, errorConfirmHanlder];
}