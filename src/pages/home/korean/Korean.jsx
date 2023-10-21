import React, { useEffect, useState } from 'react';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import Carousel from '../../../components/carousel/Carousel';
import { fetchDataFromApi } from '../../../utils/api';

const Korean = () => {

    const [endpoint, setEndpoint] = useState("movie");
    const [data1, setData1] = useState(null);
    const [loading, setLoading] = useState(false);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    const fetchInitialData = () => {
        setLoading(true);
        // fetchDataFromApi(`/discover/${endpoint}?&with_origin_country=KR`).then((res) => {
        fetchDataFromApi(`/${endpoint}/top_rated?&with_origin_country=KR`).then((res) => {
            setData1(res);
            setLoading(false);
        });
    };


    useEffect(() => {
        fetchInitialData();
    }, [endpoint]);

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Top Rated in Korea</span>

                <SwitchTabs data={["Movies", "TV Shows"]} onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel
                data={data1?.results}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    )
}

export default Korean;