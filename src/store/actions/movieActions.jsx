import axios from "../../utils/axios";
import { loadmovie } from "../reducers/movieSlice";
export { removemovie } from "../reducers/movieSlice";

export const asyncloadmovie = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/movie/${id}`,{headers: {"Cache-Control" : "no-cache"}});
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const translations = await axios.get(`/movie/${id}/translations`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchproviders = await axios.get(`/movie/${id}/watch/providers`);
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendations: recommendations.data,
      similar: similar.data,
      translations: translations.data.translations.map((t) => t.english_name),
      videos: videos.data.results.find((n) => n.type === "Trailer"),
      watchproviders: watchproviders.data.results.IN,
    };
    console.log(theultimatedetails);
    dispatch(loadmovie(theultimatedetails));
  } catch (error) {
    console.log("Error", error);
  }
};
