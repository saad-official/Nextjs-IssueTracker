import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/issues/_components/issueForm"), {
  ssr: false,
  loading: () => <p>loading...</p>,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
