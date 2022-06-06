import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { useParams } from "react-router-dom";

export default function CommonsEditPage() {
  let { id } = useParams();

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Leaderboard</h1>
        <p>
            This is where the leaderboard for commons with id {id} will go
        </p>
      </div>
    </BasicLayout>
  )
}
