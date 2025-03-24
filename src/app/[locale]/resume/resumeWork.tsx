import { experiences } from "@/src/app/constants/resume";
import {
  calculateExperience,
  calculateTotalExperience,
} from "@/src/app/utils/resume";
// import Link from "next/link";
import { Link } from "@/src/i18n/routing";

export default function ResumeWork() {
  return (
    <>
      <div className="flex justify-between">
        <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
          Experience
        </div>
        {/* pill of total */}
        <div className="mt-2">
          <p className="text-xs py-1 px-4 bg-cyan-200 rounded-full whitespace-nowrap dark:text-zinc-800">
            총 {calculateTotalExperience(experiences)}
          </p>
        </div>
      </div>

      {/* e8ight */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="w-full flex md:block md:text-right md:px-4 mb-4">
          <p className="text-2xl font-medium text-[#808080] whitespace-nowrap">
            2024.01 ~
          </p>
          <div className="flex justify-center ml-auto items-center align-middle">
            <p className="font-medium text-xs py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto md:mt-4 dark:text-zinc-800">
              {calculateExperience("2024-01-01")}
            </p>
          </div>
        </div>

        <div className="col-span-3">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://e8ight.co.kr"
            target="_blank"
          >
            <p>이에이트</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-4 mb-4">
            잠실, 대한민국
          </p>
          <p className="text-base font-normal text-[#808080] italic mt-4">
            플랫폼 개발팀 프론트엔드 개발자 | 주임 연구원
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>
              사내 프론트엔드 팀을 위해 공통 템플릿 구축으로 초기 개발 환경 세팅
              시간 단축
            </li>
            <li>
              디자인 시스템 및 공통 컴포넌트 개발, Storybook을 통해
              디자이너와 소통 및 개발 협업 효율 향상
            </li>
            <li>
              네트워크 및 렌더링 최적화로 주요 제품의 초기 로딩 속도 약 80% 개선
              (10초→2초)
            </li>
            <li>
              대규모 데이터도 빠르고 가볍게 표시할 수 있도록 Virtualization을 활용하여 성능 향상
            </li>
          </ul>
          <div className="ml-4">
            <div className="mt-4">
              <p className="text-base font-normal text-cyan-400">NDXPRO PMIS</p>
              <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-3">
                <li>
                  <strong>간트 차트 (WBS 기반) 개발 및 성능 최적화</strong>
                 <ul className="pl-5 list-[circle] flex flex-col gap-1 mt-1">
   <li>
      외부 라이브러리의 한계를 극복하고, 복잡한 프로젝트 관리 데이터를 직관적으로 시각화하기 위해 WBS 기반 React 커스텀 간트 차트 아키텍처를 설계 및 구현
   </li>
   <li>
      복잡한 Task 의존관계(FS, SS, SF, FF)를 SVG Path 기반 커스텀 연결선 렌더링 로직으로 구현  
      → 좌표 계산 및 경로 최적화로 복잡한 프로젝트 환경에서도 높은 가독성과 성능 유지
   </li>
   <li>
      BOM 트리 및 간트 바 차트의 드래그앤드롭 인터랙션을 통해 Task 순서, 계층 및 일정을 직관적으로 수정할 수 있는 기능 제공
   </li>
   <li>
      Task 일정 및 구조 변경 기능에 Optimistic UI 패턴 적용  
      → Drag & Drop 인터랙션 시 서버 응답 전 상태 선반영 및 실패 시 롤백 처리로 데이터 무결성과 UX 일관성 확보
   </li>
   <li>
      가상 스크롤링(Virtualization) 및 Lazy Loading을 적용하여 수천 개 Task 데이터의 렌더링 성능을 최적화하고, DOM 렌더링 성능 40% 개선
   </li>
</ul>
                </li>

                <li>
                  <strong>도면 관리 시스템 개발</strong>
                  <ul className="pl-5 list-[circle] flex flex-col gap-2 mt-1">
                        <li>
      폴더 및 파일을 트리 구조로 시각화하는 재귀 컴포넌트 아키텍처 설계 및 구현, 대용량 데이터 렌더링 최적화 및 상태 동기화 고려
    </li>
                    
    <li>
      웹 기반 File Explorer 인터페이스 구현, 운영체제 수준의 다중 선택, 컨텍스트 메뉴 및 단축키 지원으로 데스크탑 수준의 사용자 경험 제공
    </li>
                      <li>
      Drag & Drop 인터랙션과 파일 시스템 이벤트 처리를 통해 폴더 및 파일 이동, 복사 등 파일 관리 기능 구현
    </li>

                   <li>
      webkitdirectory와 비동기 업로드 처리로 폴더 단위 대량 문서 업로드 지원, 업로드 중 UI 반응성 유지 및 에러 핸들링 최적화
    </li>
                   <li>
      도면 문서의 버전 관리 및 변경 이력 추적 시스템 설계, 파일 변경 내역과 리비전 관리로 프로젝트 변경 사항 관리
    </li>
                    <li>
      주요 도면 파일 포맷(PDF, CAD 등)의 Web Viewer 및 미리보기 기능 개발
    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <Link
                className="text-base font-normal text-cyan-400 hover:text-cyan-500"
                href="https://www.youtube.com/watch?v=ZjW2mqULi_k&ab_channel=E8%7C%EC%9D%B4%EC%97%90%EC%9D%B4%ED%8A%B8"
                target="_blank"
              >
                <p>NDXPRO EPC</p>
              </Link>
              <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">               
 <li>
      SVG 기반 2D 도면 뷰어 및 마크업 기능 설계 및 구현
      <ul className="pl-5 list-[circle] flex flex-col gap-2 mt-1">
              <li>
    SVG 기반 2D Viewer에 줌인/아웃 및 클릭 이벤트를 연동하여, 복잡한 도면 내 세부 영역을 직관적으로 탐색 가능하도록 기능 구현
  </li>
                  <li>
    SVG 상에서 마우스 이벤트 기반으로 텍스트, 직선, 곡선 등의 마크업 도구 제공, 직관적인 도면 주석 및 편집 인터랙션 설계
  </li>


             <li>
    확대·축소 시에도 마크업 요소의 위치와 비율이 정확하게 유지되도록 SVG 좌표 변환 및 스케일 처리 로직 적용
  </li>
              <li>
    마크업 요소 생성, 수정, 삭제 기능을 통해 도면 편집 프로세스를 최적화하고, 사용자 워크플로우의 효율성 개선
  </li>

      </ul>
    </li>
 <li>
                 사용자 경험과 UI 유연성 강화를 위해, React Grid Layout 기반의 사용자 정의형 동적 대시보드 아키텍처를 주도적으로 설계 및 도입
                </li>
                <li>
                  미리보기 카드를 통해 데이터를 병렬로 확인하고, 자유로운 배치와
                  즐겨찾기 기능으로 사용자 맞춤형 대시보드를 구현
                </li>


          
                <li>
                  iframe의 postMessage API를 활용하여 협력 업체와의 3D Viewer와
                  연동하고 원활한 데이터 통신 기능 구현
                </li>
                <li>
                  {" "}
                  <Link
                    className="hover:text-cyan-500"
                    href="https://www.youtube.com/watch?v=ZjW2mqULi_k&ab_channel=E8%7C%EC%9D%B4%EC%97%90%EC%9D%B4%ED%8A%B8"
                    target="_blank"
                  >
                    <p className="underline underline-offset-2">
                      튜토리얼 영상 바로가기
                    </p>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-base font-normal text-cyan-400">
                NDXPRO ADMIN WEB
              </p>

              <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-3">
                <li>
                  <strong>프론트엔드 아키텍처 개편 및 스택 최신화</strong>
                  <ul className="pl-5 list-[circle] flex flex-col gap-2 mt-1">
                    <li>
                      프론트엔드 아키텍처 전면 개편 및 스택 업그레이드를
                      주도하여 프로젝트 전반의 기술 기반 최신화
                    </li>
                    <li>
                      기존 SASS/CSS 기반 스타일링을 Tailwind CSS로
                      마이그레이션하여 스타일 일관성과 생산성 개선
                    </li>
                    <li>
                      프로젝트 코드 컨벤션을 수립하여 코드 품질 및 유지보수성을
                      강화하고 일관성 있는 개발 문화 정착
                    </li>
                    <li>
                      Husky, pre-commit Hook, 등을 도입하여 커밋 단계에서 코드
                      정적 분석 및 포맷팅 자동화를 구현하고, 코드 리뷰 품질
                      기준을 강화하여 안정적인 협업 환경 구축
                    </li>
                  </ul>
                </li>

                <li>
                  <strong>인증 및 사용자 관리 기능 개선</strong>
                  <ul className="pl-5 list-[circle] flex flex-col gap-2 mt-1">
                   <li>
      기존 로그인 및 회원가입 기능의 레거시 코드를 전면 리팩토링하여 인증 프로세스의 안정성 및 유지보수성 향상
    </li>
                   <li>
      Axios Interceptor를 활용해 인증 토큰 갱신 및 세션 만료 처리 로직을 개선, 사용자 세션의 안정성과 보안성 강화
    </li>
                  </ul>
                </li>

                <li>
                  <strong>
                    Data Manager 기능 개발 및 데이터 모델링 고도화
                  </strong>
                  <ul className="pl-5 list-[circle] flex flex-col gap-2 mt-1">
                    <li>
      디지털 트윈 NGSI-LD 표준 기반의 Attribute, Data Model, Relationship 생성 및 관리 기능 설계 및 개발
    </li>

    <li>
      React Flow를 활용하여 복잡한 데이터 모델 간 관계를 직관적으로 시각화하고, 사용자 중심의 데이터 모델링 UX 제공
    </li>

    <li>
      Excel Import/Export 기능을 통해 대규모 데이터의 일괄 등록 및 다운로드 프로세스를 최적화하여 데이터 관리 효율성 강화
    </li>

    <li>
      Excel 업로드 시 클라이언트 측 유효성 검증 및 셀/행 단위 오류 시각화를 통해 데이터 입력 정확성과 사용자 편의성 개선
    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="mt-4">
              <p className="text-base font-normal text-cyan-400">
                연합트윈 과제
              </p>

              <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
                <li>
  다수 기관이 참여한 디지털 트윈 연구 과제에서 주관 기업 소속 메인 프론트엔드 개발자로 참여
</li>

<li>
  기관별 기능을 통합하는 연합 포털 플랫폼 아키텍처 설계 및 개발, 데이터 접근성과 사용성 최적화
</li>

<li>
  다기관 환경을 고려한 반응형 웹 UI/UX 설계로 사용자 접근성 및 편의성 향상
</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* Flashee */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="w-full flex md:block md:text-right md:px-4 mb-4">
          <p className="text-2xl font-medium text-[#808080] whitespace-nowrap">
            2023.07 ~ 2023.10
          </p>
          <div className="flex justify-center ml-auto items-center align-middle">
            <p className="font-medium text-xs py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto md:mt-4 dark:text-zinc-800">
              {calculateExperience("2023-07-01", "2023-10-01")}
            </p>
          </div>
        </div>

        <div className="col-span-3">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://flashee.app"
            target="_blank"
          >
            <p>Flashee</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-4 mb-4">
            밴쿠버, 캐나다
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            프론트엔드 개발자
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>통합 의류 쇼핑 마켓플레이스(E-Commerce) 스타트업</li>
            <li>
              첫 번째 개발자로 입사하여 사내에 필요한 모든 프론트엔드 서비스
              기획/개발/배포/운영
            </li>
            <li>
              Shopify Marketplaces가 원활하게 통합된 정교한 E-Commerce 플랫폼
              개발
            </li>
            <li>
              Supabase 및 서드파티(Instagram, TikTok 등) 로그인 키트를 통해
              플랫폼 보안 및 사용자 접근성 향상
            </li>
            <li>
              Redux를 활용하여 효율적인 상태 관리 및 데이터 흐름 최적화로
              애플리케이션의 반응 속도 및 성능 향상
            </li>
            <li>
              Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및
              성공적인 거래 증가
            </li>
            <li>AWS 및 Fly.io 을 이용한 클라우드 환경 구축</li>
            <li>
              신속한 온보딩 과정을 촉진하여 소프트 런칭 당일 초기 수익 창출에
              기여
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* iClinic Systems */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="w-full flex md:block md:text-right md:px-4 mb-4">
          <p className="text-2xl font-medium text-[#808080] whitespace-nowrap">
            2022.07 ~ 2023.06
          </p>
          <div className="flex justify-center ml-auto items-center align-middle">
            <p className="font-medium text-xs py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto md:mt-4 dark:text-zinc-800">
              {calculateExperience("2022-07-01", "2023-06-01")}
            </p>
          </div>
        </div>
        <div className="col-span-3">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.aiclinic.ca"
            target="_blank"
          >
            <p>iClinic Systems Inc.</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-4 mb-4">
            밴쿠버, 캐나다
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            풀스택 개발자
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>
              병원 및 클리닉 네트워크를 대상으로 하는 EMR(Electronic Medical
              Records) SaaS 스타트업
            </li>
            <li>
              WebGL 기술을 적극 활용하여 사내 마케팅 프로젝트 전체를 독자적으로
              설계 및 구현, 현대적인 웹 경험 제공
            </li>
            <li>
              Framer Motion과 GSAP 기반의 인터랙션 및 애니메이션 구현으로
              직관적이고 몰입감 있는 사용자 경험 제공
            </li>
            <li>
              기술적 지식이 없는 경영진도 사용 가능한 사내 인력 및 근태 관리
              어드민 포털 개발 및 운영, 효과적인 직원 관리 지원
            </li>
            <li>AWS 인프라 및 NoSQL 데이터베이스 모델링, 서버 구축 및 관리</li>
            <li>
              전반적인 백엔드 구현, 인프라 구축, 이벤트 설계 및 RESTful API 개발
            </li>
            <li>클라이언트 사용 가능한 CRUD API 구현</li>
            <li>
              이벤트 구독 시 자동 이메일 발송 기능을 포함한 어드민 시스템 구축
              (AWS SES, Node.js, Angular)
            </li>
            <li>NGINX를 이용한 인프라 구축 및 무중단 배포로 운영</li>
            <li>Google Analytics을 적용하여 서비스 사용자 데이터 분석</li>
            <li>GitHub Action을 기반으로 CI/CD 구성</li>
          </ul>
        </div>
      </div>
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      {/* Catalyx */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="w-full flex md:block md:text-right md:px-4 mb-4">
          <p className="text-2xl font-medium text-[#808080] whitespace-nowrap">
            2021.01 ~ 2022.05
          </p>
          <div className="flex justify-center ml-auto items-center align-middle">
            <p className="font-medium text-xs py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto md:mt-4 dark:text-zinc-800">
              {calculateExperience("2021-01-01", "2022-05-01")}
            </p>
          </div>
        </div>
        <div className="col-span-3">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.catalyx.io"
            target="_blank"
          >
            <p>Catalx Management Ltd.</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-4 mb-4">
            밴쿠버, 캐나다
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            프론트엔드 개발자
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>캐나다에 위치한 암호화폐 거래소 스타트업</li>
            <li>
              React 기반의 컴포넌트 아키텍처 설계 및 프론트엔드 생태계 구축으로
              기업의 기술 기반 강화
            </li>
            <li>
              다양한 외부 시스템을 성공적으로 통합, 고객이 신용카드를 이용해
              암호화폐를 구입할수 있는 기능 구현
            </li>
            <li>Apollo로 REST API를 GraphQL로 마이그레이션, 앱 성능 개선</li>
            <li>
              프론트엔드 최적화로 웹사이트 성능, 접근성, SEO 등 기존에 부족했던
              부분들을 전반적으로 개선
            </li>
            <li>
              AWS Lambda@Edge와 Facebook Open Graph를 사용해 소셜 미디어용 URL
              미리보기 기능 구현
            </li>
            <li>디자이너 팀원들과 협력하여 전체적인 UI/UX 개선</li>
          </ul>
        </div>
      </div>
    </>
  );
}
