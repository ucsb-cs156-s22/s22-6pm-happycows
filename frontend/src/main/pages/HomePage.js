import React, { useState, useEffect } from "react"
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CommonsList from "main/components/Commons/CommonsList";
import { Container, Row, Col } from "react-bootstrap";
import { useCurrentUser } from "main/utils/currentUser";
import { useCommons, useJoinCommons } from "main/utils/commons";
import { useNavigate } from "react-router-dom";
import Background from './../../assets/HomePageBackground.jpg';

export default function HomePage() {
  const [commons, setCommons] = useState([]);
  const [commonsJoined, setCommonsJoined] = useState([]);
  const { data: currentUser } = useCurrentUser();
  const { data: c } = useCommons();

  const mutation = useJoinCommons({onSuccess: () => {}, onError: (error, id) => {console.error(`Error posting data to ${"/api/commons/join/" + id}:`, error)}})

  useEffect(
    () => {
      if(currentUser?.root?.user?.commons){
        setCommonsJoined(currentUser.root.user.commons);
      }
    },[currentUser]
  );

  useEffect(
    () => {
      if(c){
        setCommons(c);
      }
    },[c]
  );

  let navigate = useNavigate();
  const visitButtonClick = (id)=> {navigate("/play/"+id)};

  return (
    <div style={{backgroundSize: 'cover', backgroundImage: `url(${Background})`}}>
    <BasicLayout>
        <h1 data-testid="homePage-title" style={{fontSize: "75px", borderRadius: "7px", backgroundColor: "white", opacity:".9"}} className="text-center border-0 my-3">Howdy Farmer</h1>
        <Container>
          <Row>
            <Col sm><CommonsList commonList={commonsJoined} buttonText={"Visit"} buttonLink={visitButtonClick}/></Col>
            <Col sm><CommonsList commonList={commons} buttonText={"Join"} buttonLink={mutation.mutate}/></Col>
          </Row>
        </Container>
    </BasicLayout>
    </div>
  )
}