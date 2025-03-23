import { experiences } from "@/src/app/constants/resume";
import { calculateTotalExperienceInYears } from "@/src/app/utils/resume";

export default function resumeIntroduce() {
  return (
    <>
      {/* Introduce */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="font-semibold text-cyan-500 text-3xl uppercase mb-11">
          Introduce
        </div>
        <div className="col-span-3">
          <p className="text-base mb-4 font-normal">
            웹 서비스의 기획과 설계부터 개발, 배포 및 운영까지 전반적인 과정을
            경험하며 {calculateTotalExperienceInYears(experiences)}간 꾸준히
            성장해온 프론트엔드 개발자입니다.
          </p>
          <p className="text-base mb-4">
            성능 최적화와 효율적인 코드 설계를 통해 사용자 중심의 쾌적한 환경을
            만드는 것을 중요하게 생각하며, 견고하고 유지보수하기 좋은 코드를
            작성하기 위해 끊임없이 고민하고 노력하고 있습니다. 또한,
            개발과정에서 발생하는 비효율적인 작업을 최소화하고, 핵심 문제를
            빠르고 명확하게 해결하는 구조와 개발 방식을 고민하고 실천하고
            있습니다. 애니메이션과 3D 그래픽 등 다양한 기술을 활용한 사용자 경험
            개선에도 지속적으로 관심을 가지고 학습하며 적용하고 있습니다.
            프론트엔드 개발 분야의 정점에 오르겠다는 목표를 가지고 끊임없이
            학습하며 성장하고 있습니다.
          </p>
          <p className="text-base ">
            캐나다 시민권자로 현재 F-4 재외동포 비자로 한국에 거주하며, 해외
            기업에서의 근무 경험과 다양한 문화적 배경을 가진 동료들과 협업한
            경험이 풍부합니다. 개인적으로도 커뮤니케이션의 중요성을 깊이
            공감하며, 이를 통해 팀 내에서 더욱 효과적이고 유연한 업무 수행에
            도움을 받고 있습니다.
          </p>
        </div>
      </div>
    
    </>
  );
}
