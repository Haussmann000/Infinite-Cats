import {useState} from 'react';
import InfiniteScroll  from "react-infinite-scroller";
import { createClient } from 'pexels';
import './App.css';
const API_BACK_KEY =  process.env.REACT_APP_BACK_API_KEY;
const client = createClient(`${API_BACK_KEY}`);
const query = 'cats';

export default function InfiniteScrollIndex() {
  const [list, setList] = useState([]);          //表示するデータ
  const [hasMore, setHasMore] = useState(true);  //再読み込み判定
  const fetchImage = (imageNumber = 5) => {
    client.photos.search({query, page: imageNumber})
    .then((res) => {
      const data = Object.values(res.photos).map(e => e.src.medium)
      console.log(Object.values(res.photos))
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
    //項目を読み込むときのコールバック
    const loadMore = async (page) => {
      console.log("api loaded");


        fetchImage(page);


      //取得データをリストに追加
    }

  //各スクロール要素
  const items = (
    <ul>
      {/* {list.map((value) => <li>{value}</li>)} */}
      {list.map((value) => 
      <li>
        <img src={value} className="photos"></img>
        <img src="icon_cat.png" className="icon"></img>
      </li>)}
    </ul>);
  
  //全体のスタイル
  const root_style = {
    // marginLeft : "50px",
    // marginTop : "50px",
    // listStyle: "none",
  }

  //ロード中に表示する項目
  const loader =
  <div className="loader" key={0}>
    <img src="https://nekocatgato.up.seesaa.net/image/Corriendo_gato_L.gif" id="loadingImage"></img>
    <p>Loading ...</p>
  </div>;
  // http://nekocatgato.seesaa.net/article/135946029.htmlさんの配布画像

  return (
    <div style={root_style} className="container">
      <InfiniteScroll
        loadMore={loadMore}    //項目を読み込む際に処理するコールバック関数
        hasMore={hasMore}      //読み込みを行うかどうかの判定
        loader={loader}>      {/* 読み込み最中に表示する項目 */}
          {items}             {/* 無限スクロールで表示する項目 */}
      </InfiniteScroll>
    </div>
  )
}