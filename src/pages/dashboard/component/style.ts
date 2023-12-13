import { Card } from "antd";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const CustomCard = styled(Card)`
  border: unset;
  box-shadow: unset;
  font-size: 12px;
  height: 100%;
  padding: 1rem 0;
  .ant-card-head {
    border-bottom: unset;
  }

  &.custom-aspect-ratio {
    aspect-ratio: 16 / 9;

    @media only screen and (max-width: 1224px) {
      aspect-ratio: 1/ 1;
    }
  }
`;
