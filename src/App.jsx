import { useState, useEffect, useRef } from 'react'
import './App.css'

const events = [
  {
    year: "2022",
    title: "¿Me cuidas una planta?",
    text: "Empezamos a conocernos y nos dimos cuenta de que teníamos muchas cosas en común. Hablar se sentía fluido, inspirador, divertido y pasional. Ver tu notificación de whatsapp me hacía siempre feliz.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_6205.jpg`,
  },
  {
    year: "2022",
    title: "La charla",
    text: "Yo no sabía lo que éramos, pero sí sabía que quería tenerte cerca y que haría todo lo posible para ello. Ese día se puso el primer ladrillo de nuestra familia.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_6383.jpg`,
  },
  {
    year: "2022",
    title: "Primer 'viaje' juntos",
    text: "Me enseñaste tu pueblo y fue nuestra primera convivencia. Recuerdo cenar con velas y sentir mucho amor.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_6897.jpg`,
  },
  {
    year: "2022",
    title: "Primera semilla",
    text: "Todo empezó con una planta y siguió con nuestro primer árbol. El primer 'fruto' de nuestra relación.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/328f3da5-5b50-4268-af30-104b775a4eeb.JPG`,
  },
  {
    year: "2022",
    title: "Tu casa",
    text: "Nuestro primer nido de amor. Donde creamos nuestros primeros recuerdos y donde floreció lo más profundo de nuestro amor.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_7341.jpg`,
  },
  {
    year: "2023",
    title: "Primera prueba",
    text: "Fuimos buscando un destino diferente para seguir con nuestras vidas, pero nos dimos cuenta de que no era el momento. Recuerdo el desayuno de San Valentín :)",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_4872.jpg`,
  },
  {
    year: "2023",
    title: "Primer viaje a Cuenca",
    text: "Pusimos nuestras vidas patas arriba y pasamos mi cumple juntos por primera vez. Mientras decidíamos el siguiente paso nos fuimos a respirar un poco de naturaleza.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_5141.jpg`,
  },
  {
    year: "2023",
    title: "Conozco Santo Domingo",
    text: "El día que conocí a tu familia, que ahora también será mía. Me sentí muy cómodo y acogido desde el principio.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/99ab2042-9383-43c6-9d9d-248d899d9b90.JPG`,
  },
  {
    year: "2023",
    title: "Vera",
    text: "Un lugar que está un poco gafado para nosotros pero que también ha sido testigo de conversaciones difíciles y pasos de gigante en nuestra relación.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_8024.jpg`,
  },
  {
    year: "2023",
    title: "¿Qué significa para ti casarte?",
    text: "La primera conversación que recuerdo sobre qué significa el matrimonio. Nunca antes había pensado en que me casaría, pero contigo todo es diferente.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_6980.jpg`,
  },
  {
    year: "2023",
    title: "Camino de Santiago",
    text: "Sentí que eramos un equipo en el que nos cuidábamos mutuamente y nos hacíamos fuertes frente a cualquier cosa.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/7d197a8c-7500-46cd-b4f3-0fb6845542ef.JPG`,
  },
  {
    year: "2023",
    title: "FuerteFail",
    text: "Con toda la ilusión del mundo decidimos probar suerte en otro lugar que no fuera Madrid, pero pronto descubrimos que ahí no era. Un paso atrás necesario para el futuro.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/244e14d4-ef47-455f-97fb-6e9043c20928.JPG`,
  },
  {
    year: "2024",
    title: "Primera nochevieja juntos",
    text: "Otro paso más hacia ser una familia con todas las letras. Entramos en el año 2024 de la mano, un año clave para nuestra relación.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_9596.jpg`,
  },
  {
    year: "2024",
    title: "Casa",
    text: "Por fin sentí que tenía un hogar completo. Un lugar en el que me siento seguro, querido y potenciado. La emoción más bonito del mundo es saber que tu estarás cuando vuelva.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_1150.JPG`,
  },
  {
    year: "2024",
    title: "Parador",
    text: "Quién nos iba a decir que dos años después estaríamos aquí planeando nuestra boda. Un lugar que siempre ha sido paz e inspiración para nosotros. Como nuestra relación.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_1627.JPG`,
  },
  {
    year: "2025",
    title: "Siempre acompañándonos",
    text: "Nos animamos. Nos potenciamos. Nos ayudamos. Nos protegemos. Nos cuidamos. Eres todo lo que siempre sentí que era el amor. PD: nunca pensé que iría con alguien al gym.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/FullSizeRender.jpg`,
  },
  {
    year: "2025",
    title: "Primera boda",
    text: "Celebramos el amor de otras personas y aprendimos lo que queríamos y lo que no para nosotros. Fue un día muy bonito en el que compartimos mucho con tu familia paterna.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_2655.JPG`,
  },
  {
    year: "2025",
    title: "Sira",
    text: "Ampliamos la familia con una preciosa gata que nos ha alegrado la vida. Haría cualquier cosa por las dos y eso me hace sentir muy afortunado.",
    type: "image",
    src: `${import.meta.env.BASE_URL}media/IMG_2822.JPG`,
  },
  {
    year: "Hoy",
    title: "Dale play",
    text: "",
    type: "audio",
    src: "./",
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
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [visibleEvents, setVisibleEvents] = useState([]);
  const [playing, setPlaying] = useState(false);

  const toggleAudio = () => {
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

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

              {event.type !== 'audio' && (<h2>{event.title}</h2>)}
              

              <div className="media">
                {mediaToRender(event)}
              </div>

              <p>{event.text}</p>

              {event.type === 'audio' && (
                <>
                  <button className='audioButton' onClick={toggleAudio}>
                    {playing ? "❚❚" : "▶"}
                  </button>

                  <audio
                    ref={audioRef}
                    src={event.src}
                    onEnded={() => setPlaying(false)}
                  />
                </>
              )}
            </div>
          </article>
        ))}
      </section>
    </>
  )
}

export default App
