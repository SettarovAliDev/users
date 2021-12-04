import { PageNotFoundStyled, Button } from "./PageNotFoundStyles";

const PageNotFound = () => {
  return (
    <PageNotFoundStyled>
      <div>Page not found</div>
      <Button to="/">Go home</Button>
    </PageNotFoundStyled>
  );
};

export default PageNotFound;
