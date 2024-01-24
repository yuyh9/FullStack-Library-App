import { Carousel } from "react-bootstrap";
import { Info } from "./components/Info";
import { LibraryServices } from "./components/LibraryServices";
import { TopBooks } from "./components/TopBooks";

export const HomePage = () => {
  return (
    <div>
      <>
        <TopBooks />
        <Carousel />
        <Info />
        <LibraryServices />
      </>
    </div>
  );
}
