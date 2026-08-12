import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const events = [
  {
    year: "2019",
    title: "El comienzo",
    text: "Aquí comienza nuestra historia. Un momento que lo cambió todo.",
    type: "image",
    src: "/media/foto1.jpg",
  },
  {
    year: "2020",
    title: "Un nuevo capítulo",
    text: "Llegó una nueva etapa, llena de experiencias y momentos que recordar.",
    type: "video",
    src: "/media/video1.mp4",
  },
  {
    year: "2022",
    title: "Un momento especial",
    text: "Una de esas experiencias que merece quedarse para siempre.",
    type: "image",
    src: "/media/foto2.jpg",
  },
  {
    year: "2024",
    title: "Hasta aquí",
    text: "Y esta es la historia hasta ahora...",
    type: "video",
    src: "/media/video2.mp4",
  },
];

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
                {event.type === "image" ? (
                  <img src={event.src} alt={event.title} />
                ) : (
                  <video
                    src={event.src}
                    controls
                    muted
                    playsInline
                  />
                )}
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

      <section className="ending">
        <h2>Continuará...</h2>
      </section>
    </>
  )
}

export default App
