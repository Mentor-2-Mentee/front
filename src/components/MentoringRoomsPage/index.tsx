import { useState } from "react";

export const MentoringRoomsPage = (): JSX.Element => {
  const [testList, setTestList] = useState<any>();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTestList([...testList]);
  };

  return <div>질의응답페이지</div>;
};

export default MentoringRoomsPage;
