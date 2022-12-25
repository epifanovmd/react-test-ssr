import { Input, Switch } from "@force-dev/react-front";
import { camelize } from "@force-dev/utils";
import React from "react";
import styled from "styled-components";

import { DocumentProps } from "../../renderer/types";

export const documentProps: DocumentProps = {
  title: "Главная страница",
};

export const onBeforeRender = async () => {
};

export const Page = () => (
  <div>
    <Text>123</Text>
    <Switch />
    <Input placeholder={camelize("placeholder")} />
  </div>
);

const Text = styled.div`
  color: #000;
`;
