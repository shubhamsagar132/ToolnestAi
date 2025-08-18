import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitle from './pages/BlogTitle';
import GenerateImages from './pages/GenerateImages';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import Community from './pages/Community';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
const App = () => {
  const{getToken}=useAuth();
  useEffect(() => {
    getToken()
      .then((token) => console.log(token));
  }, [getToken]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='Write-article' element={<WriteArticle />} />
          <Route path='Blog-titles' element={<BlogTitle />} />
          <Route path='Generate-images' element={<GenerateImages />} />
          <Route path='Remove-background' element={<RemoveBackground />} />
          <Route path='Remove-object' element={<RemoveObject />} />
          <Route path='Review-resume' element={<ReviewResume />} />
          <Route path='Community' element={<Community />} />;
        </Route>
      </Routes>
    </div>
  )
}

export default App