import BasicLayout from "main/layouts/BasicLayout/BasicLayout";

export default function LeaderboardIndexPage(){
    
    const { commonsId } = useParams();
    const { data: currentUser } = useCurrentUser();
  
    //probably don't need user commons because leaderboard isn't different for each user lol
    // Stryker disable all 
    const { data: userCommons } =
      useBackend(
        [`/api/usercommons/forcurrentuser?commonsId=${commonsId}`],
        {
          method: "GET",
          url: "/api/usercommons/forcurrentuser",
          params: {
            commonsId: commonsId
          }
        }
      );
    // Stryker enable all 

    // Stryker disable all 
    const { data: commons } =
        useBackend(
            [`/api/commons?commons_id=${commonsId}`],
            {
                method: "GET",
                url: "/api/commons",
                params: {
                    id: commonsId
                }
             }
        );
// Stryker enable all 
    
    return(
        <BasicLayout>
            <div className="pt-2">
                <h1>Leaderboard</h1>
                <p>This is a  placeholder for Leaderboard</p>
            </div>
        </BasicLayout>
    )
} 