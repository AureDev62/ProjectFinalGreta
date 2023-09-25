// Import du module react(pour la gestion des composants )ainsi que les hook useState(variable d'etat) et useEffect
//(qui permet de déclencher une fonction de manière asynchrone ca va permettred'appliquer des effets de bords pour permettre 
//de reproduire la logique) 
//Importing the React module (for component management) along with the useState (state variable) and useEffect hooks
// (which allow triggering a function asynchronously to apply side effects and reproduce logic).
import React, {  useEffect, useState } from 'react';
//import de Link (equivalent de la balise"a" en html)/Import of Link (equivalent to the "a" tag in HTML)
import { Link } from 'react-router-dom';
//import de react-helmet pour le SEO/import react-helmet for SEO
import { Helmet } from 'react-helmet';
//import du css/Import of the CSS file
import "../../styles/_global.css"

export default function Home (){
  // Déclaration d'un état local "latestPosts" qui représente les derniers articles / Declaration of a local state "latestPosts" which represents the latest posts
  // Utilisation du hook useState pour initialiser l'état à un tableau vide qui signifie qu'il n'y a pas encore d'articles récupérés
  //Using the useState hook to initialize the state with an empty array, indicating that no posts have been retrieved yet.
  const [latestPosts, setLatestPosts]=useState([]);
    useEffect(() =>{
    //on effectue une requete pour récupérer les derniers articles/Performing a request to fetch the latest posts
      const fetchLatestPosts =async()=>{
      try{
        const res =await fetch('http://localhost:5000/backend/posts')
        //on convertit la reponse en json(Javascript Object Nation)/Converting the response to JSON (JavaScript Object Notation)
        const data =await res.json();

        //on trie les articles par date de création décroissante/Sorting the articles by descending creation date
        const sortedPosts =data.sort((a,b)=>new Date(b.creationDate) - new Date(a.creationDate));

        // on limite les résultats aux 3 premiers articles/Limiting the results to the first 3 articles
        const latestThreePosts =sortedPosts.slice(0,3);
        
        //on affiche les données récupérees dans la console
        console.log('Données',data);
        console.log('Derniers posts triés',sortedPosts);
        console.log('Les 3 derniers articles',latestThreePosts);
        
        //on met à jour l'état(useState) avec les trois derniers articles/Updating the state (useState) with the latest three posts 
        setLatestPosts(latestThreePosts)
        //on affiche un erreur si problème lors de la récupération des articles/Displaying an error in case of any issues while fetching the posts
      } catch (err) {
        console.log ("Erreur lors de la récupération des 3 derniers posts:", err);
      }
    };
    //on appelle la fonction de récupération des articles /Calling the function to fetch the articles
    fetchLatestPosts();
},[])
;
  return (
    <>
    <Helmet>
        <title>Fanatics Super héros le blog des superhéros Marvel et comics</title>
        <meta name="description" content="Fanatics Superhéros est un site dédié aux passionnés de super héros Marvel et Comics.
         Découvrez les dernières actualités, les critiques de films et bien plus!" />
      </Helmet>
    <main className='mainHome'>
      <section className='sectionOneHome'>
          <p className="paragraphHome">
            Bienvenue sur <strong>Fanatics SuperHéros</strong> ,le blog dédié aux passionnés de l'univers des super-héros <strong>Marvel</strong> et <strong>DC Comics</strong>!<br />
            Retrouvez ici les dernières actualités concernant les films, séries, bandes dessinées qui vous intéressent.
          </p>
          <p className="paragraphHome">
            Etant fan inconditionnel de <strong>super héros</strong>, j'ai décidé de partager ma passion avec vous en vous tenant informés 
            des dernières sorties cinématographiques <strong>Marvel</strong> et <strong>DC Comics</strong>.Soyez à l'affût des nouveautés à venir
            dans les films,séries et bandes dessinées.
          </p>
          <p className="paragraphHome">
            Je vous donnerai également mon avis et mes ressentis sur les oeuvres, tout en vous proposant des théories passionnantes.
          </p>
          <p className="paragraphHome">
            Rejoignez <strong>Fanatics SuperHéros</strong> et plongez vous dans l'univers fascinant des héros <strong>Marvel</strong> et <strong>DC Comics</strong>
            Je partagerai avec vous ma passion tout au long de ce blog.
            Pour rejoindre le blog c'est <Link className="linkHome" to ="/blog" aria-label="aller vers la page blog">ICI</Link>
          </p>
          <blockquote lang="fr" className="citation">
            <p className="paragraphHome">Nous souhaitons tous avoir des super pouvoirs. Nous souhaitons tous pouvoir faire plus que ce que nous pouvons faire.</p>
            <footer className="nameAuthor">-Stan Lee</footer>
          </blockquote>
      </section>

      <section className="sectionTwoHome">
        <h2 className="h2Home">Les dernières infos</h2>
        <article className="articleHome">
          {latestPosts.map((post)=>(
            <Link to ='/blog' key={post._id} className="latestPostLink" aria-label="aller vers la page blog">
              <div className="divHome">
                <h3 className="h3Home">{post.title}</h3>
                <img src={`http://localhost:5000/${post.photo}`} alt={post.title} className="imageHome"  loading="lazy"/>
              </div>
            </Link>
          ))}
        </article>
      </section>
    </main>
    </>
  );
};

