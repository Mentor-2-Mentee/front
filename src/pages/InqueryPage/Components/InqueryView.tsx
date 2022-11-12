import PostView from "../../../commonElements/PostView";

interface InqueryViewProps {
  inqueryId: number;
}

const TEST_DATA = {
  id: 1,
};

export const InqueryView = ({ inqueryId }: InqueryViewProps) => {
  //const {data: inqueryData, status} = useGetInqueryQuery({inqueryId})

  return (
    <>
      <PostView
        board="문의 페이지"
        postViewData={{
          postId: 1,
          title: "테스트문의",
          description: "테스트문의내용",
          author: "미도리",
          createdAt: "2022-11-11",
        }}
      />
    </>
  );
};
