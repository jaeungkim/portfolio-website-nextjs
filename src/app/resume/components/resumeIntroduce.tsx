import ResumeTitle from "./ResumeTitle";

export default async function ResumeIntroduce() {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-4">
      <ResumeTitle title="Introduce" />
      <div className="col-span-3 flex flex-col gap-2 dark:text-neutral-300 text-neutral-700 mt-6 md:mt-0">
        <p>
          안녕하세요. 웹 서비스의 기획과 설계부터 개발, 배포 및 운영까지
          전반적인 과정을 두루 경험하며 꾸준히 성장해온 프론트엔드 개발자입니다.
        </p>
        <p>
          누구나 쉽게 이해하고 유지보수할 수 있는 명확한 코드를 작성하는 것을
          중요하게 생각하며, 항상 견고하고 효율적인 코드 작성에 노력하고
          있습니다. 또한, 언젠가는 프론트엔드 개발 분야의 정점에 오르겠다는
          목표를 가지고 끊임없이 학습하고 있습니다.
        </p>
        <p>
          개발자로서 소통이 성장에 큰 역할을 한다고 생각해, 평소에도 동료들과의
          기술적 대화나 커뮤니티 활동을 통해 꾸준히 배우고 함께 성장하기 위해
          노력하고 있습니다.
        </p>
      </div>
    </div>
  );
}
