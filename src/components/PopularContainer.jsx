import React, {useDebugValue, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle, themeColors } from "../assets/styles/StyledComponents";
import axios from "axios";


import row3Left from "../assets/images/Group 94.svg"
import row3Right from "../assets/images/Group 95.svg"
import row1Left from "../assets/images/Group 96.svg"
import row1Right from "../assets/images/Group 97.svg"
import row2Left from "../assets/images/Group 117.svg"
import row2Right from "../assets/images/Group 118.svg"

const Pop_Box= styled.div`
  display: block;
`;

const Top_PopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${themeColors.red.color};
  border: 1px solid ${themeColors.red.color};
  border-radius: 16px 16px 0 0;
  width: 23vw;
  height: 10vh;
`;

const Top_Circle = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;

  width: 40%;
  height: 80%;
  background-color: ${themeColors.white.color};
  border-radius: 50%;

  font-size: 1.4vw;
  font-weight: 800;
`;

const Bottom_PopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid ${themeColors.black.color};
  border-top: none;
  border-radius: 0 0 16px 16px;
  width: 23vw;
  height: 59vh;
`;

const Mini_title = styled.div`
  display: flex;
  align-items: center;
  margin: 4% 3% 4% 3%;
  gap: 10px;
`;

const Mini_icon = styled.img`
  width: 29px;
  height: 29px;
  flex: 0 0 auto;
`;

const Mini_Text =styled.h2`
  margin: 0;
  font-size: 1.05vw;
  font-weight: 800;
  line-height: 1;
  color: ${themeColors.black.color};
`;

const SectionPost = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  padding: 0 4% 0 4%;

  &:hover {
    background-color: #F27533;
    color: ${themeColors.white.color};
  }

  h3 {
    margin: 2% 0 1% 0;
    font-size: 0.85vw;
    font-weight: 600;
    line-height: 1;
  }

  p {
    margin: 1% 0 2% 0;
    font-size: 0.7vw;
    display: block;
    align-self: stretch;
    font-weight: 600;
    line-height: 1;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


function SectionTitle({leftIcon, rightIcon, alt, children}) {
  return(
    <Mini_title>
      <Mini_icon src={leftIcon} alt={alt} />
      <Mini_Text>{children}</Mini_Text>
      <Mini_icon src={rightIcon} alt={alt}/>
    </Mini_title>
  )
}


function PopularContainer () {

  const [posts, setPosts] = useState([]);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getPopPost = async() => {
    const {data} = await axios.get('/api/tops', {timeout:20000});
    const list = data?.show_Top ?? [];
    return list.map((info, i) => ({
      id: info?.id ?? `noid-${i}`,
      title: (info?.title ?? "").trim() || "제목 없음",
      content: (info?.content ?? "").trim() || "내용 없음",
    }));
  };

    

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const formatted = await getPopPost();
        if (alive) setPosts(formatted);
      } catch (e) {
        console.error("API 호출 실패:", e?.message, e?.response?.data);
        if (alive) { setErr("정보를 불러오지 못했습니다."); setPosts([]); }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);
  
  if (loading)
    return <>불러오는 중...</>;
  if (err)
    return <>{err}</>;

  return (
    <>
      <Pop_Box>
        <Top_PopContainer>
          <Top_Circle>
            인기글
          </Top_Circle>
        </Top_PopContainer>
        
        <Bottom_PopContainer>
          <SectionTitle leftIcon={row1Left} rightIcon={row1Right} alt="핫태">
            가장 널리 퍼진 이야기 (조회수 1등)
          </SectionTitle>
          { posts.slice(0,2).map((post) => (
            <SectionPost key={post.id} onClick={() => navigate(`/records/${post.id}`)}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </SectionPost>
          ))}

          <SectionTitle leftIcon={row2Left} rightIcon={row2Right} alt="중요">
            가장 널리 퍼진 이야기 (좋아요 1등)
          </SectionTitle>  
          { posts.slice(2,4).map((post) => (
            <SectionPost key={post.id} onClick={() => navigate(`/records/${post.id}`)}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </SectionPost>
          ))}

          <SectionTitle leftIcon={row3Left} rightIcon={row3Right} alt="대박">
            가장 최근 게시된 이야기
          </SectionTitle>
          { posts.slice(4,6).map((post) => (
            <SectionPost key={post.id} onClick={() => navigate(`/records/${post.id}`)}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </SectionPost>
          ))}

        </Bottom_PopContainer>
      </Pop_Box>
    </>
  )
}

export default PopularContainer;