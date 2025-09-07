import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

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
    title: "첫 만남",
    description: "발리에서 우연히 만나 첫눈에 반했어요.",
    image: "/images/mobile-wedding/gallery/jae1.jpeg",
  },
  {
    id: "first-date",
    year: "2017",
    title: "첫 데이트",
    description: "서울에서 첫 공식 데이트, 시작이었어요.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
  {
    id: "travel-together",
    year: "2018",
    title: "첫 여행",
    description: "함께한 첫 여행, 추억이 가득했어요.",
    image: "/images/mobile-wedding/gallery/main22.jpeg",
  },
  {
    id: "moving-in",
    year: "2019",
    title: "동거 시작",
    description: "함께 살기 시작한 소중한 시간들.",
    image: "/images/mobile-wedding/gallery/ara1.png",
  },
  {
    id: "pandemic-year",
    year: "2020",
    title: "함께한 팬데믹",
    description: "어려운 시기에도 서로를 지지했어요.",
    image: "/images/mobile-wedding/gallery/main23.jpeg",
  },
  {
    id: "trip-to-canada",
    year: "2021",
    title: "캐나다 여행",
    description: "캐나다로의 특별한 여행 기억.",
    image: "/images/mobile-wedding/gallery/jae2.png",
  },
  {
    id: "second-anniversary",
    year: "2022",
    title: "5년 동거",
    description: "함께한 5년, 더 단단해진 우리.",
    image: "/images/mobile-wedding/gallery/main24.jpeg",
  },
  {
    id: "engagement",
    year: "2023",
    title: "프러포즈",
    description: "벚꽃 아래서 청혼받은 아름다운 날.",
    image: "/images/mobile-wedding/gallery/jae3.png",
  },
  {
    id: "wedding-day",
    year: "2024",
    title: "결혼식",
    description: "사랑하는 사람들과 함께한 축복의 날.",
    image: "/images/mobile-wedding/gallery/main.jpeg",
  },
];
export default function HowWeMet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const gallery = galleryRef.current;

    if (!container || !gallery) return;

    const timelinePanels = gsap.utils.toArray(".timeline-panel", gallery);

    timelinePanels.forEach((panel, i) => {
      gsap.set(panel as HTMLElement, { xPercent: i * 100 });
    });

    const horizontalTween = gsap.to(".timeline-panel", {
      xPercent: `-=${(timelinePanels.length - 1) * 100}`,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${(timelinePanels.length - 1) * 50}%`,
        scrub: 0.5,
        invalidateOnRefresh: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
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
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ willChange: "transform" }}
    >
      <div
        ref={galleryRef}
        className="flex w-full"
        style={{ flexShrink: 0, minHeight: "100vh" }}
      >
        {timelineEvents.map((event) => (
          <div
            key={event.id}
            className="timeline-panel absolute inset-0 flex items-center justify-center"
            style={{ width: "100%", height: "100%" }}
          >
            <div className="container px-6 flex items-center justify-center h-3/4 m-auto">
              <div className="mx-auto w-full max-w-md h-full rounded-2xl shadow-lg p-6 bg-white border border-gray-100 flex flex-col">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-800">
                    {event.year}
                  </div>
                </div>

                <div className="relative mb-4 rounded-xl flex-1 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={`${event.year} Memory`}
                      fill
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">📸</div>
                      <div className="text-sm">{event.year} Memory</div>
                    </div>
                  )}
                </div>

                <div className="text-center flex-shrink-0 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
