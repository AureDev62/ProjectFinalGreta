// Import des modules React nécessaires et des hook/Import necessary React modules and hooks
import React, { useEffect, useState } from 'react';
// Import du composant Link de react-router-dom pour la navigation/Import Link component from react-router-dom for navigation
import { Link} from 'react-router-dom';
//import de react-helmet pour le SEO/import react-helmet for SEO
import { Helmet } from 'react-helmet';
// Import du fichier CSS pour le style/Import CSS file for styling
import "../../styles/_global.css"

export default function Blog() {

  //on déclare les états avec le hook usestate/Declare states using the useState hook
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const isLoggedIn = localStorage.getItem('token');
//on utilise le hook useeffect pour effectuer une action au chargement du composant /Use the useEffect hook to perform an action on component load
  useEffect(() => {
   //on appel la fonction fetchPosts/Call the fetchPosts function
    fetchPosts();
  }, []);

  //Fonction asynchrone pour récupérer les posts depuis le backend/Asynchronous function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/backend/posts');//Send a request to get posts from the backend
      const data = await res.json();// On convertit les données de réponse en format JSON/Convert the response data to JSON format
      setPosts(data);//mis à jour de l'état posts avec les données récupérées/Update the posts state with the retrieved data

      // console.log('article',data);//affichage des données dans la console
    } catch (error) {
      console.log(error);//on affiche les éventuelles erreurs dans la console/Display any errors in the console
    }
  };
// fonction pour filtrer les posts par catégories/function to filter posts by category
  const filterByCategory = (category) => {
    setSelectedCategory(category);//mis à jour de l'état seletedCategory avecla catégorie sélectionnée avec le select
    //Update the selectedCategory state with the selected category from the select element

    // console.log('catégories',category);// on affiche de la catégorie sélectionnée dans la console
  };
//on filtre les posts par catégorie/Filter posts by category
  const filteredPosts = selectedCategory === ''
    ? posts
    : posts.filter((post) => post.category === selectedCategory);


  return (
    <div>
      <Helmet>
        <title>Blog - Fanatics Super-héros</title>
        <meta name='description' content='Découvrez les derniers articles du blog des Super-héros.' />
      </Helmet>
    <main className='mainBlog'>
      <h2 className='h2Blog'>Choisissez votre univers</h2>
        <div className='filterDropDown'>
          <select value={selectedCategory} onChange={(e)=> filterByCategory(e.target.value)}>
          <option value=''>Choissisez votre univers</option>
          <option value='marvel'>Marvel</option>
          <option value='comics'>Comics</option>
        </select>
      </div>
      <div className="containerBlog">
        {filteredPosts.map((post)=>(
        <div key={post._id} className="postLinkBlog">
          {isLoggedIn?(
            <Link to={`/post/${post._id}`} >
              <article className="postContainerBlog">
                <h3 className="postTitleBlog">{post.title}</h3>
                <img className="postImageBlog" src={`http://localhost:5000/${post.photo}`} alt={post.title} />
                <p className="postDescBlog">{post.desc}</p>
                <p className="postReadMoreBlog">Pour voir la suite cliquez sur l'article</p>
              </article>
            </Link>
          ):(
            <article className="postContainerBlog">
              <h3 className="postTitleBlog">{post.title}</h3>
              <img className="postImageBlog" src={`http://localhost:5000/${post.photo}`} alt={post.title} />
              <p className="postDescBlog">{post.desc}</p>
              <p className="postReadMoreBlog"><strong>Connectez vous pour accéder à l'article</strong></p>
            </article>
          )}
          </div>
        ))}
      </div>
    </main>
    </div>
  );
}
