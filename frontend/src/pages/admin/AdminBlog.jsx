// Import des modules React nécessaires et des hook/Import necessary React modules and hooks
import React, { useState, useEffect, useRef } from 'react';
// Import du fichier CSS pour le style/Import CSS file for styling
import "../../styles/_global.css"

export default function AdminBlog() {
  //etat pour le title,la desc ,photo,catégories et liste des posts
  //state for the title, desc, photo, categories and list of posts
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [category, setCategory] = useState('');
  const [posts, setPosts] = useState([]);
  //Référence à l'élement d'entrée de fichier
  //Reference to file input element
  const fileInputRef = useRef(null);
  //fonction pour créer un post/// function to create a post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Ajout du titre,desc,categories et photo au formulaire
    // Add title, desc, categories and photo to the form
    formData.append('title', title); 
    formData.append('desc', desc); 
    formData.append('category', category); 
    formData.append('photo', photo);

    try {
      const res = await fetch('http://localhost:5000/backend/posts', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        // On réinitialise / reset
        setTitle('');
        setDesc('');
        setPhoto(null);
        setCategory('');
        fileInputRef.current.value = null;
      //on récupère les posts apres la création
      //retrieve posts after creation
        fetchPosts();
      } else {
        throw new Error('Erreur lors de la création du post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/backend/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);//mis à jour des posts
        console.log("posts récupérés:",data);
      } else {
        throw new Error('Erreur lors de la récupération des posts');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      fetchPosts(); //on récupère les posts avant la suppression
      //recover the posts before the deletion

      const res = await fetch(`http://localhost:5000/backend/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        fetchPosts();//On récupére les posts apres la suppression
        // we recover the posts after the deletion
      } else {
        throw new Error('Erreur lors de la suppression du post');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();//On récupère les posts/retrieve the posts
  }, []);

  return (
    <>
      <div className="createAdminBlog">
        <h2 className="h2CreateAdminBlog">Créer un nouveau post</h2>
        <form className="formCreateAdminBlog" onSubmit={handleSubmit}>
          <label htmlFor="title">Titre :</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required/>
          
          <label htmlFor="desc">Description :</label>
          <textarea  id="desc" style={{ height: '200px' }} value={desc} onChange={(e) => setDesc(e.target.value)} required/>
          
          <label htmlFor="photo">Photo :</label>
          <input type="file" id="photo" ref={fileInputRef} onChange={(e) => setPhoto(e.target.files[0])} accept="image/*" required/>
         
          <label htmlFor="category">Catégorie :</label>
          <select name="category" id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">-- Sélectionnez une catégorie --</option>
            <option value="marvel">Marvel</option>
            <option value="comics">Comics</option>
          </select>

          <div className="buttonAdmin">
            <button className="" type="submit">Créer</button>
          </div>
        </form>
      </div>
      
      <div className="adminPosts">
        <h2 className="h2AllPostsAdmin">Tous les posts</h2>
        {posts.map((post, index) => (
          <div key={index}>
            <h3 className="h3AllPostsAdmin">{post.title}</h3>
            <div className="allPostsAdmin">
              <p className="pAllPostsAdmin">{post.desc}</p>
              <img className="imageAdminBlog" src={`http://localhost:5000/${post.photo}`} alt={post.title}/>
            </div>

            <div className="formUpdateAndDelete">
              <div className="buttonAdmin">
                <button onClick={() => handleDelete(post._id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
