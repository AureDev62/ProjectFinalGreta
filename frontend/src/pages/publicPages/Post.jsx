// Import des modules React nécessaires et des hook/Import necessary React modules and hooks
import React, { useEffect, useState } from 'react'; 
// Import du  hook useParams de react-router-dom pour obtenir les paramètres d'URL/Import useParams hook from react-router-dom to get URL parameters
import { useParams } from 'react-router-dom'; 
//import de react-helmet pour le SEO/import react-helmet for SEO
// import { Helmet } from 'react-helmet';
// Import du fichier CSS pour le style/Import CSS file for styling
import "../../styles/_global.css"

export default function Post() {
  // on obtient l'ID de l'article à partir des paramètres d'URL/Get the article ID from URL parameters
  const { postId } = useParams(); 
  // État local pour stocker les détails de l'article/Local state to store the article details
  const [post, setPost] = useState(null); 

  useEffect(() => {
    // On appelle la fonction fetchPost lorsque l'ID de l'article change/Call the fetchPost function when the article ID changes
    fetchPost(postId); 
  }, [postId]);

  const fetchPost = async (postId) => {
    try {
      // Envoie une requête à l'API pour obtenir les détails de l'article/Send a request to the API to get the article details
      const res = await fetch(`http://localhost:5000/backend/posts/${postId}`); 
      // Convertit les données de réponse en format JSON/Convert the response data to JSON format
      const data = await res.json(); 
      // Met à jour l'état avec les détails de l'article/Update the state with the article details
      setPost(data); 
    } catch (error) {
      // Affiche une erreur en cas d'échec de la requête/Display an error if the request fails
      console.log(error); 
    }
  };
  // console.log("postId:", postId);
  // console.log("post:", post);


  return (
    <div>
    {/* <Helmet>
      <title>{post ? post.title : 'Chargement...'}</title>
      <meta name="description" content={`Article détaillé de ${post ? post.title : 'Chargement...'}`} />
    </Helmet> */}
    <div className="divSoloPost">
      {post ? (
      <>
      <h2 className="h2SoloPost">{post.title}</h2>
      <img src={`http://localhost:5000/${post.photo}`} alt={post.title} className="imgPostSolo" />
      <p className="paragraphPost">{post.desc}</p>
      </>
      ):(
      <p>Aucun article trouvé</p>
      )}
    </div>
    </div>
  );
}
