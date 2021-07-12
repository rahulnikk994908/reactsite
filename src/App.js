import { useEffect, useState} from 'react';
import './App.css';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';


function App() {
  const [tags,setTags] = useState([]);
  const [ttags,setTtags] = useState([]);
  const [tagPresent,setTagPresent]=useState([])

  useEffect(()=>{
    localStorage.setItem("ptags",tags);
  },[tags]);
  useEffect(()=>{

  },[tagPresent])


  const addTag=(e) =>{
    
    
    if(e.key === 'Enter'){
      if(e.target.value.length>0){
      setTags([...tags ,e.target.value])
      setTtags([...ttags ,e.target.value])
      
      e.target.value = ""
      }
    }
    // console.log(tags);
  }
  const removeTag = removedTag =>{
    const newTags = ttags.filter(tag => tag !==removedTag)
    setTtags(newTags);
    setTagPresent([]);
  }
  

  const searchTag = (e)=>{
  let st =  localStorage.getItem("ptags")
   st= st.split(",");
  let tagPresent = st.length>0 ? st.filter(val =>val.includes(e.target.value) ) : "";
   
    setTagPresent([...new Set(tagPresent)]);
}
  const selectTag =(e)=> {
    // e.target.innerText
    // setTags([...tags ,e.target.innerText])
    setTtags([...ttags ,e.target.innerText])
  }
  
  
  return (
    <div className="App">
      
       
      <h3>Enter Tags -</h3>
      
     <div className="content">
     <div className="tag-container">
        {
          ttags.map((tag,index)=>{
            return(
            <div key={index} className="tag">
             {tag}<span onClick={()=>removeTag(tag)}><CancelRoundedIcon/></span>
        
            </div>
          )

          })
        }
        
        <input onChange={(e)=>searchTag(e)}  onKeyDown={(e)=>addTag(e)} placeholder={ "Start Typing and We Shall Make Suggestions!"  }/>
       
        
      </div>
      <div className ="suggestion">
        
      {
          tagPresent.length>0 ?
          tagPresent.map((val,i)=>{
            
            return(
             
              <p className="sugg" role="button" onClick= {(e)=>selectTag(e)}>{val}</p>
            )
          }):""
        }


      </div>

     </div>
    </div>
        
       
 
  );
}

export default App;
