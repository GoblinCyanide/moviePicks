import React from 'react'
import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';

const Details = () => {

	const { mediaType, id } = useParams();
	const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
	const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

	let trailer = data?.results?.[0];
	data?.results?.every((video) => {
		if(video?.type === "Trailer" || video?.type === "trailer"){
			trailer = video;
			return false;
		}
		else{
			return true;
		}
	})
	return (
		<div>
			<DetailsBanner video={trailer} crew={credits?.crew} />
			<Cast data={credits?.cast} loading={creditsLoading} />
			<VideosSection data={data} loading={loading} />
			<Similar mediaType={mediaType} id={id} />
			<Recommendation mediaType={mediaType} id={id} />
		</div>
	)
}

export default Details;