import styled from "styled-components";

import LikeButton from "../components/LikeButton";  
import MapComponents from "../components/MapComponents";
import PopularContainer from "../components/PopularContainer";
import MainTmi_btn from "../components/common/main_Tmi_btn";

const Page = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7%;

  padding-top: 4.5%;
`;

const Left_Coponent = styled.div`
  flex: 0 0 auto;
  margin-left: 12%;
`;

const Right_Coponent = styled.div`
  flex: 0 0 40vw;
  margin-right: 9%;
  margin-top: 2%;
`;

function Home () {
  return (
    <>
      <Page>
        <Left_Coponent>
          <MapComponents/>
        </Left_Coponent>
        <Right_Coponent>
          <PopularContainer/>
          <MainTmi_btn/>
          {/*<LikeButton />  ->   좋아요 기능 - 잠시 주석처리!! */}    
        </Right_Coponent>  
      </Page>
    </>
  )
}
export default Home;

