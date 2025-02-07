import styled from "styled-components";

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
`;

export const Thead = styled.thead`
    background-color: #f4f4f4;
`;

export const Tbody = styled.tbody`
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
`;

export const Tr = styled.tr`
    border-bottom: 1px solid #ddd;
`;

export const Th = styled.th`
    padding: 12px;
    text-align: left;
    font-weight: bold;
`;

export const Td = styled.td`
    padding: 10px;
    text-align: left;
`;

export const ResumeLink = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
