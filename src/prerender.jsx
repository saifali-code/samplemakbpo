// Build-time only: emits HTML files. No server runs in the deployed website.
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {prerenderToNodeStream} from 'react-dom/static';
import {MotionConfig} from 'motion/react';
import {ExperienceProvider} from './context/ExperienceContext';
import App from './App';
export async function render(path){
  const {prelude}=await prerenderToNodeStream(<React.StrictMode><StaticRouter location={path}><MotionConfig reducedMotion="user"><ExperienceProvider><App/></ExperienceProvider></MotionConfig></StaticRouter></React.StrictMode>,{onError(error){throw error;}});
  let html='';for await(const chunk of prelude)html+=chunk.toString();return html;
}
