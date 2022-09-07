import styled from "styled-components";
import {theme} from "../../../h4/constants";

export const SSuperEditableSpanWrapper = styled.div((props) => ({
    display: "flex",
    maxWidth: 180,
    width: 200,
}))

type TSSuperEditableSpan = {
    maxWidth?: number | string
}
export const SSuperEditableSpan = styled.span<TSSuperEditableSpan>((props) => ({
    padding: "7px 10px",
    borderRadius: 10,
    fontSize: 14,
    width: "100%",
    maxWidth: props.maxWidth || "100%",
    border: "none",
    color: "inherit",
    backgroundColor: theme.colors.secondary,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
}))