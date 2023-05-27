import { useParams } from "react-router-dom";

const SuccessPage = () => {
  const { name } = useParams();

  return (
    <div className="container p-4 text-center">
      <h3 className="h3 ">
        You have been successfully authenticated by our Voice-authentication
        system!
      </h3>
      <h3 className="h3 text-success">Welcome home, {name}!</h3>
    </div>
  );
};

export default SuccessPage;
