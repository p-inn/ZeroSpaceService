This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Zerospace Project

## ✔️ Commit Message Rule

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `docs` : 문서 수정
- `style` : 스타일 관련 (코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)
- `refactor` : 코드 리팩토링
- `test` : 테스트 코드
- `chore` : 빌드 업무, 패키지 매니저 수정

## ✔️ Git Flow

1. **이슈 작성**
    - Title
        - [commit message] 제목
        - ex) [docs] PR 템플릿 작성
    - Assignees
        - 본인 선택
    - Labels
        - 제목에 포함된 commit message와 연관된 심볼을 선택
    - Project
2. **branch 생성**
    - **`origin/develop`** branch를 기반으로 아래와 같은 이름으로 생성한다.
    - feature/작업자 #이슈번호
3. **2번에서 생성한 branch를 checkout 후 push한다.**
4. **해당 branch에서 issue에 해당하는 작업을 하고, commit message rule에 맞춰서 commit 후 push한다.**
5. **모든 작업이 완료되면 해당 branch를 pull request(PR)를 아래와 같은 형식으로 요청한다.**
    - Title
        - 프로젝트명 #이슈번호 제목
        - ex) 냉장고를부탁해 #3 개발환경 셋팅
    - Content
        - 작업 목적
        - 작업 내용
        - 관련된 이슈/커밋/PR
    - Reviewers
        - 팀원 모두 선택
    - Assignees
        - 본인 선택
    - Labels
        - 작업과 연관된 심볼을 선택
6. **모든 멤버가 코드 리뷰를 완료하면 PR 생성자가 merge를 진행하고 해당 branch를 삭제한다.**
    - 마지막 리뷰어는 PR 생성자를 멘션하여 모든 코드 리뷰가 끝남을 알린다.
7. **해당 issue를 close한다.**

