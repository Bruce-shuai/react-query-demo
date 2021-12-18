import React from 'react';
import Person from './Person';
import { useQuery } from 'react-query';

// 异步函数
const fetchPeople = async () => {
  const res = await fetch('http://swapi.py4e.com/api/people');
  return res.json();  // 返回一个promise
}


export default function People() {
  // fetchPlanets();
  const {data, status} = useQuery('people', fetchPeople);
  // console.log('data:', data);
  // console.log('status:', status);
  return (
    <div>
      <h2>People</h2>
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
            {data.results.map(person => <Person key={person.name} person={person}/>)}
          </div>
        )
      }
    </div>
  )
}
