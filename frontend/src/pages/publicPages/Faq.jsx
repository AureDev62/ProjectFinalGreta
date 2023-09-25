import React from 'react'
import "../../styles/_global.css"

export default function Faq() {
  return (
<div className="divFaq">
    <h2 className="h2Faq" >F.A.Q</h2>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 1</span><img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 2</span><img img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 3</span><img img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 4</span><img img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 5</span>< img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 6</span><img  className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 7</span><img  className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 8</span><img  className="arrowFaq"  src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 9</span><img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    <details className="detailsFaq">
        <summary className="summaryFaq"><span className="spanTerms">Section 10</span><img className="arrowFaq" src={process.env.PUBLIC_URL + '/assets/icons/chevron.png'} alt="Flèche vers le bas" /></summary>
        <p className="paragraphFaq">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean dictum.</p>
    </details>
    
</div>
  )
}
