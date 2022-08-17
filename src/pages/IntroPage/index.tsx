import { Link } from "react-router-dom";

export const IntroPage = (): JSX.Element => {
  return (
    <div style={{ height: 1800 }}>
      <div>여기는</div>
      <div>인트로페이지</div>
      <Link to="/main">메인페이지로 이동</Link>
    </div>
  );
};

export default IntroPage;
