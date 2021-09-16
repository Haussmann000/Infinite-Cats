import {useState} from 'react';
import InfiniteScroll  from "react-infinite-scroller";
import { useInView } from 'react-intersection-observer';
import 'animate.css';
import { createClient } from 'pexels';
import Loader from'./component/Loader'
import Select from './component/Select'
import Form from './component/Form'
import Header from './component/Header'
import './App.css';
const API_BACK_KEY =  process.env.REACT_APP_BACK_API_KEY;
const client = createClient(`${API_BACK_KEY}`);
const query = 'cats';
// プルダウンコンポーネントからvalueを入れる
// valueによってタイトルを出し分ける

export default function InfiniteScrollIndex() {
  const [list, setList] = useState([]);  
  const [hasMore, setHasMore] = useState(true);
    const {ref, inView} = useInView({
        rootMargin: '-50px 0px',
    });
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
        <img src={value} className="photos animate__animated animate__fadeInUp" alt="猫画像"></img>
        <img src="icon_cat.png" className="icon" alt="小さい猫アイコン"></img>
      </li>)}
    </ul>);
  

  return (
    <div className="wrapper">      
      <Header />
        {/* <Select /> */}
        {/* <Form /> */}
      <div className="container">
        <InfiniteScroll
        // valueの内容で出し分け
        loadMore={loadMore}
        hasMore={hasMore}
        loader={<Loader />}
        >
            {items}
        </InfiniteScroll>
        </div>
    </div>
  )
}