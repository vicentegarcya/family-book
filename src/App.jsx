import { useState, useEffect, useRef } from 'react'
import './App.css'

const events = [
  {
    year: "2022",
    title: "¿Me cuidas una planta?",
    text: "Una de las primeras piedras de nuestra casa",
    type: "text",
    src: "Empezamos a conocernos y nos dimos cuenta de que teníamos muchas cosas en común. Hablar se sentía fluido, inspirador, divertido y pasional. Ver tu notificación de whatsapp me hacía siempre feliz.",
  },
  {
    year: "2022",
    title: "Primer beso",
    text: "Estrellas, tormenta y amor. Mucho amor.",
    type: "music",
    src: "/media/video1.mp3",
  },
  {
    year: "2022",
    title: "La charla",
    text: "Viniste a mi casa y tuve que convencerte de que lo nuestro tenía sentido.",
    type: "image",
    src: "/media/foto2.jpg",
  },
  {
    year: "2023",
    title: "Primer viaje juntos",
    text: "Nos fuimos a Tenerife buscando nuestro próximo lugar. Pero acabamos disfrutando de la isla sin presión.",
    type: "video",
    src: "/media/video2.mp4",
  },
];

const mediaToRender = (event) => {
  switch(event.type) {
    case 'text':
      return <p>{event.src}</p>;
    case 'music':
      return <audio controls src={event.src}></audio>
    case 'image':
      return <img src={event.src} alt={event.title} />
    case 'video':
      return <video
        src={event.src}
        controls
        muted
        playsInline
      />
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
        <div className="timeline-track" />

        <div
          className="timeline-progress"
          style={{ height: `${progress}%` }}
        />

        {events.map((event, index) => (
          <article
            className={`event ${
              index % 2 === 0 ? "event-left" : "event-right"
            } ${visibleEvents.includes(index) ? "is-visible" : ""}`}
            key={index}
          >
            <div className="event-content">
              <span className="event-year">{event.year}</span>

              <h2>{event.title}</h2>

              <p>{event.text}</p>

              <div className="media">
                {mediaToRender(event)}
              </div>
            </div>

            <div
              className={`timeline-dot ${
                visibleEvents.includes(index) ? "active" : ""
              }`}
            />
          </article>
        ))}
      </section>
    </>
  )
}

export default App
