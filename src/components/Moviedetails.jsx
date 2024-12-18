import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { useParams, useNavigate, Link, useLocation, Outlet } from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./partials/HorizontalCards";
import ReactPlayer from "react-player";
import OutsideClickHandler from "react-outside-click-handler";
import Notfound from "./Notfound";

function Moviedetails() {

  const [showtrailer, setShowTrailer] = useState(false);
  const { pathname } =  useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  console.log(info);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen h-[155vh] px-[10%] relative"
    >
      {/* Part 1 naviagtion */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line hover:text-[#6556CD]"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i className="hover:text-[#6556CD] ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="hover:text-[#6556CD] ri-global-line"></i>
        </a>
        <a
          className="hover:text-[#6556CD]"
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className="w-full  flex "> 
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover "
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] text-white">
          <h1 className="text-4xl font-black  ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.orignal_name ||
              info.detail.original_title}
            <small className="text-2xl font-bold text-zinc-300">
              ({info.detail.release_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-3 mb-4 flex  items-center gap-x-3 gap-y-10">
            <span className=" rounded-full bg-yellow-600 text-xl text-white font-semibold w-[6vh] h-[6vh] flex justify-center items-center ">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1 className="">{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className="text-2xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>

          <h1 className="text-2xl mb-3 mt-3">overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className="text-lg mb-3 mt-5">Movie Translated</h1>
          <p className="mb-5">{info.translations.join(", ")}</p>

           <button onClick={()=> setShowTrailer(true)} className=" p-3 bg-[#6556CD] rounded-lg " >Play Trailer
             <i className='text-xl ri-play-fill ml-2'></i>
           </button>
        </div>
      </div>
       
      {/* Part 3 Available on Platforms */}

      <div className="w-[80%] flex flex-col gap-y-5 mt-6 mb-5 ">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, k) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={k}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, k) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={k}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Buy</h1>
            {info.watchproviders.buy.map((w, k) => (
              <img
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                key={k}
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/* Part 4 recomendations and similar stuff */}
      <hr className="border-none h-[2px] bg-zinc-400" />
      <h1 className="text-3xl mb-3 mt-5 font-bold text-white ">Recommendations & Similar Stuff</h1>
       <HorizontalCards data = {
            info.recommendations.length > 0  ? info.recommendations.results : info.similar.results
         } category={ "movie" } />
        <Outlet/>
        {showtrailer &&   <div className='bg-[rgba(0,0,0,.9)] absolute z-[1000] top-0 left-0 w-screen h-screen flex items-center justify-center'>
        <OutsideClickHandler onOutsideClick={()=> setShowTrailer(false)}>{info?.videos?.key ? <ReactPlayer  url={`https://www.youtube.com/watch?v=${info?.videos?.key}` }/> : <Notfound/> }</OutsideClickHandler>
    </div>}
       
      
    </div>
  ) : (
    <Loading />
  );
}

export default Moviedetails;
