import {useState} from 'react';
import Planet from './Planet';
import { useQuery } from 'react-query';
// 异步函数
const fetchPlanets = async (key) => {
  console.log('key', key.queryKey);

  const res = await fetch(`http://swapi.py4e.com/api/planets?page=${key.queryKey[2]}`);
  return res.json();  // 返回一个promise
}


export default function Planets() {
  // fetchPlanets();
  // const {data, status} = useQuery('planets', fetchPlanets, {
  //   // 第三参数 是配置react-query 
  //   staleTime: 0, 
  //   // cacheTime: 1000  // 设置请求数据缓存过期时间
  //   onSuccess: () => console.log('data fetched with no problem')
  // });
  const [page, setPage] = useState(1);
  const {data, status} = useQuery(['planets', 'Bruce', page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>
      {/* 这里的Math.max和 Math.min 感觉用得很好！！ */}
      <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>prev</button>
      <button onClick={() => setPage(prev => Math.min(prev + 1, 7))}>next</button>
      {/* <p>{status}</p> */}
      {
        status === 'loading' && (
          <div>Loading data ...</div>
        )
      }
      {
        status === 'error' && (
          <div>Error fetching data</div>
        )
      }
      {
        status === 'success' && (
          <div>
            {data.results.map(planet => <Planet key={planet.name} planet={planet}/>)}
          </div>
        )
      }
    </div>
  )
}
