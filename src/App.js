import React, { useEffect, useState,createContext} from 'react'
import BackToTop from './components/Home'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'

export const d = createContext();

const App = () => {
  const [data, setData] = useState([])
  const [page , setPage] = useState(1)
  const [alignment, setAlignment] = useState("month");

  var DAYS_X;
  if(alignment === 'month'){
    DAYS_X = moment().subtract(30, 'days').format('YYYY-MM-DD')
    console.log(DAYS_X)
  }else if(alignment === 'week2'){
    DAYS_X = moment().subtract(14, 'days').format('YYYY-MM-DD')
    console.log(DAYS_X)
  }else if(alignment === 'week1'){
    DAYS_X = moment().subtract(7, 'days').format('YYYY-MM-DD')
  }


  const loadData = async (page,repo) => {
    axios.get(` https://api.github.com/search/repositories?q=created:>${DAYS_X}&sort=stars&order=desc&page=${page}`).then((resp)=>{
      setData([...repo,...resp.data.items])
    })
    // const data = await resp.json();
    // console.log(data.items)
    
  }
  useEffect(() =>{
    setPage(1)
    axios.get(` https://api.github.com/search/repositories?q=created:>${DAYS_X}&sort=stars&order=desc&page=1`).then((resp)=>{
      setData([...resp.data.items])
    })
  },[DAYS_X])

  const fetchData = () =>{
      setPage(page+1)
      loadData(page,data)
  }
  console.log("page is :" +page);

  return (
    <>
    <d.Provider value={{alignment, setAlignment}} >
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }>
    <BackToTop data={data} />
</InfiniteScroll>
</d.Provider>
    </>
  )
}

export default App