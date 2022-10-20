import React, { useEffect, useState,createContext} from 'react'
import BackToTop from './components/Home'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'

export const d = createContext();

const App = () => {
  const [data, setData] = useState([])
  const [loading,setLoading] = useState(false)
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
    console.log("days is: "+ DAYS_X)
    axios.get(` https://api.github.com/search/repositories?q=created:>${DAYS_X}&sort=stars&order=desc&page=${page} `).then((resp)=>{
      console.log(resp.data.items)
      setData([...resp.data.items])
      setLoading(false)
    })
    // const data = await resp.json();
    // console.log(data.items)
    
  }
  useEffect(() =>{
    setPage(1)
    loadData(page,data)
  },[DAYS_X])

  const fetchData = () =>{
      setPage(page+1)
      setLoading(true)
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