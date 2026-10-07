import { useState, useEffect, useRef } from 'react'
import './App.css'

const events = [
  {
    year: "2022",
    title: "¿Me cuidas una planta?",
    text: "Empezamos a conocernos y nos dimos cuenta de que teníamos muchas cosas en común. Hablar se sentía fluido, inspirador, divertido y pasional. Ver tu notificación de whatsapp me hacía siempre feliz.",
    type: "image",
    src: "./src/assets/IMG_6205.jpg",
  },
  {
    year: "2022",
    title: "La charla",
    text: "Yo no sabía lo que éramos, pero sí sabía que quería tenerte cerca y que haría todo lo posible para ello. Ese día se puso el primer ladrillo de nuestra familia.",
    type: "image",
    src: "./src/assets/IMG_6383.jpg",
  },
  {
    year: "2022",
    title: "Primer 'viaje' juntos",
    text: "Me enseñaste tu pueblo y fue nuestra primera convivencia. Recuerdo cenar con velas y sentir mucho amor.",
    type: "image",
    src: "./src/assets/IMG_6897.jpg",
  },
  {
    year: "2022",
    title: "Primera semilla",
    text: "Todo empezó con una planta y siguió con nuestro primer árbol. El primer 'fruto' de nuestra relación.",
    type: "image",
    src: "./src/assets/328f3da5-5b50-4268-af30-104b775a4eeb.JPG",
  },
];

const mediaToRender = (event) => {
  switch(event.type) {
    case 'text':
      return <p>{event.src}</p>;
    case 'image':
      return <img src={event.src} alt={event.title} />
    default:
      return null;
  }
}

function App() {
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const timeline = timelineRef.current;

      if (!timeline) return;

      const rect = timeline.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Progreso de la línea
      const start = viewportHeight * 0.75;
      const end = viewportHeight * 0.2;

      const percentage =
        ((start - rect.top) / (rect.height - (start - end))) * 100;

      setProgress(Math.max(0, Math.min(100, percentage)));

      // Detectar eventos visibles
      const elements = timeline.querySelectorAll(".event");

      const visible = [];

      elements.forEach((element, index) => {
        const eventRect = element.getBoundingClientRect();

        if (
          eventRect.top < viewportHeight * 0.8 &&
          eventRect.bottom > viewportHeight * 0.2
        ) {
          visible.push(index);
        }
      });

      setVisibleEvents(visible);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section id="center">
        <div className="hero">
          <h1>Bienvenida a <br></br>nuestra historia</h1>
          <p
            className="scrollArrow"
          >
            ↓
          </p>
        </div>
      </section>
      <section className="timeline" ref={timelineRef}>
        {events.map((event, index) => (
          <article
            className={`event ${visibleEvents.includes(index) ? "is-visible" : ""}`}
            key={index}
          >
            <div className="event-content">
              <span className="event-year">{event.year}</span>

              <h2>{event.title}</h2>

              <div className="media">
                {mediaToRender(event)}
              </div>

              <p>{event.text}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default App
