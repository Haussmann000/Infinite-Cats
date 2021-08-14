import {useState} from 'react';
import InfiniteScroll  from "react-infinite-scroller";
import { createClient } from 'pexels';
import './App.css';
const API_BACK_KEY =  process.env.REACT_APP_BACK_API_KEY;
const client = createClient(`${API_BACK_KEY}`);
const query = 'cats';

export default function InfiniteScrollIndex() {
  const [list, setList] = useState([]);  
  const [hasMore, setHasMore] = useState(true);
  const fetchImage = (imageNumber = 5) => {
    client.photos.search({query, page: imageNumber})
    .then((res) => {
      const data = Object.values(res.photos).map(e => e.src.medium)
      setList([...list, ...data])
      if (data.length < 1) {
        setHasMore(false);
        return;
      }
    })
    .catch(e => {
      console.error(e);
    })
  }
    const loadMore = async (page) => {
        fetchImage(page);
    }

  const items = (
    <ul>
      {list.map((value) => 
      <li>
        <img src={value} className="photos" alt="猫画像"></img>
        <img src="icon_cat.png" className="icon" alt="小さい猫アイコン"></img>
      </li>)}
    </ul>);
  

  const loader =
  <div className="loader" key={0}>
    <img src="https://nekocatgato.up.seesaa.net/image/Corriendo_gato_L.gif" alt="走る猫" id="loadingImage"></img>
    <p>Loading ...</p>
  </div>;
  // http://nekocatgato.seesaa.net/article/135946029.htmlさんの配布画像

  return (
    <div className="container">
      <InfiniteScroll
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}>
          {items}
      </InfiniteScroll>
    </div>
  )
}