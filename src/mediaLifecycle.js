import {useEffect,useState} from 'react';
export function useNearViewport(ref,margin='400px'){
 const [near,setNear]=useState(false);
 useEffect(()=>{if(!ref.current)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setNear(true);observer.disconnect()}},{rootMargin:margin});observer.observe(ref.current);return()=>observer.disconnect()},[ref,margin]);
 return near;
}
export function usePauseOutsideViewport(videoRef,containerRef,enabled){
 useEffect(()=>{if(!enabled||!containerRef.current)return;const pause=()=>videoRef.current?.pause();const observer=new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)pause()},{threshold:0});observer.observe(containerRef.current);const visibility=()=>{if(document.hidden)pause()};document.addEventListener('visibilitychange',visibility);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility)}},[videoRef,containerRef,enabled]);
}
