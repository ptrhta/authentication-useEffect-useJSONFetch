import PropTypes from 'prop-types';
import useJsonFetch from '../hooks/useJsonFetch';

export default function Resource(props) {
    const url = props.url;
    const [data, isLoading, error] = useJsonFetch(url);

    return (
        <div className="resource">
            <div>{data && data.status}</div>
            <div>{error && error.message}</div>
            <div>{isLoading && "Загрузка"}</div>
        </div>
    )
}

Resource.propTypes = {
    url: PropTypes.string
};