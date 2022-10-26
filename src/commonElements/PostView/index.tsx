import Body from "./Body";
import Header from "./Header";

type PostViewData = {
  postId: number;
  tag?: string;
  detailTag?: string[];
  title: string;
  description: string;
  author: string;
  createdAt: string;
  viewCount: number;
};

interface PostViewProps {
  board: string;
  postViewData: PostViewData;
  upperBody?: JSX.Element;
  lowerBody?: JSX.Element;
}

export const PostView = ({
  board,
  postViewData,
  upperBody,
  lowerBody,
}: PostViewProps) => {
  return (
    <>
      <Header
        headerData={{
          board,
          ...postViewData,
        }}
      />

      <Body
        description={postViewData.description}
        upperBody={upperBody}
        lowerBody={lowerBody}
      />
    </>
  );
};

export default PostView;
