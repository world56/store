// import { Select } from "antd";
import { useState } from "react";
import { Modal } from "@/layout/PopUp";
import { PopUpAddBtn } from "@/layout/Button";

const SelectSpec = () => {

  const [visible, setVisible] = useState(false);

  function onOpen() {
    setVisible(b => !b);
  };

  return (
    <>
      <PopUpAddBtn onClick={onOpen}>规格模板</PopUpAddBtn>
      <Modal visible={visible} title='规格模板' onCancel={onOpen}>

      </Modal>
    </>
  );
};

export default SelectSpec;
