import './App.css';
import logo from './logo.jpg';
import React from 'react';
import Post from './Post';
import { useState,useEffect } from 'react';
import { db } from './firebase';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Input from '@material-ui/core/Input';
import { auth } from './firebase';
import ImageUpload from './ImageUpload';
import { InstagramEmbed } from 'react-social-media-embed';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


function App() {
 ;
  const [posts,setPosts] = useState([])
  const [open, setOpen] = useState(false);
  const[openSignIn,setOpenSignIn] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername] = useState('');
  const [user,setUser] =useState(null);

  useEffect ( () =>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        //user logged in
        console.log(authUser);
        setUser(authUser);
        
      }
      else{
          //user logged out
          setUser(null);
      }
    })
    return () =>{
      unsubscribe();
    }
  }, [user, username]);
  useEffect ( () =>{
db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{

    {console.log(snapshot.docs.map((doc =>(doc.data()))))}
    setPosts(snapshot.docs.map((doc=>({
      id:doc.id,
      post:doc.data()
      
     }))))
  })
  },[])
const signIn =(e) =>{
  e.preventDefault();
  auth
  .signInWithEmailAndPassword(email,password)
  .catch((error) => alert(error.message));
  setOpenSignIn(false);


}
  const signUp = (e) =>{
      e.preventDefault();
      auth
      .createUserWithEmailAndPassword(email,password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName:username
        })
      
      })
      .catch((error) => alert(error.message));
  }
  return (
    <div className='app'>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  background: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <form className='app__signup'>
          
           <img className='app__headerImage'
            src={logo}
            alt="Logo" />
            <Input placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          
        </form>
      </Typography>
        </Box>
      </Modal>



    <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          background: 'white',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        <form className='app__signup'>
          
           <img className='app__headerImage'
            src={logo}
            alt="Logo" />
            <Input placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
            
            <Button type="submit" onClick={signIn}>Sign In</Button>
          
        </form>
      </Typography>
        </Box>
      </Modal>
    <div className='app__header'>
      <img className='app__headerImage'
      src={logo}
      alt="Logo" />
        {user?(
              <Button onClick={() => auth.signOut()}>Log out</Button>
          
            ):(
              <div className='app__loginContainer'>
              <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={handleOpen}>Sign Up</Button>
              </div>
            )}
    </div>
 
   <div className='app__posts'>
   <div className='app__postsLeft'>
   {posts.map (({id, post})=>(
     
     <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
    
   ))
   }

   </div>
    <div className='app__postsRight'>
    <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/"  />
    </div>
   </div>

   
    {user?.displayName ? (
      <ImageUpload username={user.displayName}/>
      ): (
        <h3> Please login before uploading</h3>
        )}
      
    </div>
  );
}

export default App;
