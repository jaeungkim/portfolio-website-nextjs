import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "first-meeting",
    year: "2016",
    title: "First Meeting",
    description: "We met in Bali and it was love at first sight.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
  {
    id: "first-date",
    year: "2017",
    title: "First Date",
    description: "Our first official date in Seoul.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
  {
    id: "first-anniversary",
    year: "2018",
    title: "1 Year Together",
    description: "Celebrating our first year together.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
  {
    id: "engagement",
    year: "2023",
    title: "Engagement",
    description: "The day he proposed under the cherry blossoms.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
  {
    id: "wedding-day",
    year: "2024",
    title: "Wedding Day!",
    description: "Our beautiful wedding day surrounded by loved ones.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
];

export default function HowWeMet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;

    if (!container || !gallery) return;

    const timelinePanels = gsap.utils.toArray(".timeline-panel", gallery);

    timelinePanels.forEach((panel, i) => {
      gsap.set(panel as HTMLElement, { xPercent: i * 100 });
    });

    const horizontalTween = gsap.to(".timeline-panel", {
      xPercent: "-=500",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=1500px",
        scrub: true,
        invalidateOnRefresh: true,
        pin: true,
      },
    });

    timelinePanels.forEach((panel, i) => {
      const panelContent = (panel as HTMLElement).querySelector("div");

      if (panelContent) {
        gsap.fromTo(
          panelContent,
          { scale: 0.8 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel as HTMLElement,
              start: "left center",
              end: "right center",
              scrub: true,
              containerAnimation: horizontalTween,
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div
        ref={galleryRef}
        className="flex h-full w-full"
        style={{ flexShrink: 0, minHeight: "100vh" }}
      >
        <div className="timeline-panel absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-4">
                Our Love Story
              </h2>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-8"></div>
              <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                <span>👈 Scroll down to see our story 👉</span>
              </div>
            </div>
          </div>
        </div>

        {timelineEvents.map((event) => (
          <div
            key={event.id}
            className="timeline-panel absolute inset-0 flex items-center justify-center"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="container mx-auto px-6 flex items-center justify-center h-full">
              <div className="max-w-md mx-auto rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-800">
                    {event.year}
                  </div>
                </div>

                <div className="relative mb-6 rounded-xl h-64 flex items-center justify-center overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={`${event.year} Memory`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-5xl mb-3">📸</div>
                      <div className="text-base">{event.year} Memory</div>
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
