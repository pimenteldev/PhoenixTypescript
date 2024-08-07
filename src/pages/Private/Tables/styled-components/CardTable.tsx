import { COLORS } from "@/constants/utilitys"
import styled from "styled-components"

export const CardTableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minMax(200px, 1fr));
  gap: 20px;
`

export const CardTableBase = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 1rem;
  &:hover > figure > img {
    transform: scale(1.1);
  }
  &:hover > div {
    border-bottom: 5px solid var(--primary-color);
  }
`

export const CardTableFigure = styled.figure`
  width: 100%;
  height: 125px;
  overflow: hidden;
  border-radius: 5px;
  position: relative;
  opacity: 0.2;
`

export const CardTableFigureImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
  transition: all 0.25s ease;
`

export const CardTableName = styled.div`
  position: absolute;
  color: var(--primary-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  width: 100%;
  font-size: 20px;
  font-weight: 800;
  word-break: break-word;
`

export const CardTableLayout = styled.span`
  position: relative;
`

export const CardTableStatusOn = styled.span`
  background-color: var(--primary-color);
  color: var(--secondary-color);
  position: absolute;
  padding: 0.2rem 0.5rem;
  top: -15px;
  right: 15px;
  font-weight: 800;
  border-radius: 5px;
  opacity: 1;
  z-index: 99;
`

export const CardTableStatusOff = styled.span`
  background-color: var(--secondary-color);
  color: var(--primary-color);
  position: absolute;
  padding: 0.2rem 0.5rem;
  top: -15px;
  right: 15px;
  font-weight: 800;
  border-radius: 5px;
  opacity: 1;
  z-index: 99;
`
